// 排程：捲到畫面裡的步驟進佇列，閒著的代理人挑最上面、離自己近的來做。
// 沒人處理就被捲走的區塊直接完成，往回捲時內容一定都在；列印時全部完成。

import * as build from './actions';
import type { Ctx } from './actions';
import { Agent, type AgentSpec } from './agent';
import { collect, type Frame, type Kind, type Task } from './collect';
import { clamp, FrameTag, initStage, pick, runLoop } from './stage';
import { Layers, Toolbar } from './ui';

const AGENTS: AgentSpec[] = [
  { name: 'Claude', color: '#d97757' },
  { name: 'Codex', color: '#10a37f' },
  { name: 'Gemini', color: '#4f7cff' },
  { name: 'Cursor', color: '#a855f7' },
  { name: 'Copilot', color: '#e0457b' },
  { name: 'Devin', color: '#d4a106' },
];

const CHAT: Record<'zh' | 'en', Record<Kind, string[]>> = {
  zh: {
    frame: ['先拉一個 Frame', 'Hero 交給我'],
    shell: ['底色我來填', '圓角調一下'],
    image: ['圖片我來放', '先畫矩形再填圖'],
    vector: ['icon 用鋼筆描', '向量我來畫'],
    text: ['文案我來寫', '這段交給我'],
    chip: ['標籤複製一下', '間距 8px 剛好'],
  },
  en: {
    frame: ['Framing this', "I'll take the hero"],
    shell: ['On the fill', 'Rounding corners'],
    image: ['Placing the image', 'Rect first, then fill'],
    vector: ['Tracing the icon', 'Pen tool time'],
    text: ['On the copy', "I've got this one"],
    chip: ['Duplicating tags', '8px gap looks right'],
  },
};

export function start() {
  const root = document.documentElement;
  if (!root.classList.contains('ag-on')) return;
  const canvas = document.querySelector<HTMLElement>('.ag-canvas');
  const cursorLayer = document.querySelector<HTMLElement>('.ag-cursors');
  const bar = document.querySelector<HTMLElement>('.ag-toolbar');
  if (!canvas || !cursorLayer || !bar) {
    root.classList.add('ag-ready');
    return;
  }
  initStage(canvas);
  const zh = root.lang.startsWith('zh');
  const lang = zh ? 'zh' : 'en';

  const scopes = Array.from(document.querySelectorAll<HTMLElement>('body > header.hero, main'));
  const frameEls = outermost(
    Array.from(document.querySelectorAll<HTMLElement>('body > header.hero, main section, main > header')),
  );
  const { tasks, frames, byEl } = collect(scopes, frameEls);
  for (const t of tasks) {
    if (t.kind === 'frame' || t.kind === 'shell') t.el.classList.add('ag-shell', 'ag-pseudo');
    else t.el.classList.add('ag-hide');
  }
  root.classList.add('ag-ready');
  if (!tasks.length) return;

  // ---------- 代理人、工具列、圖層面板 ----------
  const count = innerWidth < 640 ? 3 : innerWidth < 1024 ? 4 : AGENTS.length;
  const home = bar.getBoundingClientRect();
  let toolbar: Toolbar | undefined;
  const agents = AGENTS.slice(0, count).map(
    (spec, i) =>
      new Agent(spec, cursorLayer, home.left + home.width / 2 + (i - count / 2) * 22, home.top, () =>
        toolbar?.refresh(),
      ),
  );
  toolbar = new Toolbar(bar, agents, zh);
  const layers = new Layers(document.querySelector<HTMLElement>('.ag-layers'), zh);
  runLoop((dt) => agents.forEach((a) => a.step(dt)));

  // ---------- 共用狀態 ----------
  const visible = new Set<Element>();
  const tags = new Map<Frame, FrameTag>();
  const counters = { rect: 0, ellipse: 0 };
  let built = 0;
  let finished = false;
  let started = false;
  let paceValue = 1;
  let paceAt = 0;

  const isReady = (t: Task) =>
    !t.claimed && !t.done && visible.has(t.el) && t.deps.every((d) => d.done || (d === t.master && d.shaped));

  const ctx: Ctx = {
    zh,
    pace() {
      const now = performance.now();
      if (now - paceAt > 250) {
        paceAt = now;
        const waiting = tasks.filter(isReady).length;
        paceValue = clamp(1 / (1 + Math.max(0, waiting - 2) * 0.14), 0.35, 1);
      }
      return paceValue;
    },
    layer: (a, tool, name) => layers.add(tool, name, a.color),
    frameTag(f, color) {
      let tag = tags.get(f);
      if (!tag) {
        tag = new FrameTag(f.el, f.name, color);
        tags.set(f, tag);
      } else if (color) {
        tag.select(color);
      }
      return tag;
    },
    count: (kind) => ++counters[kind],
  };

  // ---------- 完成、跳過 ----------
  function finish(t: Task) {
    if (t.done) return;
    t.done = true;
    for (const fn of t.cleanups.splice(0)) {
      try {
        fn();
      } catch {
        // 還原失敗也不能讓內容卡著不出現
      }
    }
    t.el.classList.remove('ag-hide', 'ag-shell', 'ag-live', 'ag-typing');
    if (!t.backdropChild || t.backdropChild.done) t.el.classList.remove('ag-pseudo');
    if (t.backdrop) t.el.parentElement?.classList.remove('ag-pseudo');
    if (t.style0 === null) t.el.removeAttribute('style');
    else t.el.setAttribute('style', t.style0);
    io.unobserve(t.el);
    built++;
  }

  function skip(t: Task) {
    if (t.done || t.claimed) return;
    t.claimed = true;
    for (const d of t.deps) skip(d);
    finish(t);
    if (t.frame) void closeFrame(t.frame);
  }

  async function closeFrame(f: Frame, a?: Agent) {
    if (f.closed || !f.tasks.every((t) => t.done)) return;
    f.closed = true;
    if (a && f.tasks.length >= 4 && Math.random() < 0.75) {
      try {
        await build.comment(a, ctx, f);
      } catch (err) {
        console.error(err);
      }
    }
    tags.get(f)?.close();
  }

  // ---------- 派工：由上往下，每個工作交給離它最近的閒置代理人 ----------
  function dispatch() {
    const open = tasks
      .filter(isReady)
      .map((t) => ({ t, r: t.el.getBoundingClientRect() }))
      .sort((p, q) => p.r.top - q.r.top || p.r.left - q.r.left);
    for (const { t, r } of open) {
      let best: Agent | undefined;
      let dist = Infinity;
      for (const a of agents) {
        if (a.busy) continue;
        const d = Math.hypot(r.left - a.x, r.top - a.y);
        if (d < dist) {
          dist = d;
          best = a;
        }
      }
      if (!best) break;
      void run(best, t);
    }
    refreshHud();
  }

  async function run(a: Agent, t: Task) {
    a.busy = true;
    t.claimed = true;
    if (!started) {
      started = true;
      a.say(zh ? '開工！' : "Let's build!");
    } else if (Math.random() < 0.16) {
      a.say(pick(CHAT[lang][t.kind]));
    }
    try {
      if (t.kind === 'frame') await build.buildFrame(a, ctx, t);
      else if (t.kind === 'shell') await build.buildShell(a, ctx, t);
      else if (t.kind === 'image') await build.buildImage(a, ctx, t);
      else if (t.kind === 'vector') await build.buildVector(a, ctx, t);
      else if (t.kind === 'chip') await build.buildChip(a, ctx, t);
      else await build.buildText(a, ctx, t);
    } catch (err) {
      console.error(err);
    }
    finish(t);
    a.lock = false;
    a.press = false;
    if (t.frame) await closeFrame(t.frame, a);
    a.busy = false;
    a.use('move');
    idle(a);
    dispatch();
  }

  /** 沒事做的代理人在畫面兩側晃 */
  function idle(a: Agent) {
    const i = agents.indexOf(a);
    a.tx = (i % 2 === 0 ? 0.06 : 0.94) * innerWidth + (Math.random() - 0.5) * 50;
    a.ty = innerHeight * (0.3 + 0.1 * i) + (Math.random() - 0.5) * 50;
  }

  function refreshHud() {
    if (finished) return;
    toolbar?.progress(
      built,
      tasks.length,
      agents.filter((a) => a.busy).length,
    );
    if (built < tasks.length) return;
    finished = true;
    toolbar?.done();
    pick(agents).say(zh ? '完成！🎉' : 'Shipped! 🎉', 2400);
    setTimeout(() => {
      toolbar?.hide();
      layers.hide();
      cursorLayer?.classList.add('rest');
    }, 2800);
  }

  // ---------- 可見度 ----------
  const frameByEl = new Map(frames.map((f) => [f.el as Element, f]));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const f = frameByEl.get(entry.target);
        if (f && entry.isIntersecting && !f.closed && !tags.has(f) && !f.task && !f.tasks.every((t) => t.done)) {
          ctx.frameTag(f);
        }
        const t = byEl.get(entry.target);
        if (!t) continue;
        if (entry.isIntersecting) {
          visible.add(t.el);
          t.seenAt ||= performance.now();
        } else if (visible.delete(t.el)) {
          skip(t);
        }
      }
      dispatch();
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  tasks.forEach((t) => io.observe(t.el));
  frames.forEach((f) => io.observe(f.el));

  // 保險：看得到卻一直等不到外層容器（容器本身不在畫面裡）時，直接把容器完成
  setInterval(() => {
    const now = performance.now();
    for (const t of tasks) {
      if (t.done || t.claimed || !visible.has(t.el) || !t.seenAt || now - t.seenAt < 5000) continue;
      for (const d of t.deps) if (!d.done && !d.claimed && !visible.has(d.el)) skip(d);
    }
    dispatch();
  }, 800);

  setInterval(() => agents.forEach((a) => !a.busy && idle(a)), 2800);
  addEventListener('beforeprint', () => tasks.forEach(finish));
  agents.forEach((a, i) => setTimeout(() => !a.busy && idle(a), 300 + i * 120));
}

/** 只留最外層的元素 */
function outermost<T extends Element>(els: T[]) {
  return els.filter((el) => !els.some((other) => other !== el && other.contains(el)));
}
