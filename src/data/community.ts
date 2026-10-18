// 「社群與活動」頁。
import type { Section } from './site';

export const communitySections: Section[] = [
  {
    id: 'clubs',
    label: '社團',
    items: [
      {
        title: '逢甲大學 iOS Club',
        subtitle: '第 8 屆教學長・第 9 屆社長・第 10 屆顧問',
        date: '2024.08 – 現在',
        description: '任內社員從 47 人成長到 175 人，非資訊系超過一半。',
        body: [
          '接手社長時社團只有 47 人。我讓行銷部在 Threads 主動回覆提到逢甲、社團、iOS 的貼文，並與資訊、AI、財金、應數四系合作入班宣傳，新生茶會加入社課體驗，共 219 位同學參與。一學期社員成長到 175 人，全年 117 人次取得 Apple Regional Training Center 修課證明。',
          '人數暴增三倍後，我建立部門週會與幹部例會，推動社團 Wiki，把權責、活動流程和曾經犯過的錯寫成文件。大二創立設計線、大三改開創客線，學期末把成果發表升級成模擬競賽，72 位社員參與，寒假有 32 位繼續投入校外競賽。',
        ],
      },
      {
        title: 'Google Developer Groups on Campus FCU',
        subtitle: 'Associate Lead（副社長）・顧問',
        date: '2025.08 – 現在',
        description: '與 iOS Club 合辦講座與工作坊，邀請 World、Zeabur 與專注森林的開發者分享。',
      },
    ],
  },
  {
    id: 'roles',
    label: '主辦與講者',
    items: [
      {
        title: 'Raycast Community Taiwan',
        subtitle: '台灣大使',
        date: '2026.06 – 現在',
      },
      {
        title: 'Swift Students Cafe: Get Inspired From Winners',
        subtitle: '主辦人・主持人・講者｜iPlayground 2026 場內，台北',
        date: '2026.07.25',
        description: 'Swift Students Cafe 第一次在台灣舉辦，從籌備到當天都由我統籌。',
        body: [
          '活動邀請 Swift Students Community 的成員與 Swift Student Challenge 得獎者，分享從發想、設計到用 Swift 完成作品的過程。籌備期間我撰寫活動流程、邀請講者、招募工作人員，與 iPlayground 主辦方規劃場地，也和日本、新加坡的社群主辦人討論活動內容。',
          '當天我擔任主持人，也上台分享 WWDC26 的現場觀察。活動安排在午餐區、開放自由入場，現場參與人數遠多於報名人數。',
        ],
      },
      {
        title: 'iPlayground',
        subtitle: '2026 學生社群負責人・2024、2025 參加者',
        date: '2024 – 2026',
        description:
          '台灣 Apple 平台開發者年會。第一次參加時多數議程還聽不太懂，兩年後成為學生社群負責人。',
      },
      {
        title: 'World Taichung Developer Workshop',
        subtitle: '講者｜逢甲大學',
        date: '2025.11.23',
        description:
          '講題《上帝視角來看使用者經驗出發的應用程式開發》，以設計思考為架構，用自己開發的半逢遇甲對照行動逢甲，說明如何從使用情境出發設計功能。',
      },
    ],
  },
  {
    id: 'wwdc',
    label: 'WWDC26',
    items: [
      {
        title: 'WWDC26 Apple 全球開發者大會',
        subtitle: '實體參加｜Apple Park，Cupertino',
        date: '2026.06.07 – 09',
        description: '以 Apple Developer Program 會員身分抽中實體名額，參加 Keynote、議程與 Design Lab。',
        body: [
          '在 Apple Park 的那幾天，我看見 Apple Intelligence 如何走進日常生活。但我學到最多的其實跟技術無關，而是發現每個體驗的細節都可以做得很好，現場每個人散發的自信與快樂互相感染。我希望把這份理念帶回台灣的社群。',
        ],
      },
      {
        title: 'Bitrig Bash',
        subtitle: 'Santana Row，San Jose',
        date: '2026.06.11',
        description: 'Bitrig 團隊在 WWDC 週舉辦的開發者派對。',
      },
      {
        title: 'build fridays sf',
        subtitle: 'Cursor Office，San Francisco',
        date: '2026.06.19',
        description: '在 Cursor 辦公室的開發者聚會上台介紹 LumaStage。',
      },
      {
        title: 'WWDC 週開發者聚會',
        subtitle: 'Step-Into-Coffee、Swift Students Cafe、AiOS Meetup、Pre-WWDC Gathering、Feedback Friday',
        date: '2026.06',
        description:
          '看到有人用 Apple Vision Pro 遠端操控人形機器人，也認識了新加坡和日本的學生社群，後來一起把 Swift Students Cafe 帶到台灣。',
      },
    ],
  },
  {
    id: 'events',
    label: '參加的活動',
    items: [
      {
        title: 'COSCUP 2026 × UbuCon Asia',
        subtitle: '臺灣科技大學，台北',
        date: '2026.08',
        description:
          '學到 open-slide 的進階用法，後來在自己辦的活動裡用 Cloudflare Workers 建立資料服務，讓簡報即時呈現現場資料。',
      },
      {
        title: 'Codex Community Meetup 台中（三場）',
        date: '2026.06 – 07',
        description:
          '三場都帶著 LumaStage 到現場請大家試用，第一次收到設計、工程與非技術背景使用者的回饋。',
      },
      {
        title: 'Raycast Taiwan Meetup',
        subtitle: '台中',
        date: '2026.05.30',
        description: 'Raycast 2.0、擴充套件開發與工作流程。',
      },
      {
        title: 'DevFest 2025',
        subtitle: '台中場・台北場',
        date: '2025.11',
        description:
          '第一次接觸命令列版本的 AI 工具，回家後就在自己的專案改用 CLI；也聽到為什麼仍要讀懂自己的程式碼。',
      },
    ],
  },
];
