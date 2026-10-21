// "Portfolio" page. Teammates' names are intentionally omitted; only my own role is listed.
// slug, date, tags, links and image must stay identical to ../portfolio.ts.
import type { Project } from '../site';
import banFengImg from '../../assets/portfolio/ban-feng-yu-jia.png';
import fcuMobileImg from '../../assets/portfolio/fcu-mobile.png';

export const portfolio: Project[] = [
  {
    slug: 'ban-feng-yu-jia',
    title: 'Ban Feng Yu Jia',
    role: 'Founder',
    date: '2024.10',
    summary:
      'An all-in-one campus app for Feng Chia University (FCU) with over 12,000 first-time downloads and a 4.9 rating on the App Store.',
    body: [
      "In the university's official app, you have to scroll up, down, left and right to find a class in your timetable. I wanted students to see their whole week at a glance. On launch day it reached #2 on the App Store's free Utilities chart; one week after launch, 277 users gave it an average System Usability Scale (SUS) score of 82.9 and a Net Promoter Score (NPS) of +56.",
      'Features include the timetable with Home Screen and Lock Screen widgets, single sign-on for MyFCU and iLearn, iLearn assignment reminders, parking and bus lookups, and a map of partner stores and campus food. Credentials are stored only in the Keychain, and the timetable is shared with widgets through an App Group. A shared Swift Package lets the app, the widgets and the Android version run the same timetable logic; I am currently porting the Android version with Skip.',
    ],
    image: banFengImg,
    imageAlt: 'Ban Feng Yu Jia weekly timetable showing Monday to Friday classes and classrooms on one screen',
    tags: ['SwiftUI', 'WidgetKit', 'Firebase', 'MVVM'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6736971566' }],
  },
  {
    slug: 'fcu-mobile',
    title: 'FCU Mobile',
    role: 'Developer',
    date: '2024.12 – 2025.06',
    summary:
      "Feng Chia University's official campus app, built with Flutter. I was responsible for four features.",
    body: [
      'I built a timetable widget so students can see their schedule right on the Home Screen; a campus map that renders campus buildings in 3D with Google Maps Platform 3D Maps and plans walking routes; a single list that collects assignments from every course on iLearn; and a redesigned academic calendar.',
    ],
    image: fcuMobileImg,
    imageAlt: 'FCU Mobile home screen listing campus services such as notifications, course info, iLearn and MyFCU',
    tags: ['Flutter', 'Google Maps Platform'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6633420933' }],
  },
];
