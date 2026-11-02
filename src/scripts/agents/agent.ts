// 一個 AI 代理人的游標：有名字、顏色、目前用的工具，移動用臨界阻尼彈簧，路徑帶一點弧度。

import { CURSOR_ICONS, type Tool } from './icons';
import { every, node, ripple, type Point } from './stage';

export interface AgentSpec {
  name: string;
  color: string;
}

export class Agent {
  readonly name: string;
  readonly color: string;
  readonly node: HTMLElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
  /** true 時游標直接貼著目標（拖曳中），不跑彈簧 */
  lock = false;
  press = false;
  busy = false;
  tool: Tool = 'move';
  private vx = 0;
  private vy = 0;
  private readonly omega = 20 + Math.random() * 4;
  private readonly activity: HTMLElement;
  private readonly chat: HTMLElement;
  private chatTimer = 0;

  constructor(spec: AgentSpec, layer: HTMLElement, x: number, y: number, private readonly onTool: () => void) {
    this.name = spec.name;
    this.color = spec.color;
    this.x = this.tx = x;
    this.y = this.ty = y;
    this.node = node('ag-cursor', layer);
    this.node.style.setProperty('--c', this.color);
    this.node.dataset.tool = 'move';
    this.node.insertAdjacentHTML('beforeend', CURSOR_ICONS);
    const label = node('ag-name', this.node, 'span');
    label.textContent = this.name;
    this.activity = node('', label, 'em');
    this.chat = node('ag-chat', this.node, 'span');
    this.render();
  }

  use(tool: Tool, activity = '') {
    this.tool = tool;
    this.node.dataset.tool = tool;
    this.activity.textContent = activity ? ` · ${activity}` : '';
    this.onTool();
  }

  /** Figma 的游標聊天：名字旁邊冒出一句話 */
  say(text: string, ms = 1800) {
    this.chat.textContent = text;
    this.chat.classList.add('on');
    clearTimeout(this.chatTimer);
    this.chatTimer = window.setTimeout(() => this.chat.classList.remove('on'), ms);
  }

  step(dt: number) {
    if (this.lock) {
      this.x = this.tx;
      this.y = this.ty;
      this.vx = this.vy = 0;
    } else {
      // 分成小步積分，低幀率時速度也不會變慢
      const n = Math.ceil(dt * 120);
      const h = dt / n;
      const w = this.omega;
      for (let i = 0; i < n; i++) {
        this.vx += (w * w * (this.tx - this.x) - 2 * w * this.vx) * h;
        this.vy += (w * w * (this.ty - this.y) - 2 * w * this.vy) * h;
        this.x += this.vx * h;
        this.y += this.vy * h;
      }
    }
    this.render();
  }

  private render() {
    this.node.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(${this.press ? 0.85 : 1})`;
  }

  /** 飛到目標點，抵達後 resolve；目標跟著元素位置每幀更新 */
  flyTo(target: () => Point, maxMs = 1000): Promise<void> {
    const [ex, ey] = target();
    const dist = Math.hypot(ex - this.x, ey - this.y) || 1;
    const nx = -(ey - this.y) / dist;
    const ny = (ex - this.x) / dist;
    const bend = (Math.random() - 0.5) * 0.35 * Math.min(dist, 600);
    return new Promise((resolve) => {
      const t0 = performance.now();
      const stop = every((now) => {
        const [gx, gy] = target();
        const rem = Math.hypot(gx - this.x, gy - this.y);
        const f = Math.min(1, rem / dist);
        const arc = 4 * f * (1 - f) * bend;
        this.tx = gx + nx * arc;
        this.ty = gy + ny * arc;
        if ((rem < 5 && Math.hypot(this.vx, this.vy) < 160) || now - t0 > maxMs) {
          stop();
          resolve();
        }
      });
    });
  }

  click() {
    ripple(this.x, this.y, this.color);
    this.press = true;
    setTimeout(() => (this.press = false), 130);
  }
}
