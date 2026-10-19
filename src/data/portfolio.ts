// 「作品集」頁。隊友姓名不公開，只寫自己的角色。
// 只放兩個校園 App；其他比賽作品寫在競賽頁（awards.ts）。圖片來源 ~/Project/推甄/Assets。
import type { Project } from './site';
import banFengImg from '../assets/portfolio/ban-feng-yu-jia.png';
import fcuMobileImg from '../assets/portfolio/fcu-mobile.png';

export const portfolio: Project[] = [
  {
    slug: 'ban-feng-yu-jia',
    title: '半逢遇甲',
    role: 'Founder',
    date: '2024.10',
    summary: '逢甲校園資訊整合 App，首次下載超過 12,000 次，App Store 評分 4.9。',
    body: [
      '學校官方 App 的課表要上下左右滑動才找得到課，我想讓學生一眼看到整週。上架第一天登上 App Store 工具程式免費榜第 2 名；上線一週後 277 位使用者的系統易用性量表（SUS）平均 82.9 分，淨推薦值（NPS）+56。',
      '功能包含課表與桌面、鎖定畫面小工具，MyFCU、iLearn 單一登入，iLearn 作業提醒，停車位與公車查詢，特約商店與校園美食地圖。帳號密碼只放在 Keychain，課表透過 App Group 分享給小工具，共用的 Swift Package 讓 App、小工具與 Android 版跑同一套課表邏輯，目前正以 Skip 移植 Android 版。',
    ],
    image: banFengImg,
    imageAlt: '半逢遇甲的週課表畫面，一頁看完週一到週五的課程與教室',
    tags: ['SwiftUI', 'WidgetKit', 'Firebase', 'MVVM'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6736971566' }],
  },
  {
    slug: 'fcu-mobile',
    title: '行動逢甲',
    role: 'Developer',
    date: '2024.12 – 2025.06',
    summary: '逢甲大學官方校園 App，以 Flutter 開發，負責四項功能。',
    body: [
      '做了課表 Widget，讓同學在主畫面就能看到課表；校園地圖以 Google Maps Platform 的 3D Maps 呈現立體校園建築並規劃步行路線；把各課程在 iLearn 上的作業整理成一份清單；並改版校園行事曆。',
    ],
    image: fcuMobileImg,
    imageAlt: '行動逢甲的首頁，列出我的通知、課務資訊、iLearn、MyFCU 等校園服務',
    tags: ['Flutter', 'Google Maps Platform'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6633420933' }],
  },
];
