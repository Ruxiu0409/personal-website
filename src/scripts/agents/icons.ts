// 工具列、圖層面板和游標用的小圖示（16×16 線條圖示與 24×24 游標），全部是靜態字串。

export type Tool = 'move' | 'frame' | 'rect' | 'ellipse' | 'pen' | 'text' | 'image' | 'comment';

export const TOOLS: Tool[] = ['move', 'frame', 'rect', 'ellipse', 'pen', 'text', 'image', 'comment'];

export const TOOL_ICONS: Record<Tool, string> = {
  move: '<path d="M4 2.5v10l2.7-2.6 1.9 4.1 1.6-.7-1.9-4.1H12z"/>',
  frame: '<path d="M5.5 2v12M10.5 2v12M2 5.5h12M2 10.5h12"/>',
  rect: '<rect x="2.75" y="2.75" width="10.5" height="10.5" rx="1"/>',
  ellipse: '<circle cx="8" cy="8" r="5.5"/>',
  pen: '<path d="M8 1.75 12.5 8 8 14.25 3.5 8z"/><path d="M8 1.75v5.4"/><circle cx="8" cy="8.6" r="1.3"/>',
  text: '<path d="M3 3.5h10M8 3.5v9.5M6.2 13h3.6"/>',
  image:
    '<rect x="2.5" y="3" width="11" height="10" rx="1.5"/><circle cx="6" cy="6.5" r="1.2"/><path d="m2.5 11.5 3.3-3 2.4 2.1 1.8-1.6 3.5 3"/>',
  comment:
    '<path d="M3 3.5h10a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-.5.5H7l-3 2.5V11H3a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z"/>',
};

/** 游標外觀：箭頭（移動、放圖、留言）、十字（框架、矩形、橢圓）、I 字（文字）、鋼筆 */
export const CURSOR_ICONS = `
<svg class="i-arrow" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M4 2.5 20 11l-7.2 1.8L9.4 20z"/></svg>
<svg class="i-cross" width="24" height="24" viewBox="0 0 24 24"><path class="halo" d="M12 3v18M3 12h18"/><path class="line" d="M12 3v18M3 12h18"/></svg>
<svg class="i-beam" width="24" height="24" viewBox="0 0 24 24"><path class="halo" d="M8.5 4h7M12 4v16M8.5 20h7"/><path class="line" d="M8.5 4h7M12 4v16M8.5 20h7"/></svg>
<svg class="i-pen" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M3 3 14.5 7.5 19 12l-7 7-4.5-4.5z"/><path class="slit" d="m3 3 6.6 6.6"/><circle class="dot" cx="10.6" cy="10.6" r="1.5"/></svg>
`;
