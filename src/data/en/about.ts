// English "About" page, adapted from the Chinese version in ../about.ts.
import type { Entry } from '../site';

export const education: Entry[] = [
  {
    title: 'Feng Chia University (FCU)',
    subtitle: 'B.S. in Information Engineering and Computer Science',
    date: '2023.09 – 2027.06 (expected)',
  },
  {
    title: 'Taichung Municipal Taichung Second Senior High School',
    date: '2020.09 – 2023.06',
  },
];

export const story: { title: string; paragraphs: string[] }[] = [
  {
    title: 'From Member to President',
    paragraphs: [
      "I joined iOS Club when I started university because I loved Apple. At first I didn't think I was ready to compete. Then, in the second semester of my freshman year, a senior invited me to join him in the National Electronic Design Creativity Competition, and that started everything that followed: the competitions, and eventually research.",
      'In my sophomore year I became Head of Teaching at iOS Club, and in my junior year I took over as President. The president of Google Developer Groups on Campus FCU noticed the classes I taught as Head of Teaching and invited me to be the next Vice President. That year I led both clubs at once, and together they ran 46 events and 24 club classes.',
    ],
  },
  {
    title: 'From Solo to Team',
    paragraphs: [
      'In the first semester of my sophomore year, I started building Ban Feng Yu Jia (半逢遇甲) on my own because my classmates wanted to see their whole week\'s schedule at a glance. Over time I added a food map, partner-store discounts, and iLearn assignment reminders. On launch day it reached #2 on the App Store\'s free Utilities chart. A week after launch, I surveyed 277 users with the System Usability Scale (SUS); the average score was 82.9, well above the common benchmark of 68.',
      'As the app grew, writing it alone was no longer enough, so I started bringing in collaborators. To make the code easy for others to understand and pick up, I adopted an MVVM architecture that separates views, data, and business logic, so every feature has a clear place and a consistent pattern.',
    ],
  },
  {
    title: 'Learning Through Competitions',
    paragraphs: [
      "For me, competitions aren't the goal; they're the fastest way to force myself to learn something new. In my first National Electronic Design Creativity Competition, in the second semester of my freshman year, my seniors had me read a lot of literature first. I organized the literature and designed the training mechanism, and our project won first place. That taught me that good work starts with truly understanding the problem.",
      'Since then, I have used every competition to learn one new thing. PetScan was my first time as team lead. Hand Maestro was my first time implementing Core ML, and I later rewrote it as an English paper for IEEE BECITHCON 2026. In the second semester of my junior year, our mixed-reality attention training system for visuospatial neglect won second place and grew into an NSTC Undergraduate Research Grant project. Competitions carried me from writing code to doing research.',
    ],
  },
  {
    title: 'At Apple Park',
    paragraphs: [
      "In June 2026, I won an in-person spot at WWDC26 and went to Apple Park to watch the Keynote and attend sessions. At the Design Lab, an Apple designer suggested I bring the entire LumaStage experience into Vision Pro. At Bitrig Bash, the lead for Apple Foundation Models advised me to get the existing features right first. Back in Taiwan, I read the Foundation Models documentation from start to finish and rewrote LumaStage's generation pipeline. I also learned that instead of constantly adding features, it's better to make the core experience as good as it can be.",
      "What I learned most had nothing to do with technology. Apple got every detail of the event right, and everyone's confidence and joy were contagious. It made me feel like I belonged there.",
    ],
  },
  {
    title: 'From Audience to Organizer',
    paragraphs: [
      "My first tech community event was iPlayground 2024, and back then I couldn't follow most of the talks. After that I started regularly attending developer events like DevFest and COSCUP, and I brought my projects to Codex community meetups in Taichung to get people from different fields to try them and give me feedback.",
      'Gradually, I went from sitting in the audience to running events. In 2025 I spoke at World Taichung Developer Workshop. In 2026 I served as Student Community Lead for iPlayground and organized the first Swift Students Cafe ever held in Taiwan. I am also now a Raycast Taiwan Ambassador.',
    ],
  },
];

export const traits: { title: string; paragraph: string }[] = [
  {
    title: 'Just Start',
    paragraph:
      "Rather than perfecting a plan up front, I'd rather build a working version first and refine it as I go. A lot of things look huge at the start, but once I break them into small steps, I know what I can finish today. To me, getting things done isn't about being fast; it's about finishing things one step at a time.",
  },
  {
    title: 'Go to the Source',
    paragraph:
      "When I don't understand something, I go back to the original documentation and sources instead of just following someone else's summary. Understanding the underlying principles before I start often leads me to a better approach.",
  },
  {
    title: 'People First',
    paragraph:
      "Whether it's teammates or users, I think about people first. When leading a team, I make the direction clear and keep an eye on how everyone is doing. When writing code, I often imagine I'm using it for the first time and picture where I'd get stuck. Making a feature work is only the first step; it's only truly done when people want to use it and it feels effortless.",
  },
];

export const closing =
  "Apple often talks about using the power of code to change the world, and I've always loved that idea. To me, code isn't just homework or a competition entry; it's a tool that can genuinely help the people around me. Seeing something I built being used by others is what has kept me going this far, and what makes me want to keep going.";

export { languages } from '../about';

export const skills: { label: string; value: string }[] = [
  {
    label: 'Frameworks',
    value: 'SwiftUI (iOS / iPadOS / visionOS), RealityKit, ARKit, WidgetKit, SwiftData, Flutter, React',
  },
  { label: 'AI', value: 'Core ML, Vision Framework, MediaPipe, YOLO, BERT, Whisper, RAG' },
  { label: 'Cloud', value: 'Firebase, Supabase, Google Cloud Run, Cloudflare Workers' },
  { label: 'Device Management', value: 'Jamf School' },
];
