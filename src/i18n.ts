// 雙語設定：中文在根目錄（/about/），英文在 /en/ 底下（/en/about/）。
// 介面文字放在 ui，內容資料放在 src/data（中文）與 src/data/en（英文）。
import * as zhSite from './data/site';
import * as zhAbout from './data/about';
import * as zhExperience from './data/experience';
import * as zhAwards from './data/awards';
import * as zhCommunity from './data/community';
import * as enSite from './data/en/site';
import * as enAbout from './data/en/about';
import * as enExperience from './data/en/experience';
import * as enAwards from './data/en/awards';
import * as enCommunity from './data/en/community';

export type Locale = 'zh' | 'en';

export const locales: Record<Locale, { htmlLang: string; prefix: string; label: string }> = {
  zh: { htmlLang: 'zh-Hant', prefix: '', label: '中文' },
  en: { htmlLang: 'en', prefix: '/en', label: 'English' },
};

export const pages = ['/', '/about/', '/experience/', '/awards/', '/community/'] as const;

export const ui = {
  zh: {
    nav: ['首頁', '關於我', '個人經歷', '競賽', '社群與活動'],
    mainNav: '主選單',
    socialNav: '社群連結',
    toc: '本頁章節',
    seeAll: '看全部 →',
    moreAbout: '更多關於我',
    rights: 'All rights reserved.',
    about: {
      title: '關於我',
      education: '教育背景',
      community: '社群經歷',
      communityMore: '看全部社群與活動 →',
      links: '社群連結',
      story: '學習歷程',
      traits: '個人特質',
      skills: '技能專長',
      languages: '程式語言',
    },
    experience: { title: '個人經歷', lead: '研究、論文、作品、工作、教學、社團與證照。' },
    awards: {
      title: '競賽',
      lead: '對我來說，比賽不是目的，而是逼自己學新東西最快的方式。每一場比賽，我都讓自己學一樣新東西。',
      others: '其他參賽經歷',
    },
    community: {
      title: '社群與活動',
      lead: '從 iPlayground 2024 聽不太懂議程的聽眾，到主辦 Swift Students Cafe 第一次在台灣的場次。',
    },
    notFound: { title: '找不到這個頁面', back: '回到首頁' },
  },
  en: {
    nav: ['Home', 'About', 'Experience', 'Awards', 'Community'],
    mainNav: 'Main navigation',
    socialNav: 'Social links',
    toc: 'On this page',
    seeAll: 'See all →',
    moreAbout: 'More about me',
    rights: 'All rights reserved.',
    about: {
      title: 'About',
      education: 'Education',
      community: 'Community',
      communityMore: 'See all community & events →',
      links: 'Links',
      story: 'My Story',
      traits: 'What Drives Me',
      skills: 'Skills',
      languages: 'Programming Languages',
    },
    experience: {
      title: 'Experience',
      lead: 'Research, publications, projects, work, teaching, student organizations, and certifications.',
    },
    awards: {
      title: 'Awards',
      lead: "For me, competitions aren't the goal. They're the fastest way to push myself to learn something new, and I make sure every one teaches me something.",
      others: 'Other Competitions',
    },
    community: {
      title: 'Community & Events',
      lead: 'From sitting in the audience at iPlayground 2024, barely following the talks, to organizing the first Swift Students Cafe in Taiwan.',
    },
    notFound: { title: 'Page not found', back: 'Back to home' },
  },
} satisfies Record<Locale, unknown>;

const content = {
  zh: { ...zhSite, ...zhAbout, ...zhExperience, ...zhAwards, ...zhCommunity },
  en: { ...enSite, ...enAbout, ...enExperience, ...enAwards, ...enCommunity },
};

/** 由網址判斷語言：/en/ 開頭是英文，其餘是中文。 */
export function getLocale(url: URL): Locale {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'zh';
}

/** 去掉語言前綴後的路徑，例如 /en/about/ → /about/。 */
export function basePath(url: URL): string {
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/** 把站內路徑加上語言前綴，例如 ('en', '/about/') → /en/about/。 */
export function localize(locale: Locale, path: string): string {
  return `${locales[locale].prefix}${path}`;
}

export function useI18n(url: URL) {
  const locale = getLocale(url);
  return { locale, t: ui[locale], data: content[locale], href: (path: string) => localize(locale, path) };
}
