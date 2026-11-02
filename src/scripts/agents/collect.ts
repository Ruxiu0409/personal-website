// 把頁面拆成一個個「設計步驟」：框架、有底色的容器、圖片、向量圖示、文字、小標籤。
// 不針對特定頁面寫死，而是看 DOM 結構和計算後的樣式判斷，新增頁面也能直接套用。

import { rgba, type RGBA } from './stage';

export type Kind = 'frame' | 'shell' | 'image' | 'vector' | 'text' | 'chip';
export type TextMode = 'type' | 'stream' | 'paste';
export type El = HTMLElement | SVGElement;

export interface Frame {
  el: HTMLElement;
  name: string;
  task?: Task;
  tasks: Task[];
  closed: boolean;
}

export interface Task {
  el: El;
  kind: Kind;
  /** 這些步驟完成後才能開始（外層容器、鋪底的背景圖、被複製的第一個標籤） */
  deps: Task[];
  frame?: Frame;
  claimed: boolean;
  done: boolean;
  /** 形狀和填色已經畫好（文字可能還在打），複製它的步驟可以先開始 */
  shaped?: boolean;
  cleanups: Array<() => void>;
  /** 原本的 style 屬性，完成時還原 */
  style0: string | null;
  round?: boolean;
  mode?: TextMode;
  /** 同一排的標籤：第一個畫出來，後面的從前一個複製 */
  prev?: Task;
  master?: Task;
  /** 鋪滿父層的背景圖，同一區其他東西要等它 */
  backdrop?: boolean;
  /** 容器裡鋪底的背景圖；它畫好前容器的 ::before / ::after（例如漸層）先不顯示 */
  backdropChild?: Task;
  seenAt: number;
}

// 文字區塊裡出現這些元素，就代表它其實是容器，要再往下拆
const STRUCTURAL = new Set([
  'DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'SECTION', 'ARTICLE', 'HEADER',
  'FOOTER', 'NAV', 'MAIN', 'ASIDE', 'FIGURE', 'FIGCAPTION', 'TABLE', 'BLOCKQUOTE', 'IMG', 'PICTURE',
  'VIDEO', 'CANVAS', 'FORM', 'DL', 'DT', 'DD', 'PRE', 'HR',
]);
const MEDIA = new Set(['IMG', 'PICTURE', 'VIDEO', 'CANVAS']);

export function collect(scopes: HTMLElement[], frameEls: HTMLElement[]) {
  const tasks: Task[] = [];
  const byEl = new Map<Element, Task>();
  const vh = innerHeight;
  let textCount = 0;

  const frames: Frame[] = frameEls.map((el) => ({ el, name: frameName(el), tasks: [], closed: false }));
  const frameOf = new Map(frames.map((f) => [f.el as Element, f]));

  const add = (el: El, kind: Kind, deps: Task[]): Task => {
    const t: Task = {
      el,
      kind,
      deps: [...deps],
      claimed: false,
      done: false,
      cleanups: [],
      style0: el.getAttribute('style'),
      seenAt: 0,
    };
    tasks.push(t);
    byEl.set(el, t);
    return t;
  };

  const visit = (el: Element, deps: Task[]) => {
    if (el.matches('script, style, template, noscript, [hidden]')) return;
    if (getComputedStyle(el).display === 'contents') return walk(el, deps);
    if (!rendered(el)) return;

    if (MEDIA.has(el.tagName)) {
      const t = add(el as HTMLElement, 'image', deps);
      t.backdrop = coversParent(el);
      return;
    }
    if (el instanceof SVGSVGElement) {
      add(el, 'vector', deps);
      return;
    }
    if (!(el instanceof HTMLElement)) return;

    // 一進來就在畫面裡、而且放得下的區塊：由代理人用 Frame 工具拉出來
    const frame = frameOf.get(el);
    if (frame) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0 && r.height <= vh * 0.92) {
        const t = add(el, 'frame', deps);
        frame.task = t;
        return walk(el, [...deps, t]);
      }
    }

    if (isTextBlock(el)) {
      if (hasBox(el)) {
        const t = add(el, 'chip', deps);
        t.round = isRound(el);
        linkDuplicate(t);
      } else {
        add(el, 'text', deps).mode = textMode(el, textCount++);
      }
      return;
    }

    if (hasBox(el)) {
      const t = add(el, 'shell', deps);
      t.round = isRound(el);
      linkDuplicate(t);
      return walk(el, [...deps, t]);
    }
    walk(el, deps);
  };

  const walk = (parent: Element, deps: Task[]) => {
    for (const child of Array.from(parent.children)) visit(child, deps);
  };

  /** 同一排、同樣樣式的標籤或卡片：後面的都依賴第一個，畫好第一個再複製 */
  const linkDuplicate = (t: Task) => {
    const prevEl = t.el.previousElementSibling;
    const prev = prevEl ? byEl.get(prevEl) : undefined;
    if (!prevEl || !prev || prev.kind !== t.kind) return;
    if (prevEl.tagName !== t.el.tagName || prevEl.getAttribute('class') !== t.el.getAttribute('class')) return;
    t.prev = prev;
    t.master = prev.master ?? prev;
    t.deps.push(t.master);
  };

  for (const scope of scopes) visit(scope, []);

  // 鋪底的背景圖要先畫好，上面的文字才看得到
  for (const bg of tasks.filter((t) => t.backdrop)) {
    const holder = bg.el.parentElement;
    if (!holder) continue;
    const holderTask = byEl.get(holder);
    if (holderTask) holderTask.backdropChild = bg;
    for (const t of tasks) {
      if (t !== bg && t.el !== holder && holder.contains(t.el) && !t.el.contains(holder)) t.deps.push(bg);
    }
  }

  for (const t of tasks) {
    const f = frames.find((frame) => frame.el.contains(t.el));
    if (f) {
      t.frame = f;
      f.tasks.push(t);
    }
  }

  return { tasks, frames, byEl };
}

/* ---------- 判斷用的小工具 ---------- */

function rendered(el: Element) {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return false;
  // 不看 opacity：掃描時 main 和主視覺正被預先藏起來（opacity: 0）
  return getComputedStyle(el).visibility !== 'hidden';
}

/** 不含 SVG 裡 <title> 之類看不到的文字 */
function ownText(el: Element) {
  let s = '';
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.parentElement?.closest('svg')) s += n.nodeValue ?? '';
  }
  return s.trim();
}

function isTextBlock(el: HTMLElement) {
  if (!ownText(el)) return false;
  for (const d of Array.from(el.querySelectorAll('*'))) {
    if (STRUCTURAL.has(d.tagName)) return false;
    if (d instanceof SVGSVGElement) {
      const r = d.getBoundingClientRect();
      if (r.width > 28 || r.height > 28) return false;
    }
  }
  return true;
}

/** 有自己的底色、邊框或陰影，看得出是一個「盒子」 */
function hasBox(el: HTMLElement) {
  const cs = getComputedStyle(el);
  if (cs.backgroundImage !== 'none' || cs.boxShadow !== 'none') return true;
  for (const side of ['top', 'right', 'bottom', 'left']) {
    const w = parseFloat(cs.getPropertyValue(`border-${side}-width`));
    const style = cs.getPropertyValue(`border-${side}-style`);
    if (w > 0 && style !== 'none' && rgba(cs.getPropertyValue(`border-${side}-color`))[3] > 0.02) return true;
  }
  const bg = rgba(cs.backgroundColor);
  if (bg[3] <= 0.02) return false;
  const under = backdropColor(el.parentElement);
  const diff = Math.abs(bg[0] - under[0]) + Math.abs(bg[1] - under[1]) + Math.abs(bg[2] - under[2]);
  return bg[3] < 0.98 || diff > 6;
}

function backdropColor(el: Element | null): RGBA {
  for (let e = el; e; e = e.parentElement) {
    const c = rgba(getComputedStyle(e).backgroundColor);
    if (c[3] > 0.02) return c;
  }
  return [255, 255, 255, 1];
}

export function radiusOf(el: Element, r: DOMRect = el.getBoundingClientRect()) {
  const first = getComputedStyle(el).borderTopLeftRadius.split(' ')[0];
  const n = parseFloat(first) || 0;
  const px = first.endsWith('%') ? (n / 100) * Math.min(r.width, r.height) : n;
  return Math.min(px, Math.min(r.width, r.height) / 2);
}

function isRound(el: Element) {
  const r = el.getBoundingClientRect();
  return Math.abs(r.width - r.height) < 2 && radiusOf(el, r) >= r.width / 2 - 1;
}

function coversParent(el: Element) {
  const parent = el.parentElement;
  if (!parent) return false;
  const pos = getComputedStyle(el).position;
  if (pos !== 'absolute' && pos !== 'fixed') return false;
  const a = el.getBoundingClientRect();
  const b = parent.getBoundingClientRect();
  return a.width * a.height >= b.width * b.height * 0.8;
}

function textMode(el: HTMLElement, i: number): TextMode {
  const text = (el.textContent ?? '').trim();
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
  const lines = Math.round(el.getBoundingClientRect().height / lineHeight);
  if (text.length <= 42 && lines <= 2) return 'type';
  if (el.tagName === 'BLOCKQUOTE') return 'paste';
  return i % 3 === 2 ? 'paste' : 'stream';
}

function frameName(el: HTMLElement) {
  if (el.matches('.hero')) return 'Hero';
  const labelledBy = el.getAttribute('aria-labelledby');
  const heading = (labelledBy && document.getElementById(labelledBy)) || el.querySelector('h1, h2, h3');
  const text = heading?.textContent?.trim().replace(/\s+/g, ' ');
  if (el.tagName === 'HEADER') return 'Header';
  return text ? (text.length > 22 ? `${text.slice(0, 21)}…` : text) : 'Section';
}
