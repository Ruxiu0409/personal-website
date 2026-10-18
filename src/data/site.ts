// 網站共用設定。各頁內容分別在 about.ts、experience.ts、awards.ts、community.ts。
// 內容來源：~/Project/推甄/推甄資料.key（最新版兩頁 CV、自傳、各章節，2026-10）。
export const site = {
  name: '蔡承曄',
  nameEn: 'Tsai Cheng-Yeh',
  handle: 'tsaicy',
  title: '蔡承曄 Tsai Cheng-Yeh — tsaicy.dev',
  description:
    '蔡承曄，逢甲大學資訊工程學系學生，做 visionOS 與 iOS 開發，研究混合實境醫療復健系統。',
  location: 'Taichung, Taiwan',
  tagline: '混合實境醫療復健系統｜visionOS、iOS 應用開發',
  intro:
    '逢甲大學資訊工程學系四年級。執行國科會大專學生研究計畫，在 Apple Vision Pro 上做中風後視覺空間忽略的評估與訓練系統。做過首次下載超過一萬兩千次的校園 App「半逢遇甲」，當過逢甲 iOS Club 社長，2026 年實體參加 WWDC26。',
  links: [
    { label: 'GitHub', href: 'https://github.com/Ruxiu0409' },
    { label: 'Email', href: 'mailto:enokgood2@gmail.com' },
  ],
};

export const nav = [
  { href: '/', label: '首頁' },
  { href: '/about/', label: '關於我' },
  { href: '/experience/', label: '個人經歷' },
  { href: '/awards/', label: '競賽' },
  { href: '/community/', label: '社群與活動' },
];

export type Entry = {
  title: string;
  subtitle?: string;
  date: string;
  /** 一句話摘要，顯示在標題下方 */
  description?: string;
  /** 詳細段落，只在分頁顯示 */
  body?: string[];
  href?: string;
  tags?: string[];
};

export type Section = {
  id: string;
  label: string;
  items: Entry[];
};
