// 「關於我」頁，改寫自推甄自傳。
import type { Entry } from './site';
// 程式語言圖示取自 Simple Icons（CC0，https://simpleicons.org），單色剪影。
import SwiftIcon from '../assets/icons/swift.svg';
import DartIcon from '../assets/icons/dart.svg';
import TypeScriptIcon from '../assets/icons/typescript.svg';
import JavaScriptIcon from '../assets/icons/javascript.svg';
import CIcon from '../assets/icons/c.svg';
import CppIcon from '../assets/icons/cplusplus.svg';
import PythonIcon from '../assets/icons/python.svg';
import FlutterIcon from '../assets/icons/flutter.svg';
import MediaPipeIcon from '../assets/icons/mediapipe.svg';
import FirebaseIcon from '../assets/icons/firebase.svg';
import SupabaseIcon from '../assets/icons/supabase.svg';
import GoogleCloudIcon from '../assets/icons/googlecloud.svg';
import CloudflareWorkersIcon from '../assets/icons/cloudflareworkers.svg';

export const education: Entry[] = [
  {
    title: '逢甲大學',
    subtitle: '資訊工程學系 學士',
    date: '2023.09 – 2027.06（預計）',
  },
  {
    title: '臺中市立臺中第二高級中等學校（台中二中）',
    date: '2020.09 – 2023.06',
  },
];

export const story: { title: string; paragraphs: string[] }[] = [
  {
    title: '從社員到社長',
    paragraphs: [
      '上大學後，我因為喜歡 Apple 而加入 iOS Club。一開始我覺得自己還沒有能力參加比賽，直到大一下學期，學長邀請我一起參加全國電子設計創意競賽，才開啟了後來一路參賽、做研究的旅程。',
      '大二我擔任 iOS Club 教學長，大三接任社長。擔任教學長時開的課被 Google Developer Groups on Campus FCU 的社長看見，邀請我擔任下一屆的副社長，那一年我同時帶領兩個社團，兩社共辦 46 場活動、24 堂社課。',
    ],
  },
  {
    title: '從一個人到一個團隊',
    paragraphs: [
      '大二上我開始自己開發半逢遇甲，原因是同學想一眼看到整週的課表。後來陸續加入美食地圖、特約商店與 iLearn 作業提醒等功能。上架第一天就登上 App Store 工具程式免費榜第 2 名，上線一週後用系統易用性量表（SUS）調查 277 位使用者，平均 82.9 分，高於常用基準 68 分。',
    ],
  },
  {
    title: '以賽促學',
    paragraphs: [
      '對我來說，比賽不是目的，而是逼自己學新東西最快的方式。大一下第一次參加全國電子設計創意競賽，學長姐先要我大量閱讀文獻，我負責整理文獻並設計訓練機制，作品拿下冠軍。那次讓我知道，好的作品是從讀懂問題開始的。',
      '之後每一場比賽，我都讓自己學一樣新東西。PetScan 是我第一次當隊長，Hand Maestro 是我第一次實作 Core ML，後來改寫成 IEEE BECITHCON 2026 的英文論文。大三下的混合實境視覺空間忽略注意力訓練系統拿下亞軍，並延伸成國科會大專學生研究計畫。比賽一路帶著我，從寫程式走到做研究。',
    ],
  },
  {
    title: '站上 Apple Park',
    paragraphs: [
      '2026 年 6 月，我抽中 WWDC26 的實體名額，到 Apple Park 看 Keynote、參加議程。這趟也讓我學到，與其一直加功能，不如先把核心體驗做到最好。',
      '我學到最多的其實跟技術無關，而是 Apple 把活動的每個細節都做好，現場每個人的自信與快樂互相感染，讓我覺得自己屬於這裡。',
    ],
  },
  {
    title: '從聽眾到主辦',
    paragraphs: [
      '我參加的第一場技術社群活動是 iPlayground 2024，那時多數議程我還聽不太懂。之後我開始固定參加 DevFest、COSCUP 等開發者活動，也把自己的作品帶到台中的 Codex 社群聚會，請不同領域的人試用並給我回饋。',
      '慢慢地，我從聽眾變成辦活動的人。2025 年在 World Taichung Developer Workshop 擔任講者，2026 年擔任 iPlayground 學生社群負責人，並主辦 Swift Students Cafe 第一次在台灣的場次。現在我也是 Raycast 台灣大使。',
    ],
  },
];

export const traits: { title: string; paragraph: string }[] = [
  {
    title: '想到就去做',
    paragraph:
      '比起把計畫想得很完美，我更習慣先做出一個能用的版本，再邊做邊修。很多事情一開始看起來很大，但拆成小步驟之後，就知道今天可以先完成哪一件。我覺得執行力不是做得快，而是能一步一步把事情做完。',
  },
  {
    title: '先想到人',
    paragraph:
      '不管是隊友還是使用者，我做事時都會先想到人。帶團隊時，我會先把方向講清楚，也會留意大家的狀態。寫程式時，我常把自己當成第一次使用的人，想像會在哪裡卡住。功能做得出來只是第一步，讓人願意用、用得順手，才算真的完成。',
  },
];

export const closing =
  'Apple 常說要用程式碼的力量改變世界，我一直很喜歡這句話。程式對我來說不只是作業或比賽，而是真的能幫助身邊的人的工具。看到自己做的東西被別人用上，那份成就感就是我一路走到現在、也想繼續走下去的動力。';

export const languages = [
  { name: 'Swift', icon: SwiftIcon },
  { name: 'Dart', icon: DartIcon },
  { name: 'TypeScript', icon: TypeScriptIcon },
  { name: 'JavaScript', icon: JavaScriptIcon },
  { name: 'C', icon: CIcon },
  { name: 'C++', icon: CppIcon },
  { name: 'Python', icon: PythonIcon },
];

/** 技能圖示：有官方圖示就用 icon，沒有的（Apple 框架等）用 mono 縮寫字當單色字標 */
export type Skill = { name: string; icon?: (typeof languages)[number]['icon']; mono?: string };

export const frameworkSkills: Skill[] = [
  { name: 'SwiftUI', mono: 'SU' },
  { name: 'RealityKit', mono: 'RK' },
  { name: 'ARKit', mono: 'AR' },
  { name: 'WidgetKit', mono: 'WK' },
  { name: 'SwiftData', mono: 'SD' },
  { name: 'Flutter', icon: FlutterIcon },
];

export const aiSkills: Skill[] = [
  { name: 'Core ML', mono: 'ML' },
  { name: 'Vision', mono: 'Vi' },
  { name: 'MediaPipe', icon: MediaPipeIcon },
  { name: 'Whisper', mono: 'W' },
  { name: 'RAG', mono: 'RAG' },
];

export const cloudSkills: Skill[] = [
  { name: 'Firebase', icon: FirebaseIcon },
  { name: 'Supabase', icon: SupabaseIcon },
  { name: 'Google Cloud Run', icon: GoogleCloudIcon },
  { name: 'Cloudflare Workers', icon: CloudflareWorkersIcon },
];

export const deviceSkills: Skill[] = [{ name: 'Jamf School', mono: 'J' }];

export const skillGroups: { label: string; items: Skill[] }[] = [
  { label: '程式語言', items: languages },
  { label: '框架', items: frameworkSkills },
  { label: 'AI', items: aiSkills },
  { label: '雲端', items: cloudSkills },
  { label: '裝置管理', items: deviceSkills },
];

