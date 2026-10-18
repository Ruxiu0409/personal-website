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
