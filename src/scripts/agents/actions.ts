// 每一種區塊用 Figma 的步驟「畫」出來：
// 框架：Frame 工具從左上拉到右下 → 調圓角
// 容器、標籤：矩形／橢圓工具拉出灰色形狀 → 調圓角 → 從屬性面板填色、加邊框（同一排的標籤用 ⌥ 拖曳複製）
// 圖片：矩形工具拉出灰色矩形 → 調圓角 → 填入圖片 → 掃描線由上往下把圖渲染出來
// 圖示：鋼筆工具沿著路徑描一遍 → 填色
// 文字：短字用文字工具一個字一個字打（偶爾打錯再刪）、長段落拉文字框後像 AI 串流生成、或 ⌘V 一行行貼上

import type { Agent } from './agent';
import { radiusOf, type Frame, type Task } from './collect';
import type { Tool } from './icons';
import {
  anchorDot,
  animate,
  Caret,
  clamp,
  easeInOut,
  easeOut,
  every,
  fade,
  FrameTag,
  guide,
  hex,
  keycap,
  measure,
  mkBox,
  node,
  percent,
  pick,
  Pill,
  pin,
  Popover,
  put,
  rgba,
  Shape,
  sleep,
  type Box,
  type BoxFn,
  type Point,
} from './stage';

export interface Ctx {
  zh: boolean;
  /** 動作時間倍率：基本速度再乘上排隊程度，工作越多越快 */
  pace(): number;
  layer(a: Agent, tool: Tool, name: string): void;
  frameTag(f: Frame, color?: string): FrameTag;
  count(kind: 'rect' | 'ellipse'): number;
}

const GRAY = '#d9d9d9';
const L = (ctx: Ctx, zh: string, en: string) => (ctx.zh ? zh : en);
const rectOf =
  (el: Element): BoxFn =>
  () =>
    el.getBoundingClientRect();
const mix = (color: string, p: number, from = GRAY) =>
  `color-mix(in srgb, ${color} ${Math.round(p * 100)}%, ${from})`;
const easeOutBack = (t: number) => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);

/** 完成時把 style 屬性還原成原本的樣子 */
function keepStyle(t: Task, el: Element) {
  const saved = el.getAttribute('style');
  t.cleanups.push(() => {
    if (saved === null) el.removeAttribute('style');
    else el.setAttribute('style', saved);
  });
}

/* ---------- 共用步驟 ---------- */

/** 從左上角按住拖到右下角拉出形狀；尺寸標籤即時更新，最後超過一點再吸附回來 */
async function dragOut(a: Agent, ctx: Ctx, target: BoxFn, shape: Shape, ms: number, sizeTag = true) {
  await a.flyTo(() => {
    const b = target();
    return [b.left, b.top];
  });
  a.press = true;
  a.lock = true;
  const pill = sizeTag ? new Pill(a.color) : undefined;
  const over = 1.03;
  await animate(ms * ctx.pace(), (p) => {
    const b = target();
    const q = Math.min(1, p / 0.8);
    const kw = p < 0.8 ? easeOut(q) * over : over - (over - 1) * easeInOut((p - 0.8) / 0.2);
    // 高度稍微慢一點，拖曳路徑帶點弧度
    const kh = p < 0.8 ? easeOut(Math.pow(q, 1.3)) * over : kw;
    const w = b.width * kw;
    const h = b.height * kh;
    shape.set(b.left, b.top, w, h);
    a.tx = b.left + w;
    a.ty = b.top + h;
    pill?.set(`${Math.round(w)} × ${Math.round(h)}`, b.left + w / 2, b.top + h + 8);
  });
  a.lock = false;
  a.press = false;
  shape.track(target);
  const b = target();
  guide(b.right, b.top - 28, 1, b.height + 56);
  guide(b.left - 28, b.bottom, b.width + 56, 1);
  pill?.follow(() => {
    const bb = target();
    return [`${Math.round(bb.width)} × ${Math.round(bb.height)}`, bb.left + bb.width / 2, bb.bottom + 8];
  });
  return pill;
}

/** 拖左上角內側的圓角把手，圓角從 0 長到最終值 */
async function radiusDrag(a: Agent, ctx: Ctx, target: BoxFn, shape: Shape, radius: number) {
  if (radius < 3) {
    shape.radius(radius);
    return;
  }
  let cur = 0;
  const at = (r: number): Point => {
    const b = target();
    const d = Math.min(10 + r * 0.45, b.width / 2, b.height / 2);
    return [b.left + d, b.top + d];
  };
  const handle = node('ag-radius');
  handle.style.setProperty('--c', a.color);
  const pill = new Pill(a.color, 'side');
  const stop = every(() => {
    const [x, y] = at(cur);
    put(handle, x, y);
    pill.set(`${L(ctx, '圓角', 'Radius')} ${Math.round(cur)}`, x + 14, y);
  });
  await a.flyTo(() => at(0));
  a.press = true;
  a.lock = true;
  await animate(320 * ctx.pace(), (p) => {
    cur = radius * easeOut(p);
    shape.radius(cur);
    [a.tx, a.ty] = at(cur);
  });
  a.lock = false;
  a.press = false;
  await sleep(80 * ctx.pace());
  stop();
  handle.remove();
  pill.remove();
}

/** 打開屬性面板，點色票，灰色預設填色漸變成元素真正的填色和邊框 */
async function paint(a: Agent, ctx: Ctx, target: BoxFn, shape: Shape, el: Element) {
  const cs = getComputedStyle(el);
  const bw = parseFloat(cs.borderTopWidth) || 0;
  const fill = rgba(cs.backgroundColor)[3] > 0.02 ? cs.backgroundColor : null;
  const stroke =
    bw > 0 && cs.borderTopStyle !== 'none' && rgba(cs.borderTopColor)[3] > 0.02 ? cs.borderTopColor : null;
  if (!fill) shape.fill('transparent');
  if (!fill && !stroke) return;

  const pop = new Popover(a.color, fill ? L(ctx, '填色', 'Fill') : L(ctx, '邊框', 'Stroke'));
  if (fill) pop.row(fill, hex(rgba(fill)), percent(rgba(fill)));
  if (stroke) {
    if (fill) pop.section(L(ctx, '邊框', 'Stroke'));
    pop.row(stroke, hex(rgba(stroke)), `${bw}px`);
  }
  pop.attach(target);
  await sleep(40);
  await a.flyTo(() => pop.swatchPoint());
  a.click();
  await animate(300 * ctx.pace(), (p) => {
    const e = easeInOut(p);
    if (fill) shape.fill(mix(fill, e));
    if (stroke) shape.stroke(mix(stroke, e, 'transparent'), bw);
  });
  await sleep(100 * ctx.pace());
  pop.remove();
}

/** 容器畫好後顯示 ::before / ::after；裡面有鋪底的背景圖時，等圖畫好再顯示 */
function showPseudo(t: Task) {
  if (!t.backdropChild || t.backdropChild.done) t.el.classList.remove('ag-pseudo');
}

/** 和上面一個元素之間的距離，用紅色量距線標出來 */
function measureAbove(el: Element) {
  let prev = el.previousElementSibling;
  while (prev && prev.getBoundingClientRect().height < 2) prev = prev.previousElementSibling;
  if (!prev) return;
  const a = prev.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  const gap = b.top - a.bottom;
  const overlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
  if (gap >= 4 && gap <= 160 && overlap > 8) measure(rectOf(prev), rectOf(el), 'y');
}

/* ---------- 框架 ---------- */

export async function buildFrame(a: Agent, ctx: Ctx, t: Task) {
  const el = t.el;
  const target = rectOf(el);
  a.use('frame', L(ctx, '框架', 'Frame'));
  const tag = t.frame ? ctx.frameTag(t.frame, a.color) : undefined;
  tag?.ghost(true);
  const shape = new Shape('frame', a.color);
  const pill = await dragOut(a, ctx, target, shape, 650);
  t.shaped = true;
  if (t.frame) ctx.layer(a, 'frame', t.frame.name);
  await radiusDrag(a, ctx, target, shape, radiusOf(el));
  el.classList.remove('ag-shell');
  showPseudo(t);
  tag?.ghost(false);
  tag?.select(null);
  shape.remove();
  pill?.remove();
}

/* ---------- 有底色的容器 ---------- */

export async function buildShell(a: Agent, ctx: Ctx, t: Task) {
  const el = t.el;
  const target = rectOf(el);
  const tool = t.round ? 'ellipse' : 'rect';
  const label = t.round ? L(ctx, '橢圓', 'Ellipse') : L(ctx, '矩形', 'Rectangle');
  const name = `${label} ${ctx.count(tool)}`;

  // 同樣的卡片、圓形按鈕：從前一個 ⌥ 拖曳複製
  const source = [t.prev, t.master].find((x) => x?.done || x?.shaped);
  if (source) {
    await duplicate(a, ctx, el, source.el, source === t.prev);
    ctx.layer(a, tool, name);
    showPseudo(t);
    t.shaped = true;
    return;
  }

  a.use(tool, label);
  const shape = new Shape(tool, a.color);
  const pill = await dragOut(a, ctx, target, shape, t.round ? 380 : 480);
  ctx.layer(a, tool, name);
  if (!t.round) await radiusDrag(a, ctx, target, shape, radiusOf(el));
  await paint(a, ctx, target, shape, el);
  el.classList.remove('ag-shell');
  showPseudo(t);
  t.shaped = true;
  shape.remove(120);
  pill?.remove();
  measureAbove(el);
}

/* ---------- 圖片 ---------- */

/** object-fit: contain 的圖片，實際畫出來的範圍比元素小 */
function contentBox(el: Element): Box {
  const b = el.getBoundingClientRect();
  if (!(el instanceof HTMLImageElement)) return b;
  const fit = getComputedStyle(el).objectFit;
  if (fit !== 'contain' && fit !== 'scale-down') return b;
  const nw = el.naturalWidth || Number(el.getAttribute('width')) || b.width;
  const nh = el.naturalHeight || Number(el.getAttribute('height')) || b.height;
  let s = Math.min(b.width / nw, b.height / nh);
  if (fit === 'scale-down') s = Math.min(1, s);
  const w = nw * s;
  const h = nh * s;
  return mkBox(b.left + (b.width - w) / 2, b.top + (b.height - h) / 2, w, h);
}

/** 圖片自己沒有圓角、但被同尺寸的父層裁成圓角時，用父層的圓角 */
function imageRadius(el: Element, b: Box) {
  const own = radiusOf(el);
  const parent = el.parentElement;
  if (own >= 1 || !parent) return own;
  const pb = parent.getBoundingClientRect();
  const clips = getComputedStyle(parent).overflow !== 'visible';
  return clips && Math.abs(pb.width - b.width) < 3 && Math.abs(pb.height - b.height) < 3 ? radiusOf(parent) : 0;
}

export async function buildImage(a: Agent, ctx: Ctx, t: Task) {
  const el = t.el;
  const img = el instanceof HTMLImageElement ? el : el.querySelector('img');
  const target = () => contentBox(img ?? el);
  const name = img?.alt.trim() || L(ctx, '圖片', 'Image');
  const b0 = target();
  if (b0.width < 72 || b0.height < 72) return placeSmall(a, ctx, t, name);

  a.use('rect', L(ctx, '矩形', 'Rectangle'));
  const shape = new Shape('rect', a.color);
  const pill = await dragOut(a, ctx, target, shape, 560);
  ctx.layer(a, 'image', name);
  // 鋪滿框架的背景圖沿用框架的圓角，不用再調一次
  if (t.backdrop) shape.radius(imageRadius(img ?? el, b0));
  else await radiusDrag(a, ctx, target, shape, imageRadius(img ?? el, b0));

  a.use('image', L(ctx, '填入圖片', 'Image fill'));
  const src = (img?.currentSrc || img?.src || '').replace(/"/g, '%22');
  const pop = new Popover(a.color, L(ctx, '填色', 'Fill'));
  pop.row(src ? `center / cover no-repeat url("${src}")` : GRAY, L(ctx, '圖片', 'Image'), 'Fill');
  pop.attach(target);
  await sleep(40);
  await a.flyTo(() => pop.swatchPoint());
  a.click();
  if (img && !img.complete) await Promise.race([img.decode().catch(() => undefined), sleep(2500)]);
  await sleep(120 * ctx.pace());
  pop.remove();

  // 渲染：掃描線由上往下，掃過的地方從模糊、低彩度變清楚
  el.classList.remove('ag-hide');
  el.classList.add('ag-live');
  // 鋪底的背景圖：容器的漸層之類的跟著圖一起出現，上面的文字也可以開始打了
  if (t.backdrop) {
    el.parentElement?.classList.remove('ag-pseudo');
    t.shaped = true;
  }
  const scan = node('ag-scan');
  scan.style.setProperty('--c', a.color);
  await animate(850 * ctx.pace(), (p) => {
    const b = target();
    const e = easeInOut(p);
    const y = b.top + b.height * e;
    const box = el.getBoundingClientRect();
    el.style.clipPath = p >= 1 ? 'none' : `inset(0 0 ${Math.max(0, box.bottom - y)}px 0)`;
    el.style.filter = `blur(${(1 - e) * 10}px) saturate(${0.3 + 0.7 * e})`;
    shape.clipTop(y - b.top);
    put(scan, b.left, y - 1, b.width, 2);
    a.tx = b.right + 4;
    a.ty = y;
  });
  scan.remove();
  shape.remove(160);
  pill?.remove();
  measureAbove(el);
}

/** 小圖示（App icon 之類）直接 ⇧⌘K 放進來 */
async function placeSmall(a: Agent, ctx: Ctx, t: Task, name: string) {
  const el = t.el;
  a.use('image', L(ctx, '放入圖片', 'Place image'));
  await a.flyTo(() => {
    const b = el.getBoundingClientRect();
    return [b.left + b.width / 2, b.top + b.height / 2];
  });
  a.click();
  keycap('⇧⌘K', () => [a.x + 16, a.y - 30], 650);
  ctx.layer(a, 'image', name);
  el.classList.remove('ag-hide');
  el.classList.add('ag-live');
  await animate(440 * ctx.pace(), (p) => {
    el.style.transform = `scale(${0.4 + 0.6 * easeOutBack(p)})`;
    el.style.opacity = String(Math.min(1, p * 2));
    el.style.filter = `blur(${(1 - p) * 6}px)`;
  });
}

/* ---------- 向量圖示 ---------- */

export async function buildVector(a: Agent, ctx: Ctx, t: Task) {
  const svg = t.el as SVGSVGElement;
  const name = svg.closest('[aria-label]')?.getAttribute('aria-label') || svg.closest('a')?.title || 'Vector';
  a.use('pen', L(ctx, '鋼筆', 'Pen'));
  ctx.layer(a, 'pen', name);
  await penDraw(a, ctx, t, svg);
}

/** 鋼筆沿著路徑描一遍，沿路留下錨點，描完再把填色補上 */
async function penDraw(a: Agent, ctx: Ctx, t: Task, svg: SVGSVGElement) {
  const shapes = Array.from(
    svg.querySelectorAll<SVGGeometryElement>('path, circle, ellipse, rect, line, polyline, polygon'),
  );
  const lens = shapes.map((s) => {
    try {
      return s.getTotalLength();
    } catch {
      return 0;
    }
  });
  const total = lens.reduce((sum, l) => sum + l, 0);
  svg.classList.remove('ag-hide');
  svg.style.removeProperty('opacity');
  if (!total) return;

  shapes.forEach((s) => keepStyle(t, s));
  const ctm = svg.getScreenCTM();
  const scale = (ctm && Math.hypot(ctm.a, ctm.b)) || 1;
  shapes.forEach((s, i) =>
    Object.assign(s.style, {
      stroke: 'currentColor',
      strokeWidth: `${1.4 / scale}`,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: `${lens[i]} ${lens[i]}`,
      strokeDashoffset: `${lens[i]}`,
      fillOpacity: '0',
    }),
  );
  const point = (i: number, l: number): Point => {
    const s = shapes[i];
    const pt = s.getPointAtLength(l);
    const m = s.getScreenCTM();
    return m ? [m.a * pt.x + m.c * pt.y + m.e, m.b * pt.x + m.d * pt.y + m.f] : [a.x, a.y];
  };

  await a.flyTo(() => point(0, 0));
  a.press = true;
  a.lock = true;
  const anchors: HTMLElement[] = [];
  let next = 0;
  await animate(clamp(total * scale * 3, 360, 1200) * ctx.pace(), (p) => {
    let d = p * total;
    let i = 0;
    while (i < shapes.length - 1 && d > lens[i]) {
      d -= lens[i];
      i++;
    }
    shapes.forEach((s, j) => {
      s.style.strokeDashoffset = String(j < i ? 0 : j > i ? lens[j] : Math.max(0, lens[j] - d));
    });
    [a.tx, a.ty] = point(i, Math.min(d, lens[i]));
    if (p >= next) {
      anchors.push(anchorDot(a.tx, a.ty, a.color));
      next += 1 / 6;
    }
  });
  a.lock = false;
  a.press = false;
  await animate(260 * ctx.pace(), (p) =>
    shapes.forEach((s) => {
      s.style.fillOpacity = String(p);
      s.style.strokeOpacity = String(1 - p);
    }),
  );
  anchors.forEach((n) => fade(n, 200));
}

/* ---------- 文字 ---------- */

interface Part {
  original: Text;
  wrap: HTMLElement;
  typed: Text;
  fresh: HTMLElement;
  rest: HTMLElement;
  text: string;
  start: number;
}

/** 把文字拆成「已打」「剛打（代理人顏色）」「還沒打（透明但佔位）」三段，版面完全不動 */
class Split {
  readonly parts: Part[] = [];
  total = 0;

  constructor(readonly el: HTMLElement) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
    for (const original of nodes) {
      const parent = original.parentElement;
      if (!original.data.trim() || !parent || parent.closest('svg')) continue;
      // 視覺上隱藏的文字（給螢幕閱讀器的）不用打
      const pr = parent.getBoundingClientRect();
      if (pr.width <= 1 || pr.height <= 1) continue;
      const wrap = document.createElement('span');
      wrap.className = 'ag-split';
      const typed = document.createTextNode('');
      const fresh = document.createElement('span');
      fresh.className = 'ag-fresh';
      const rest = document.createElement('span');
      rest.className = 'ag-rest';
      rest.textContent = original.data;
      wrap.append(typed, fresh, rest);
      original.replaceWith(wrap);
      this.parts.push({ original, wrap, typed, fresh, rest, text: original.data, start: this.total });
      this.total += original.data.length;
    }
  }

  get text() {
    return this.parts.map((p) => p.text).join('');
  }

  /** 顯示前 n 個字；最後 freshLen 個字標成代理人的顏色；extra 是打錯還沒刪的字 */
  set(n: number, freshLen = 0, extra = '') {
    let at = this.parts.findIndex((p) => n - p.start < p.text.length);
    if (at < 0) at = this.parts.length - 1;
    this.parts.forEach((p, i) => {
      const shown = clamp(n - p.start, 0, p.text.length);
      const from = clamp(n - freshLen - p.start, 0, shown);
      const typed = p.text.slice(0, from);
      const fresh = p.text.slice(from, shown) + (i === at ? extra : '');
      const rest = p.text.slice(shown);
      if (p.typed.data !== typed) p.typed.data = typed;
      if (p.fresh.textContent !== fresh) p.fresh.textContent = fresh;
      if (p.rest.textContent !== rest) p.rest.textContent = rest;
    });
  }

  /** 插入點的位置與行高 */
  caret(): [number, number, number] {
    const p = this.parts.find((q) => q.rest.textContent) ?? this.parts[this.parts.length - 1];
    if (p.rest.textContent) {
      const r = p.rest.getClientRects()[0];
      if (r) return [r.left, r.top, r.height];
    }
    const rects = p.wrap.getClientRects();
    const r = rects[rects.length - 1] ?? p.wrap.getBoundingClientRect();
    return [r.right, r.top, r.height];
  }

  restore() {
    for (const p of this.parts) if (p.wrap.isConnected) p.wrap.replaceWith(p.original);
  }
}

/** 文字實際佔的範圍（不是整個區塊的寬度） */
function textBox(el: Element): Box {
  const range = document.createRange();
  range.selectNodeContents(el);
  const r = range.getBoundingClientRect();
  return r.width ? r : el.getBoundingClientRect();
}

const snippet = (el: Element) => {
  const s = (el.textContent ?? '').trim().replace(/\s+/g, ' ');
  return s.length > 24 ? `${s.slice(0, 23)}…` : s;
};

/** 彩色的文字（例如獎項）先用預設顏色打，再從面板改顏色 */
function accentOf(el: Element) {
  const c = getComputedStyle(el).color;
  const [r, g, b] = rgba(c);
  return Math.max(r, g, b) - Math.min(r, g, b) > 80 ? c : null;
}

/** 偶爾在英文字母打錯一個字再刪掉；只在單行、旁邊有空間時才做，避免換行讓版面跳動 */
function pickTypo(sp: Split): number {
  if (Math.random() > 0.32 || sp.total < 6) return -1;
  const box = textBox(sp.el);
  if (box.width > sp.el.getBoundingClientRect().width - 30 || box.height > 1.6 * sp.caret()[2]) return -1;
  const text = sp.text;
  const spots: number[] = [];
  for (let i = 2; i < text.length - 1; i++) if (/[a-z]/.test(text[i])) spots.push(i);
  return spots.length ? pick(spots) : -1;
}

const KEYS = 'qwertyuiopasdfghjklzxcvbnm';
const neighbor = (c: string) => KEYS[(KEYS.indexOf(c) + 1) % KEYS.length];

async function typeIn(a: Agent, ctx: Ctx, sp: Split, perChar = 38) {
  if (!sp.total) return;
  const caret = new Caret(a.color);
  const hug = new Shape('text', a.color);
  const stop = every(() => {
    const b = textBox(sp.el);
    hug.set(b.left - 3, b.top - 2, b.width + 6, b.height + 4);
    const [x, y, h] = sp.caret();
    caret.at(x, y, h);
  });
  const below = (): Point => {
    const [x, y, h] = sp.caret();
    return [x + 3, y + h + 2];
  };
  await a.flyTo(below);
  a.click();

  const typo = pickTypo(sp);
  const ms = clamp(sp.total * perChar, 260, 1500) * ctx.pace();
  // 打字節奏不完全平均
  const run = (from: number, to: number, dur: number) =>
    animate(dur, (p) => {
      const q = clamp(p + 0.015 * Math.sin(p * 41), 0, 1);
      sp.set(Math.round(from + (to - from) * q));
      [a.tx, a.ty] = below();
    });
  if (typo > 0) {
    await run(0, typo, (ms * typo) / sp.total);
    sp.set(typo, 0, neighbor(sp.text[typo]));
    caret.blink(false);
    await sleep(130);
    sp.set(typo);
    await sleep(70);
    await run(typo, sp.total, (ms * (sp.total - typo)) / sp.total);
  } else {
    await run(0, sp.total, ms);
  }
  sp.set(sp.total);
  caret.blink(true);
  await sleep(240 * ctx.pace());
  stop();
  caret.remove();
  hug.remove(120);
}

/** 像 AI 串流輸出：一段段冒出來，最新的幾個字用代理人的顏色 */
async function streamIn(a: Agent, ctx: Ctx, sp: Split) {
  if (!sp.total) return;
  const ms = clamp(sp.total * 15, 900, 2200) * ctx.pace();
  await animate(ms, (p) => {
    sp.set(Math.round(sp.total * p), Math.round(10 * Math.min(1, (1 - p) * 6)));
    const [x, y, h] = sp.caret();
    a.tx = x + 6;
    a.ty = y + h;
  });
  sp.set(sp.total);
}

/** 文字框裡每一行的上下範圍（相對元素），⌘V 貼上時一行行出現 */
function lineBoxes(el: Element) {
  const b = el.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines: Array<{ top: number; bottom: number; left: number; right: number }> = [];
  for (const r of Array.from(range.getClientRects())) {
    if (r.width < 1 || r.height < 1) continue;
    const top = r.top - b.top;
    const bottom = r.bottom - b.top;
    const line = lines.find((l) => top < l.bottom - 2 && bottom > l.top + 2);
    if (line) {
      line.top = Math.min(line.top, top);
      line.bottom = Math.max(line.bottom, bottom);
      line.left = Math.min(line.left, r.left - b.left);
      line.right = Math.max(line.right, r.right - b.left);
    } else {
      lines.push({ top, bottom, left: r.left - b.left, right: r.right - b.left });
    }
  }
  lines.sort((p, q) => p.top - q.top);
  if (!lines.length) lines.push({ top: 0, bottom: b.height, left: 0, right: b.width });
  // 每一行接上一行，最後一行到底，裁切時不會漏掉行距
  lines[0].top = 0;
  for (let i = 1; i < lines.length; i++) lines[i].top = lines[i - 1].bottom;
  lines[lines.length - 1].bottom = b.height;
  return lines;
}

async function pasteIn(a: Agent, ctx: Ctx, el: HTMLElement) {
  await a.flyTo(() => {
    const b = el.getBoundingClientRect();
    return [b.left + 2, b.top + 6];
  });
  a.click();
  keycap('⌘V', () => [a.x + 16, a.y - 30], 700);
  const lines = lineBoxes(el);
  el.style.clipPath = 'inset(0 100% 100% 0)';
  el.classList.remove('ag-hide');
  el.classList.add('ag-live');
  await animate(Math.max(420, lines.length * 120 + 120) * ctx.pace(), (p) => {
    const b = el.getBoundingClientRect();
    const lp = p * lines.length;
    const i = Math.min(lines.length - 1, Math.floor(lp));
    const line = lines[i];
    const x = line.left + (line.right - line.left) * easeOut(Math.min(1, lp - i));
    el.style.clipPath =
      p >= 1
        ? 'none'
        : `polygon(0 0, 100% 0, 100% ${line.top}px, ${x}px ${line.top}px, ${x}px ${line.bottom}px, 0 ${line.bottom}px)`;
    a.tx = b.left + x;
    a.ty = b.top + line.bottom;
  });
}

async function recolor(a: Agent, ctx: Ctx, el: HTMLElement, color: string, from: string) {
  const pop = new Popover(a.color, L(ctx, '文字顏色', 'Text fill'));
  const c = rgba(color);
  pop.row(color, hex(c), percent(c));
  pop.attach(() => textBox(el));
  await sleep(40);
  await a.flyTo(() => pop.swatchPoint());
  a.click();
  await animate(320 * ctx.pace(), (p) => {
    el.style.color = mix(color, easeInOut(p), from);
  });
  await sleep(120 * ctx.pace());
  pop.remove();
}

export async function buildText(a: Agent, ctx: Ctx, t: Task) {
  const el = t.el as HTMLElement;
  const name = snippet(el);
  if (t.mode === 'paste') {
    a.use('text', L(ctx, '貼上', 'Paste'));
    ctx.layer(a, 'text', name);
    return pasteIn(a, ctx, el);
  }
  const sp = new Split(el);
  t.cleanups.push(() => sp.restore());
  const accent = accentOf(el);
  const base = getComputedStyle(document.body).color;
  el.style.setProperty('--ag-c', a.color);
  if (accent) el.style.color = base;
  el.classList.add('ag-typing');
  el.classList.remove('ag-hide');
  el.classList.add('ag-live');

  if (t.mode === 'stream') {
    a.use('text', L(ctx, '文字框', 'Text box'));
    const box = new Shape('text', a.color);
    await dragOut(a, ctx, rectOf(el), box, 420, false);
    ctx.layer(a, 'text', name);
    a.use('text', L(ctx, '✦ 生成中', '✦ Generating'));
    await streamIn(a, ctx, sp);
    box.remove(160);
  } else {
    a.use('text', L(ctx, '輸入', 'Typing'));
    ctx.layer(a, 'text', name);
    await typeIn(a, ctx, sp);
  }
  if (accent) await recolor(a, ctx, el, accent, base);
}

/* ---------- 有底色的小標籤 ---------- */

/** 按住 ⌥ 從前一個標籤拖出一個複本，放好後顯示間距 */
async function duplicate(a: Agent, ctx: Ctx, el: HTMLElement | SVGElement, from: Element, adjacent: boolean) {
  a.use('move', L(ctx, '⌥ 複製', '⌥ Duplicate'));
  const center = (e: Element): Point => {
    const b = e.getBoundingClientRect();
    return [b.left + b.width / 2, b.top + b.height / 2];
  };
  await a.flyTo(() => center(from));
  keycap('⌥', () => [a.x + 16, a.y - 30], 800);
  a.press = true;
  a.lock = true;
  const fb = from.getBoundingClientRect();
  const eb = el.getBoundingClientRect();
  const dx = fb.left - eb.left;
  const dy = fb.top - eb.top;
  el.classList.remove('ag-hide', 'ag-shell');
  el.classList.add('ag-live');
  await animate(480 * ctx.pace(), (p) => {
    const e = easeInOut(p);
    el.style.transform = `translate(${dx * (1 - e)}px, ${dy * (1 - e)}px)`;
    [a.tx, a.ty] = center(el);
  });
  el.style.removeProperty('transform');
  a.press = false;
  a.lock = false;
  // 只量相鄰的間距；跨好幾個元素的距離量出來沒有意義
  const sameRow = Math.abs(fb.top - eb.top) < eb.height / 2;
  const gap = sameRow ? eb.left - fb.right : eb.top - fb.bottom;
  if (adjacent && gap >= 2 && gap <= 120) measure(rectOf(from), rectOf(el), sameRow ? 'x' : 'y', 900);
}

export async function buildChip(a: Agent, ctx: Ctx, t: Task) {
  const el = t.el as HTMLElement;
  const target = rectOf(el);
  const name = snippet(el);
  const icons = Array.from(el.querySelectorAll('svg'));
  icons.forEach((svg) => keepStyle(t, svg));
  const sp = new Split(el);
  t.cleanups.push(() => sp.restore());
  el.style.setProperty('--ag-c', a.color);
  el.classList.add('ag-typing');

  const source = [t.prev, t.master].find((x) => x?.done || x?.shaped);
  if (source) {
    await duplicate(a, ctx, el, source.el, source === t.prev);
    ctx.layer(a, 'rect', name);
    t.shaped = true;
  } else {
    const tool = t.round ? 'ellipse' : 'rect';
    a.use(tool, t.round ? L(ctx, '橢圓', 'Ellipse') : L(ctx, '矩形', 'Rectangle'));
    const shape = new Shape(tool, a.color);
    const pill = await dragOut(a, ctx, target, shape, 380);
    ctx.layer(a, tool, name);
    if (!t.round) await radiusDrag(a, ctx, target, shape, radiusOf(el));
    await paint(a, ctx, target, shape, el);
    icons.forEach((svg) => (svg.style.opacity = '0'));
    el.classList.remove('ag-hide');
    el.classList.add('ag-live');
    t.shaped = true;
    shape.remove(100);
    pill?.remove();
    for (const svg of icons) {
      a.use('pen', L(ctx, '鋼筆', 'Pen'));
      await penDraw(a, ctx, t, svg);
    }
  }
  a.use('text', L(ctx, '輸入', 'Typing'));
  await typeIn(a, ctx, sp, 32);
}

/* ---------- 留言 ---------- */

const COMMENTS = {
  zh: ['看起來很棒 ✨', 'LGTM ✓', '這區完成 👍', '間距很舒服', '可以上線了 🚀'],
  en: ['Looks great ✨', 'LGTM ✓', 'Section done 👍', 'Nice spacing', 'Ready to ship 🚀'],
};

/** 一個區塊全部完成後，在右上角釘一則留言 */
export async function comment(a: Agent, ctx: Ctx, f: Frame) {
  const b = f.el.getBoundingClientRect();
  if (b.bottom < 140 || b.top > innerHeight - 160) return;
  const spot = (): Point => {
    const r = f.el.getBoundingClientRect();
    return [clamp(r.right - 40, 24, innerWidth - 230), clamp(r.top + 36, 96, innerHeight - 150)];
  };
  a.use('comment', L(ctx, '留言', 'Comment'));
  await a.flyTo(spot);
  a.click();
  pin(spot, a.color, a.name[0], pick(ctx.zh ? COMMENTS.zh : COMMENTS.en));
  await sleep(300);
}
