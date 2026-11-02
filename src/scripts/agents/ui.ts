// 底部仿 Figma 的工具列（代理人正在用的工具會亮起來）和左側的圖層面板。

import type { Agent } from './agent';
import { TOOL_ICONS, type Tool } from './icons';

export class Toolbar {
  private readonly tools = new Map<Tool, HTMLElement>();
  private readonly avatars: HTMLElement[] = [];
  private readonly status: HTMLElement | null;
  private readonly bar: HTMLElement | null;

  constructor(
    private readonly root: HTMLElement,
    private readonly agents: Agent[],
    private readonly zh: boolean,
  ) {
    for (const el of Array.from(root.querySelectorAll<HTMLElement>('.ag-tool'))) {
      this.tools.set(el.dataset.tool as Tool, el);
    }
    const stack = root.querySelector('.ag-avatars');
    for (const a of agents) {
      const b = document.createElement('b');
      b.style.setProperty('--c', a.color);
      b.textContent = a.name[0];
      stack?.append(b);
      this.avatars.push(b);
    }
    this.status = root.querySelector('.ag-status');
    this.bar = root.querySelector('.ag-progress > span');
    if (this.bar) this.bar.style.background = `linear-gradient(90deg, ${agents.map((a) => a.color).join(', ')})`;
    requestAnimationFrame(() => root.classList.add('on'));
  }

  refresh() {
    for (const [tool, el] of this.tools) {
      const users = this.agents.filter((a) => a.busy && a.tool === tool);
      el.classList.toggle('on', users.length > 0);
      if (users[0]) el.style.setProperty('--c', users[0].color);
      const dots = el.querySelector('.ag-dots');
      const sig = users.map((u) => u.color).join();
      if (dots && dots.getAttribute('data-sig') !== sig) {
        dots.setAttribute('data-sig', sig);
        dots.innerHTML = users.map((u) => `<b style="--c: ${u.color}"></b>`).join('');
      }
    }
    this.agents.forEach((a, i) => this.avatars[i]?.classList.toggle('busy', a.busy));
  }

  progress(built: number, total: number, working: number) {
    if (this.bar) this.bar.style.scale = `${total ? built / total : 1} 1`;
    if (!this.status) return;
    const count = `${built}/${total}`;
    this.status.textContent = working
      ? this.zh
        ? `${working} 個代理人施工中 · ${count}`
        : `${working} agent${working > 1 ? 's' : ''} building · ${count}`
      : this.zh
        ? `待命中 · ${count}`
        : `Standing by · ${count}`;
  }

  done() {
    this.root.classList.add('done');
    if (this.status) this.status.textContent = this.zh ? '✓ 已發布' : '✓ Published';
    this.refresh();
  }

  hide() {
    this.root.classList.remove('on');
  }
}

export class Layers {
  private readonly list: HTMLElement | null = null;

  constructor(
    private readonly root: HTMLElement | null,
    zh: boolean,
  ) {
    // 只在左邊有足夠空白的寬螢幕顯示，不蓋到內容
    if (!root || innerWidth < 1440) return;
    const head = root.querySelector('.ag-layers-head');
    if (head) head.textContent = zh ? '圖層' : 'Layers';
    this.list = root.querySelector('ul');
    root.classList.add('on');
  }

  add(tool: Tool, name: string, color: string) {
    if (!this.list) return;
    const li = document.createElement('li');
    li.className = 'sel';
    li.style.setProperty('--c', color);
    li.innerHTML = `<svg viewBox="0 0 16 16">${TOOL_ICONS[tool]}</svg>`;
    const label = document.createElement('span');
    label.textContent = name;
    li.append(label, document.createElement('i'));
    this.list.prepend(li);
    setTimeout(() => li.classList.remove('sel'), 1200);
    while (this.list.children.length > 9) this.list.lastElementChild?.remove();
  }

  hide() {
    this.root?.classList.remove('on');
  }
}
