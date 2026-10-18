// 網站內容都集中在這裡，改這個檔案就能更新首頁。
// 內容來源：~/Project/推甄/推甄資料.key 第 2–3 頁「最新版兩頁 CV」（2026-10）。
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
    '逢甲大學資訊工程學系四年級。執行國科會大專學生研究計畫，在 Apple Vision Pro 上做中風後視覺空間忽略的評估與訓練系統。做過累計上萬次下載的校園 App「半逢遇甲」，當過逢甲 iOS Club 社長，2026 年實體參加 WWDC26。',
  links: [
    { label: 'GitHub', href: 'https://github.com/Ruxiu0409' },
    { label: 'Email', href: 'mailto:enokgood2@gmail.com' },
  ],
};

export type Entry = {
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  href?: string;
  tags?: string[];
};

export const research: Entry[] = [
  {
    title: '整合視動刺激與適應性難度調整機制之混合實境視覺復健系統設計與評估',
    subtitle: '國科會大專學生研究計畫・計畫執行學生・畢業專題（指導教授 林佩蓉）',
    date: '2026.07 – 2027.02',
    description:
      '視覺空間忽略是中風後常見的症狀，臨床上只做一份紙筆測驗，至少會漏掉 42.5% 的病人。我在 Apple Vision Pro 上整合三項醫院常用測驗與兩項自訂任務，先找出病人從哪個角度開始注意不到（誤差 1 度內），再讓訓練目標沿著這條忽略邊界出現。與組員招募 14 位受試者完成實地測試。',
    tags: ['visionOS', 'SwiftUI', 'RealityKit'],
  },
];

export const publications: Entry[] = [
  {
    title:
      'A Vision-Based System for Gamified Hand Rehabilitation and Quantitative Motion Assessment in Individuals with Mild Hemiparesis',
    subtitle: '2026 IEEE BECITHCON・第三作者',
    date: '2026',
  },
  {
    title: '基於影像辨識與超音波感測之智慧環境管理即時回饋系統',
    subtitle: '第 20 屆創新、管理與知識社群國際研討會（iCIMKC）・第二作者',
    date: '2026',
  },
];

export const awards: Entry[] = [
  {
    title: '全國電子設計創意競賽 冠軍',
    subtitle: '椅上健康｜輪椅使用者坐著就能做的運動 App',
    date: '2024',
  },
  {
    title: '全國電子設計創意競賽 IEEE Tainan Section 特別獎',
    subtitle: 'Hand Maestro｜遊戲化手部復健',
    date: '2025',
  },
  {
    title: '全國電子設計創意競賽 亞軍',
    subtitle: '混合實境視覺空間忽略注意力訓練系統',
    date: '2026',
  },
  {
    title: '全國電子設計創意競賽 佳作',
    subtitle: '社區智慧包裹收受管理系統',
    date: '2026',
  },
  {
    title: '行動應用創新賽（MAIC）三等獎',
    subtitle: 'LumaStage｜以 LLM 生成舞台燈光設定',
    date: '2026',
  },
  {
    title: '行動應用創新賽（MAIC）三等獎',
    subtitle: 'PetScan｜狗狗皮膚檢查 App',
    date: '2024',
  },
  {
    title: '海峽兩岸青少年創客大賽 上海賽區二等獎、福州賽區優秀展覽獎',
    subtitle: '三診隨行｜中醫三診輔助',
    date: '2025',
  },
  {
    title: '海峽兩岸青少年創客大賽 三等獎',
    subtitle: '健身管家｜結合飲食與運動的健康管理 App',
    date: '2024',
  },
  {
    title: '亞洲青少年腦神經科學大賽 亞軍',
    date: '2025',
  },
  {
    title: '南投縣山城數位黑客松 大專組 銅獎',
    subtitle: '旅文寫手｜生成冷門景點旅遊文案',
    date: '2024',
  },
];

export const projects: Entry[] = [
  {
    title: '半逢遇甲',
    subtitle: 'Founder',
    date: '2024.10 – 現在',
    description:
      '逢甲校園資訊整合 App，首次下載超過 12,000 次。SwiftUI 開發，串接校務 API 與 SSO，以 SPM 套件共用模型供 WidgetKit 小工具讀取。',
    href: 'https://apps.apple.com/tw/app/id6736971566',
    tags: ['SwiftUI', 'WidgetKit', 'Firebase'],
  },
  {
    title: '行動逢甲',
    subtitle: 'Developer',
    date: '2024.12 – 2025.06',
    description: '逢甲大學官方校園 App。',
    tags: ['Flutter'],
  },
  {
    title: 'tsaicy.dev',
    date: '2026',
    description: '就是這個網站。Astro 建置，透過 GitHub Actions 部署到 Cloudflare Workers。',
    href: 'https://github.com/Ruxiu0409/personal-website',
    tags: ['Astro', 'Cloudflare Workers'],
  },
];

export const experience: Entry[] = [
  {
    title: '復興實驗中學',
    subtitle: '中學雙語部 ACE Club 社團老師',
    date: '2026.09 – 現在',
  },
  {
    title: '逢甲大學 Apple Regional Training Center',
    subtitle: 'Student Support',
    date: '2024.08 – 2026.06',
  },
  {
    title: '逢甲大學 課程助教',
    subtitle: '程式設計 I / II、計算機概論、行動應用程式開發、iOS App',
    date: '2024 – 2026',
  },
];

export const community: Entry[] = [
  { title: 'Raycast Community Taiwan', subtitle: '台灣大使', date: '2026.06 – 現在' },
  { title: 'iPlayground 2026', subtitle: '學生社群負責人', date: '2026.07' },
  { title: 'Swift Students Cafe 台灣場', subtitle: '主辦・主持・講者', date: '2026.07' },
  { title: 'WWDC26', subtitle: '實體參加', date: '2026.06' },
  { title: '逢甲大學 iOS Club', subtitle: '教學長／社長（第 8、9 屆）', date: '2024.08 – 2026.07' },
  { title: 'Google Developer Groups on Campus FCU', subtitle: 'Associate Lead', date: '2025.08 – 2026.07' },
  { title: 'World Taichung Developer Workshop', subtitle: '講者', date: '2025.11' },
];

export const sections = [
  { id: 'research', label: '研究', items: research },
  { id: 'publications', label: '論文', items: publications },
  { id: 'projects', label: '作品', items: projects },
  { id: 'awards', label: '競賽獲獎', items: awards },
  { id: 'experience', label: '工作經歷', items: experience },
  { id: 'community', label: '社群', items: community },
];
