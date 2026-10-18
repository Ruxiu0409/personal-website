// 「作品集」頁。隊友姓名不公開，只寫自己的角色。
// 內容取自 experience.ts、awards.ts 與推甄資料簡報；圖片來源 ~/Project/推甄/Assets。
import type { Project } from './site';
import banFengImg from '../assets/portfolio/ban-feng-yu-jia.png';
import lumaStageImg from '../assets/portfolio/lumastage.png';
import neglectImg from '../assets/portfolio/mr-neglect-training.png';
import fcuMobileImg from '../assets/portfolio/fcu-mobile.png';
import parcelImg from '../assets/portfolio/smart-parcel.png';
import tcmImg from '../assets/portfolio/tcm-diagnosis-companion.png';
import handMaestroImg from '../assets/portfolio/hand-maestro.png';
import travelImg from '../assets/portfolio/travel-copywriter.png';
import petScanImg from '../assets/portfolio/petscan.png';
import fitnessImg from '../assets/portfolio/fitness-butler.png';
import chairImg from '../assets/portfolio/chair-fitness.png';

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
    slug: 'lumastage',
    title: 'LumaStage',
    role: '產品經理、主要開發',
    date: '2026.07',
    summary: '用文字描述氛圍，以 LLM 生成整場舞台燈光設定，並在 iPad 上預覽實景燈光。',
    body: [
      '第一版用裝置端 Foundation Models 一次生成整場燈光，撐爆 4,096 token 的 context window。後來用 @Generable 固定格式，拆成兩階段：先生燈具骨架，再一個 cue 開一個 session，裝置端可生成 4–12 盞、2–6 個 cue 的整場燈光，後來改用雲端 LLM。',
    ],
    award: '行動應用創新賽（MAIC）三等獎',
    image: lumaStageImg,
    imageAlt: 'LumaStage 在校園實景中預覽虛擬舞台、燈架與燈具',
    tags: ['SwiftUI', 'Foundation Models', 'RealityKit', 'ARKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/Ruxiu0409/LumaStage' }],
  },
  {
    slug: 'mr-neglect-training',
    title: '混合實境視覺空間忽略注意力訓練系統',
    role: '計畫執行學生・測驗與照顧者端開發',
    date: '2026',
    summary:
      '在 Apple Vision Pro 上做中風後視覺空間忽略的評估與訓練系統，後來延伸成國科會大專學生研究計畫。',
    body: [
      '以 SwiftUI 與 RealityKit 開發星星刪除、線段平分、蝴蝶追蹤等測驗與 iPad 照顧者端。臨床上只做一份紙筆測驗，至少會漏掉 42.5% 的病人（Bosma et al., 2023），我想讓病人在家也能自己評估與訓練。',
      '延伸成國科會計畫後，系統先找出病人從哪個角度開始注意不到，誤差在 1 度以內，再讓訓練目標沿著這條忽略邊界出現，並招募 14 位受試者完成實地測試。',
    ],
    award: '第二十二屆全國電子設計創意競賽 亞軍',
    image: neglectImg,
    imageAlt: 'Apple Vision Pro 中的星星刪除測驗，白色圖形浮在真實房間的牆面前',
    tags: ['visionOS', 'SwiftUI', 'RealityKit'],
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
    imageAlt: '行動逢甲的 3D 校園地圖，顯示步行到資訊電機館的路線、預估時間與剩餘距離',
    tags: ['Flutter', 'Google Maps Platform'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6633420933' }],
  },
  {
    slug: 'smart-parcel',
    title: '社區智慧包裹收受管理系統',
    role: '解法發想與後端',
    date: '2026.03',
    summary:
      '給社區大樓的包裹收受系統，以身分、條碼、重量、影像四因子交叉驗證包裹與領件人，取代人工登記。',
    body: [
      '題目由保全公司出題，我提出不做實體櫃門、改用四因子交叉驗證的解法。以 FastAPI 與 Supabase 建立後端並部署到 Google Cloud Run，重量異常或有人停留過久就即時通報物管。',
    ],
    award: '第二十二屆全國電子設計創意競賽 佳作',
    image: parcelImg,
    imageAlt: '物管 iPad 的包裹上架畫面，輸入收件資訊後掃描條碼並放上秤重貨架',
    tags: ['FastAPI', 'Supabase', 'Cloud Run'],
  },
  {
    slug: 'tcm-diagnosis-companion',
    title: '三診隨行',
    role: '團隊成員',
    date: '2025.07',
    summary: '中醫望、聞、問三診的輔助 App，分析舌象、語氣與主訴後產生調理方案，並在手上標出穴位。',
    body: [
      '望診用 YOLO 在 16,551 張舌象照片上訓練，聞診分析語氣，問診由 LLM 加 RAG 生成調理方案，再用 MediaPipe 依同身寸法在手上標出穴位。',
    ],
    award: '第十屆海峽兩岸青少年創客大賽 上海賽區二等獎、福州賽區優秀展覽獎',
    image: tcmImg,
    imageAlt: '三診隨行的診療結果畫面，列出舌診、聞診、主訴與 AI 調理建議',
    tags: ['YOLO', 'MediaPipe', 'RAG'],
  },
  {
    slug: 'hand-maestro',
    title: 'Hand Maestro',
    role: '隊長',
    date: '2025.03',
    summary: '給輕偏癱患者的遊戲化手部訓練 App，不用戴裝置，平板鏡頭追蹤雙手就能跟著音樂訓練。',
    body: [
      '平板鏡頭追蹤雙手 21 個關節點，以食指當游標跟著音樂完成關卡，同時量化手抖程度與雙手協調。這是我第一次實作 Core ML，後來改寫成 IEEE BECITHCON 2026 論文。',
    ],
    award: '第二十一屆全國電子設計創意競賽 IEEE Tainan Section 特別獎',
    image: handMaestroImg,
    imageAlt: 'Hand Maestro 的 iPad 主畫面，可選擇單手指揮或雙手協奏模式',
    tags: ['MediaPipe', 'Core ML', 'SwiftUI'],
  },
  {
    slug: 'travel-copywriter',
    title: '旅文寫手',
    role: '模型與 RAG',
    date: '2024.10',
    summary: '以生成式 AI 替南投冷門景點寫旅遊文案，把人潮從熱門景點分散到其他鄉鎮。',
    body: [
      '以實地訪查與政府開放資料建立南投景點知識庫，用聯發科達哥模型搭配 RAG 生成冷門景點旅遊文案。',
    ],
    award: '南投縣山城數位黑客松 大專組 銅獎',
    image: travelImg,
    imageAlt: '旅文寫手的系統架構圖：景點資料與撰文技巧經 RAG 生成創意旅遊文案',
    tags: ['RAG', 'LLM'],
  },
  {
    slug: 'petscan',
    title: 'PetScan',
    role: '隊長',
    date: '2024.07',
    summary: '狗狗皮膚檢查 App，在手機上直接判斷健康、濕疹或異位性皮膚炎，照片不上傳。',
    body: [
      '只有 36 張照片，用資料擴增與留一驗證訓練 Create ML 模型，由 Core ML 在手機上直接辨識。設計稿由我手寫成 SwiftUI。',
    ],
    award: '行動應用創新賽（MAIC）三等獎',
    image: petScanImg,
    imageAlt: 'PetScan 獸醫隨行的 App 圖示與名稱',
    tags: ['Create ML', 'Core ML', 'SwiftUI'],
    links: [{ label: 'GitHub', href: 'https://github.com/Ruxiu0409/PetScan-Maic' }],
  },
  {
    slug: 'fitness-butler',
    title: '健身管家',
    role: 'App 開發',
    date: '2024',
    summary: '結合飲食與運動的健康管理 App，以 SwiftUI 串接 HealthKit，並由 LLM 生成飲食建議與食譜。',
    award: '第九屆海峽兩岸青少年創客大賽 三等獎（上海賽區）',
    image: fitnessImg,
    imageAlt: '健身管家的基本資料、營養評估與 AI 健康飲食建議畫面',
    tags: ['SwiftUI', 'HealthKit'],
  },
  {
    slug: 'chair-fitness',
    title: '椅上健康',
    role: '文獻探討與訓練機制',
    date: '2024.03',
    summary: '輪椅使用者坐著就能做的運動 App，iPad 前鏡頭追蹤雙手手腕，把上肢動作做成遊戲關卡。',
    body: [
      '我負責文獻探討與訓練機制，依肩袖撕裂風險把單場遊戲限制在 10 分鐘內。',
    ],
    award: '第二十屆全國電子設計創意競賽 冠軍',
    image: chairImg,
    imageAlt: '椅上健康的 iPad 主畫面，列出各種上肢運動遊戲關卡',
    tags: ['Vision', 'Core ML', 'SwiftUI'],
  },
];
