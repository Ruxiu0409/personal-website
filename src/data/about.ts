// 「關於我」頁，改寫自推甄自傳。
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
      'App 越做越大之後，只靠我一個人寫已經不夠，我開始找人一起協作。為了讓別人看得懂、接得下去，我導入 MVVM 架構，把畫面、資料與業務邏輯分開，讓每個功能都有固定的位置和寫法。',
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
      '2026 年 6 月，我抽中 WWDC26 的實體名額，到 Apple Park 看 Keynote、參加議程。在 Design Lab，Apple 設計師建議我把 LumaStage 的整個體驗放進 Vision Pro；在 Bitrig Bash，Apple Foundation Models 的負責人建議我先把原本的功能做好。回台灣後，我把 Foundation Models 文件從頭讀完，改寫了 LumaStage 的生成流程，也學到與其一直加功能，不如先把核心體驗做到最好。',
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
    title: '回到原始文件找答案',
    paragraph:
      '遇到不懂的地方，我會先回到最原始的文件和資料找答案，而不是只照著別人整理好的做法。看懂背後的原理再動手，常常能找到更適合的方法。',
  },
  {
    title: '先想到人',
    paragraph:
      '不管是隊友還是使用者，我做事時都會先想到人。帶團隊時，我會先把方向講清楚，也會留意大家的狀態。寫程式時，我常把自己當成第一次使用的人，想像會在哪裡卡住。功能做得出來只是第一步，讓人願意用、用得順手，才算真的完成。',
  },
];

export const closing =
  'Apple 常說要用程式碼的力量改變世界，我一直很喜歡這句話。程式對我來說不只是作業或比賽，而是真的能幫助身邊的人的工具。看到自己做的東西被別人用上，那份成就感就是我一路走到現在、也想繼續走下去的動力。';

export const skills: { label: string; value: string }[] = [
  { label: '語言', value: 'Swift, Dart, TypeScript / JavaScript, C / C++, Java, Python' },
  {
    label: '框架',
    value: 'SwiftUI（iOS / iPadOS / visionOS）, RealityKit, ARKit, WidgetKit, SwiftData, Flutter, React',
  },
  { label: 'AI', value: 'Core ML, Vision Framework, MediaPipe, YOLO, BERT, Whisper, RAG' },
  { label: '雲端', value: 'Firebase, Supabase, Google Cloud Run, Cloudflare Workers' },
];
