// 「個人經歷」頁：研究、論文、作品、工作、社團、證照。
import type { Section } from './site';

export const experienceSections: Section[] = [
  {
    id: 'research',
    label: '研究',
    items: [
      {
        title: '整合視動刺激與適應性難度調整機制之混合實境視覺復健系統設計與評估',
        subtitle: '國科會大專學生研究計畫・計畫執行學生・畢業專題（指導教授 林佩蓉）',
        date: '2026.07 – 2027.02',
        description:
          '在 Apple Vision Pro 上做中風後視覺空間忽略的評估與訓練系統，招募 14 位受試者完成實地測試。',
        body: [
          '視覺空間忽略是中風後常見的症狀，病人會注意不到某一側的東西。臨床上只做一份紙筆測驗，至少會漏掉 42.5% 的病人（Bosma et al., 2023），我想讓病人在家也能自己評估與訓練。',
          '系統整合三項醫院常用的測驗和兩項自訂任務，先找出病人從哪個角度開始注意不到，誤差在 1 度以內，再讓訓練目標沿著這條忽略邊界出現。病人每次看向邊界，就是一次復健。',
          '忽略是注意力不往那一側去，不是眼睛看不到，所以測驗時讓病人自由轉動眼睛。左右各區的目標數固定，難度只在各區內部調整，左右兩側才能公平比較。每個判斷標準都回查原始文獻，查不到出處的明確標註為自訂。',
        ],
        tags: ['visionOS', 'SwiftUI', 'RealityKit'],
      },
    ],
  },
  {
    id: 'publications',
    label: '論文',
    items: [
      {
        title:
          'A Vision-Based System for Gamified Hand Rehabilitation and Quantitative Motion Assessment in Individuals with Mild Hemiparesis',
        subtitle: '2026 IEEE BECITHCON・第三作者',
        date: '2026',
        description: '由全國電子設計創意競賽作品 Hand Maestro 改寫。',
      },
      {
        title: '基於影像辨識與超音波感測之智慧環境管理即時回饋系統',
        subtitle: '第 20 屆創新、管理與知識社群國際研討會（iCIMKC）・第二作者',
        date: '2026',
      },
    ],
  },
  {
    id: 'projects',
    label: '作品',
    items: [
      {
        title: '半逢遇甲',
        subtitle: 'Founder',
        date: '2024.10 – 現在',
        description: '逢甲校園資訊整合 App，首次下載超過 12,000 次，App Store 評分 4.9。',
        body: [
          '學校官方 App 的課表要上下左右滑動才找得到課，我想讓學生一眼看到整週。上架第一天登上 App Store 工具程式免費榜第 2 名；上線一週後 277 位使用者的系統易用性量表（SUS）平均 82.9 分，淨推薦值（NPS）+56。',
          '功能包含課表與桌面、鎖定畫面小工具，MyFCU、iLearn 單一登入，iLearn 作業提醒，停車位與公車查詢，特約商店與校園美食地圖。帳號密碼只放在 Keychain，課表透過 App Group 分享給小工具，共用的 Swift Package 讓 App、小工具與 Android 版跑同一套課表邏輯，目前正以 Skip 移植 Android 版。',
        ],
        href: 'https://apps.apple.com/tw/app/id6736971566',
        tags: ['SwiftUI', 'WidgetKit', 'Firebase', 'MVVM'],
      },
      {
        title: '行動逢甲',
        subtitle: 'Developer',
        date: '2024.12 – 2025.06',
        description: '逢甲大學官方校園 App，以 Flutter 開發，負責四項功能。',
        body: [
          '做了課表 Widget，讓同學在主畫面就能看到課表；校園地圖以 Google Maps Platform 的 3D Maps 呈現立體校園建築並規劃步行路線；把各課程在 iLearn 上的作業整理成一份清單；並改版校園行事曆。',
        ],
        tags: ['Flutter'],
      },
      {
        title: 'LumaStage',
        subtitle: '產品經理、主要開發',
        date: '2026',
        description: '用文字描述氛圍，以 LLM 生成整場舞台燈光設定，並在 iPad 上預覽實景燈光。',
        tags: ['SwiftUI', 'Foundation Models', 'RealityKit'],
      },
    ],
  },
  {
    id: 'work',
    label: '工作經歷',
    items: [
      {
        title: '逢甲大學 Apple Regional Training Center',
        subtitle: 'Student Support',
        date: '2024.08 – 2026.06',
        description: '以 Jamf School、Apple Remote Desktop、Apple School Manager 管理中心的 iMac、Mac mini 與 iPad。',
      },
    ],
  },
  {
    id: 'teaching',
    label: '教學經歷',
    items: [
      {
        title: '復興實驗中學',
        subtitle: '中學雙語部 ACE Club（AI Creator & Executor Club）社團老師',
        date: '2026.09 – 現在',
      },
      {
        title: '逢甲大學 課程助教',
        subtitle: '程式設計 I / II、計算機概論、行動應用程式開發、iOS App',
        date: '2024 – 2026',
      },
      {
        title: '程式營隊',
        subtitle: '工作人員・課程助教',
        date: '2024 – 2026',
        description: '葳格國際學校、永安國小資優班程式營隊，三年累計服務 29 小時。',
      },
    ],
  },
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
    id: 'certifications',
    label: '證照',
    items: [
      { title: 'iPAS AI 應用規劃師 初級', subtitle: '經濟部產業發展署', date: '2025.12' },
      { title: 'TQC Linux 系統管理 專業級', subtitle: '中華民國電腦技能基金會', date: '2025.05' },
      { title: 'App Development with Swift Certified User', subtitle: 'Apple', date: '2024.11' },
      {
        title: 'Google Cloud 技能徽章（三枚）',
        subtitle: 'Prompt Design in Vertex AI、Develop GenAI Apps with Gemini and Streamlit、Inspect Rich Documents with Gemini Multimodality and Multimodal RAG',
        date: '2024.10 – 11',
      },
      { title: 'App Development with Swift Associate', subtitle: 'Apple', date: '2024.08' },
      { title: 'Apple Teacher Swift Playgrounds', subtitle: 'Apple', date: '2023.10' },
    ],
  },
];
