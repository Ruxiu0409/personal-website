// 網站內容都集中在這裡，改這個檔案就能更新首頁。
export const site = {
  name: 'Tsai Cheng-Yeh',
  handle: 'tsaicy',
  title: 'Tsai Cheng-Yeh — tsaicy.dev',
  description: 'Tsai Cheng-Yeh 的個人網站：作品、文章與聯絡方式。',
  location: 'Taichung, Taiwan',
  tagline: '開發者，喜歡做好用、好看的東西。',
  intro:
    '這裡是我的個人網站。我主要做 iOS 與 Web 開發，也參與社群活動。這段文字之後可以換成你自己的介紹。',
  links: [
    { label: 'GitHub', href: 'https://github.com/Ruxiu0409' },
    { label: 'Email', href: 'mailto:hello@tsaicy.dev' },
  ],
};

export const projects: {
  name: string;
  description: string;
  href?: string;
  tags: string[];
}[] = [
  {
    name: '專案一',
    description: '用一兩句話描述這個專案在解決什麼問題。',
    tags: ['Swift', 'SwiftUI'],
  },
  {
    name: '專案二',
    description: '用一兩句話描述這個專案在解決什麼問題。',
    tags: ['Astro', 'Cloudflare'],
  },
  {
    name: 'tsaicy.dev',
    description: '就是這個網站。Astro 建置，透過 GitHub Actions 部署到 Cloudflare Workers。',
    href: 'https://github.com/Ruxiu0409/personal-website',
    tags: ['Astro', 'Cloudflare Workers'],
  },
];
