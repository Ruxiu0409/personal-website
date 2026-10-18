// 「競賽」頁。隊友姓名不公開，只寫自己的角色。
import type { Entry, Section } from './site';

export const awardSections: Section[] = [
  {
    id: 'awards',
    label: '獲獎',
    items: [
      {
        title: '第二十二屆全國電子設計創意競賽 亞軍',
        subtitle: '混合實境視覺空間忽略注意力訓練系統',
        date: '2026.03',
        description:
          '以 SwiftUI 與 RealityKit 開發星星刪除、線段平分、蝴蝶追蹤等測驗與 iPad 照顧者端，後來延伸成國科會大專學生研究計畫。',
        tags: ['visionOS', 'RealityKit'],
      },
      {
        title: '第二十二屆全國電子設計創意競賽 佳作',
        subtitle: '社區智慧包裹收受管理系統・解法發想與後端',
        date: '2026.03',
        description:
          '題目由保全公司出題，我提出不做實體櫃門、改用身分、條碼、重量、影像四因子交叉驗證的解法。以 FastAPI 與 Supabase 建立後端並部署到 Google Cloud Run，重量異常或有人停留過久就即時通報物管。',
        tags: ['FastAPI', 'Supabase', 'Cloud Run'],
      },
      {
        title: '行動應用創新賽（MAIC）三等獎',
        subtitle: 'LumaStage・產品經理、主要開發',
        date: '2026.07',
        description:
          '用文字描述氛圍就生成整場舞台燈光。第一版用裝置端 Foundation Models 一次生成整場燈光，撐爆 4,096 token 的 context window；後來用 @Generable 固定格式、拆成兩階段生成，裝置端可生成 4–12 盞、2–6 個 cue 的整場燈光。',
        tags: ['Foundation Models', 'RealityKit', 'ARKit'],
      },
      {
        title: '第十屆海峽兩岸青少年創客大賽 上海賽區二等獎、福州賽區優秀展覽獎',
        subtitle: '三診隨行｜中醫望、聞、問三診輔助',
        date: '2025.07',
        description:
          '望診用 YOLO 在 16,551 張舌象照片上訓練，聞診分析語氣，問診由 LLM 加 RAG 生成調理方案，再用 MediaPipe 依同身寸法在手上標出穴位。',
        tags: ['YOLO', 'MediaPipe', 'RAG'],
      },
      {
        title: '第二十一屆全國電子設計創意競賽 IEEE Tainan Section 特別獎',
        subtitle: 'Hand Maestro｜遊戲化手部訓練・隊長',
        date: '2025.03',
        description:
          '給輕偏癱患者的手部訓練 App，不用戴裝置，平板鏡頭追蹤雙手 21 個關節點，以食指當游標跟著音樂完成關卡，同時量化手抖程度與雙手協調。這是我第一次實作 Core ML，後來改寫成 IEEE BECITHCON 2026 論文。',
        tags: ['MediaPipe', 'Core ML', 'SwiftUI'],
      },
      {
        title: '南投縣山城數位黑客松 大專組 銅獎',
        subtitle: '旅文寫手｜生成冷門景點旅遊文案・模型與 RAG',
        date: '2024.10',
        description:
          '以實地訪查與政府開放資料建立南投景點知識庫，用聯發科達哥模型搭配 RAG 生成冷門景點旅遊文案，把人潮從熱門景點分散到其他鄉鎮。',
        tags: ['RAG', 'LLM'],
      },
      {
        title: '行動應用創新賽（MAIC）三等獎',
        subtitle: 'PetScan｜狗狗皮膚檢查 App・隊長',
        date: '2024.07',
        description:
          '只有 36 張照片，用資料擴增與留一驗證訓練 Create ML 模型，在手機上直接判斷健康、濕疹或異位性皮膚炎，照片不上傳。設計稿由我手寫成 SwiftUI。',
        tags: ['Create ML', 'Core ML', 'SwiftUI'],
      },
      {
        title: '第九屆海峽兩岸青少年創客大賽 三等獎（上海賽區）',
        subtitle: '健身管家｜結合飲食與運動的健康管理 App',
        date: '2024',
        description: '負責 App 開發，以 SwiftUI 串接 HealthKit，並由 LLM 生成飲食建議與食譜。',
        tags: ['SwiftUI', 'HealthKit'],
      },
      {
        title: '第二十屆全國電子設計創意競賽 冠軍',
        subtitle: '椅上健康｜輪椅使用者坐著就能做的運動 App',
        date: '2024.03',
        description:
          'iPad 前鏡頭追蹤雙手手腕，把上肢動作做成遊戲關卡。我負責文獻探討與訓練機制，依肩袖撕裂風險把單場遊戲限制在 10 分鐘內。',
        tags: ['Vision', 'Core ML', 'SwiftUI'],
      },
      {
        title: '亞洲青少年腦神經科學大賽 亞軍',
        subtitle: '亞洲區腦神經科學知識測驗',
        date: '2025',
      },
      {
        title: '第七屆逢甲大學英語簡報比賽 佳作',
        date: '2025',
      },
    ],
  },
];

export const otherEntries: Entry[] = [
  { title: 'Bitrig Hacks（Y Combinator，Mountain View）', subtitle: '錯題紀錄 App', date: '2026' },
  { title: '中國高校計算機大賽 AIGC 創新賽', subtitle: 'CrispPic｜多人活動照片的共創記憶 Agent', date: '2026' },
  { title: 'WWDC Swift Student Challenge', subtitle: 'Dissociation｜判斷文字與表情是否帶情緒', date: '2026' },
  {
    title: '經濟部 2025 智慧創新大賞（AI 應用類學生組）入圍',
    subtitle: 'Finger Maestro｜本地端 LLM 與動態追蹤輔助手部訓練',
    date: '2025',
  },
  { title: '智在家鄉數位社會創新競賽', subtitle: 'iClub｜社團管理平台', date: '2025' },
];
