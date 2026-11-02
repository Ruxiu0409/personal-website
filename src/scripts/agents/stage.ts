// 畫布：疊在網頁上的設計工具元素（選取框、尺寸標籤、參考線、量距、屬性面板…）和共用的動畫迴圈。
// 所有座標都是視窗座標，每一幀重新讀元素位置，所以捲動時會黏著內容。

export type Box = { left: number; top: number; width: number; height: number; right: number; bottom: number };
export type BoxFn = () => Box;
export type Point = [number, number];

export const mkBox = (left: number, top: number, width: number, height: number): Box => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

let layer: HTMLElement;
export function initStage(canvas: HTMLElement) {
  layer = canvas;
}

/* ---------- 動畫迴圈 ---------- */

type Step = (now: number) => void;
const steps = new Set<Step>();

/** 每一幀都執行 fn，回傳停止函式 */
export function every(fn: Step): () => void {
  steps.add(fn);
  return () => {
    steps.delete(fn);
  };
}

export function runLoop(after: (dt: number) => void) {
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, Math.max(0, now - last) / 1000);
    last = now;
    for (const fn of [...steps]) fn(now);
    after(dt);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** 在 ms 毫秒內每一幀呼叫 step(進度 0..1) */
export function animate(ms: number, step: (p: number) => void): Promise<void> {
  return new Promise((resolve) => {
    const t0 = performance.now();
    const stop = every((now) => {
      const p = ms <= 0 ? 1 : clamp((now - t0) / ms, 0, 1);
      step(p);
      if (p >= 1) {
        stop();
        resolve();
      }
    });
  });
}

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const pick = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

/* ---------- 基本元素 ---------- */

export function node(cls: string, parent: HTMLElement = layer, tag = 'div'): HTMLElement {
  const n = document.createElement(tag);
  n.className = cls;
  // 畫布上的元素先放到畫面外，第一次定位前不會在左上角閃一下
  if (parent === layer) n.style.transform = 'translate3d(-9999px, -9999px, 0)';
  parent.append(n);
  return n;
}

export function put(n: HTMLElement, x: number, y: number, w?: number, h?: number) {
  n.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  if (w !== undefined) n.style.width = `${Math.max(0, w)}px`;
  if (h !== undefined) n.style.height = `${Math.max(0, h)}px`;
}

export function fade(n: HTMLElement, ms = 220, stop?: () => void) {
  n.style.transition = `opacity ${ms}ms ease`;
  n.style.opacity = '0';
  setTimeout(() => {
    stop?.();
    n.remove();
  }, ms + 40);
}

const setText = (n: HTMLElement, text: string) => {
  if (n.textContent !== text) n.textContent = text;
};

/* ---------- 形狀：矩形、橢圓、框架、文字框，外面包一圈選取框和四角把手 ---------- */

export type ShapeKind = 'rect' | 'ellipse' | 'frame' | 'text';

export class Shape {
  readonly root: HTMLElement;
  readonly body: HTMLElement;
  private stop?: () => void;

  constructor(kind: ShapeKind, color: string) {
    this.root = node(`ag-shape is-${kind}`);
    this.root.style.setProperty('--c', color);
    this.body = node('ag-body', this.root);
    for (let i = 0; i < 4; i++) node('ag-handle', this.root, 'i');
    put(this.root, -100, -100, 0, 0);
  }

  set(x: number, y: number, w: number, h: number) {
    put(this.root, x, y, w, h);
  }

  /** 畫好之後每一幀跟著元素走，使用者捲動時形狀不會留在原地 */
  track(box: BoxFn) {
    this.stop?.();
    this.stop = every(() => {
      const b = box();
      this.set(b.left, b.top, b.width, b.height);
    });
  }

  radius(r: number) {
    this.body.style.borderRadius = `${r}px`;
  }

  fill(css: string) {
    this.body.style.background = css;
  }

  stroke(css: string, width: number) {
    this.body.style.boxShadow = `inset 0 0 0 ${width}px ${css}`;
  }

  /** 圖片渲染時，掃過的部分把灰底切掉，露出底下的圖 */
  clipTop(px: number) {
    this.body.style.clipPath = `inset(${Math.max(0, px)}px 0 0 0)`;
  }

  remove(ms = 220) {
    fade(this.root, ms, this.stop);
  }
}

/** 跟著某個位置走的小標籤（尺寸、圓角數值） */
export class Pill {
  readonly n: HTMLElement;
  private stop?: () => void;

  constructor(color: string, cls = '') {
    this.n = node(`ag-pill ${cls}`);
    this.n.style.setProperty('--c', color);
  }

  set(text: string, x: number, y: number) {
    setText(this.n, text);
    put(this.n, x, y);
  }

  follow(fn: () => [string, number, number]) {
    this.stop?.();
    this.stop = every(() => this.set(...fn()));
  }

  remove() {
    this.stop?.();
    fade(this.n, 180);
  }
}

/** 拖曳吸附時閃一下的紅色參考線 */
export function guide(x: number, y: number, w: number, h: number, ms = 420) {
  const g = node('ag-guide');
  put(g, x, y, Math.max(1, w), Math.max(1, h));
  setTimeout(() => fade(g, 200), ms);
}

/** Figma 按住 ⌥ 時的紅色量距線：a 到 b 的距離 */
export function measure(from: BoxFn, to: BoxFn, axis: 'x' | 'y', ms = 1000) {
  const line = node('ag-measure');
  const tag = node('ag-measure-tag');
  const stop = every(() => {
    const a = from();
    const b = to();
    if (axis === 'y') {
      const x = (Math.max(a.left, b.left) + Math.min(a.right, b.right)) / 2;
      const gap = b.top - a.bottom;
      put(line, x, a.bottom, 1, gap);
      put(tag, x + 5, a.bottom + gap / 2 - 8);
      setText(tag, String(Math.round(gap)));
    } else {
      const y = (Math.max(a.top, b.top) + Math.min(a.bottom, b.bottom)) / 2;
      const gap = b.left - a.right;
      put(line, a.right, y, gap, 1);
      put(tag, a.right + gap / 2 - 8, y + 5);
      setText(tag, String(Math.round(gap)));
    }
  });
  setTimeout(() => {
    fade(line, 200, stop);
    fade(tag, 200);
  }, ms);
}

/** 游標旁邊顯示按下的快捷鍵，例如 ⌥、⌘V */
export function keycap(label: string, at: () => Point, ms = 750) {
  const k = node('ag-key');
  k.textContent = label;
  const stop = every(() => put(k, ...at()));
  setTimeout(() => fade(k, 160, stop), ms);
}

export function ripple(x: number, y: number, color: string) {
  const r = node('ag-ripple');
  r.style.setProperty('--c', color);
  put(r, x, y);
  setTimeout(() => r.remove(), 600);
}

export function anchorDot(x: number, y: number, color: string) {
  const a = node('ag-anchor');
  a.style.setProperty('--c', color);
  put(a, x, y);
  return a;
}

/** 打字時的閃爍游標 */
export class Caret {
  readonly n: HTMLElement;
  constructor(color: string) {
    this.n = node('ag-caret');
    this.n.style.setProperty('--c', color);
  }
  at(x: number, y: number, h: number) {
    put(this.n, x, y, 2, h);
  }
  blink(on: boolean) {
    this.n.classList.toggle('blink', on);
  }
  remove() {
    fade(this.n, 120);
  }
}

/** 右側的屬性小面板（填色、邊框、文字顏色、圖片） */
export class Popover {
  readonly n: HTMLElement;
  private stop?: () => void;
  private swatch?: HTMLElement;

  constructor(color: string, title: string) {
    this.n = node('ag-pop');
    this.n.style.setProperty('--c', color);
    node('ag-pop-title', this.n).textContent = title;
  }

  section(title: string) {
    node('ag-pop-title sub', this.n).textContent = title;
  }

  row(swatchCss: string, text: string, note = '') {
    const r = node('ag-pop-row', this.n);
    const s = node('ag-swatch', r, 'span');
    s.style.background = swatchCss;
    node('', r, 'span').textContent = text;
    if (note) node('', r, 'em').textContent = note;
    this.swatch ??= s;
    return s;
  }

  /** 貼在 box 右邊；右邊放不下放左邊，兩邊都放不下就放在 box 裡的右上角 */
  attach(box: BoxFn) {
    this.stop?.();
    this.stop = every(() => {
      const b = box();
      const w = this.n.offsetWidth || 150;
      const h = this.n.offsetHeight || 60;
      let x = b.right - w - 12;
      let y = b.top + 12;
      if (b.right + 14 + w < innerWidth - 8) [x, y] = [b.right + 14, b.top];
      else if (b.left - w - 14 > 8) [x, y] = [b.left - w - 14, b.top];
      put(this.n, x, clamp(y, 72, innerHeight - h - 72));
    });
  }

  swatchPoint(): Point {
    const b = (this.swatch ?? this.n).getBoundingClientRect();
    return [b.left + b.width / 2, b.top + b.height / 2];
  }

  remove() {
    fade(this.n, 180, this.stop);
  }
}

/** 區塊的框架名稱標籤（像 Figma 畫布上每個 Frame 左上角的名字） */
export class FrameTag {
  readonly root: HTMLElement;
  private stop: () => void;

  constructor(el: Element, name: string, color?: string) {
    this.root = node('ag-frametag');
    const label = node('ag-frametag-label', this.root);
    label.textContent = name;
    if (color) this.select(color);
    this.stop = every(() => {
      const b = el.getBoundingClientRect();
      put(this.root, b.left, b.top, b.width, b.height);
    });
    requestAnimationFrame(() => this.root.classList.add('on'));
  }

  /** 正在畫這個框架時只顯示名字，畫完才顯示外框 */
  ghost(on: boolean) {
    this.root.classList.toggle('ghost', on);
  }

  select(color: string | null) {
    if (color) this.root.style.setProperty('--c', color);
    this.root.classList.toggle('sel', !!color);
  }

  close() {
    fade(this.root, 450, this.stop);
  }
}

/** Figma 的留言圖釘：水滴形頭像加一小段留言 */
export function pin(at: () => Point, color: string, initial: string, text: string, ms = 2400) {
  const p = node('ag-pin');
  p.style.setProperty('--c', color);
  node('ag-pin-head', p, 'b').textContent = initial;
  node('ag-pin-text', p, 'span').textContent = text;
  const stop = every(() => put(p, ...at()));
  requestAnimationFrame(() => p.classList.add('on'));
  setTimeout(() => fade(p, 300, stop), ms);
}

/* ---------- 顏色 ---------- */

export type RGBA = [number, number, number, number];

const probe = document.createElement('canvas');
probe.width = probe.height = 1;
const pctx = probe.getContext('2d', { willReadFrequently: true });
const memo = new Map<string, RGBA>();

/** 任何 CSS 顏色（rgb、color-mix 算出的 color(srgb …) 等）轉成 RGBA */
export function rgba(css: string): RGBA {
  const hit = memo.get(css);
  if (hit) return hit;
  let out: RGBA = [0, 0, 0, 0];
  if (pctx) {
    pctx.clearRect(0, 0, 1, 1);
    pctx.fillStyle = 'rgba(0, 0, 0, 0)';
    pctx.fillStyle = css;
    pctx.fillRect(0, 0, 1, 1);
    const d = pctx.getImageData(0, 0, 1, 1).data;
    out = [d[0], d[1], d[2], d[3] / 255];
  }
  memo.set(css, out);
  return out;
}

export function hex([r, g, b]: RGBA) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

export const percent = (c: RGBA) => `${Math.round(c[3] * 100)}%`;
