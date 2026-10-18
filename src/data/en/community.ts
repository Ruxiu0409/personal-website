// "Community & Events" page.
import type { Section } from '../site';

export const communitySections: Section[] = [
  {
    id: 'clubs',
    label: 'Student Organizations',
    items: [
      {
        title: 'Feng Chia University (FCU) iOS Club',
        subtitle: 'Head of Teaching (8th term) · President (9th term) · Advisor (10th term)',
        date: '2024.08 – Present',
        description:
          'Grew membership from 47 to 175 during my term, with more than half from outside computing majors.',
        body: [
          "When I took over as president, the club had only 47 members. I had the marketing team proactively reply to Threads posts mentioning FCU, student clubs or iOS, partnered with four departments (Information Engineering, AI, Finance, and Applied Mathematics) to promote the club in their classes, and added a hands-on class session to the freshman welcome tea, reaching 219 students in total. Within one semester membership grew to 175, and over the year members earned 117 Apple Regional Training Center course certificates.",
          'After membership tripled, I set up weekly department meetings and regular officer meetings, and pushed for a club wiki documenting responsibilities, event workflows and past mistakes. In my second year I founded a design track, and in my third year replaced it with a maker track. I turned the end-of-semester showcase into a mock competition with 72 members taking part, and 32 of them went on to enter external competitions over winter break.',
        ],
      },
      {
        title: 'Google Developer Groups on Campus FCU',
        subtitle: 'Associate Lead (Vice President) · Advisor',
        date: '2025.08 – Present',
        description:
          'Co-hosted talks and workshops with the iOS Club, inviting developers from World, Zeabur and Forest to speak.',
      },
    ],
  },
  {
    id: 'roles',
    label: 'Organizer & Speaker',
    items: [
      {
        title: 'Raycast Community Taiwan',
        subtitle: 'Taiwan Ambassador',
        date: '2026.06 – Present',
      },
      {
        title: 'Swift Students Cafe: Get Inspired From Winners',
        subtitle: 'Organizer · Host · Speaker — at iPlayground 2026, Taipei',
        date: '2026.07.25',
        description:
          'The first Swift Students Cafe held in Taiwan. I led it end to end, from planning to the day itself.',
        body: [
          'The event invited members of the Swift Students Community and Swift Student Challenge winners to share how they went from idea and design to a finished project in Swift. During planning I wrote the run of show, invited speakers, recruited staff, worked out the venue with the iPlayground organizers, and discussed the program with community organizers from Japan and Singapore.',
          'On the day I hosted the event and also gave a talk on what I saw in person at WWDC26. It was held in the lunch area with open admission, and far more people showed up than had registered.',
        ],
      },
      {
        title: 'iPlayground',
        subtitle: '2026 Student Community Lead · 2024, 2025 attendee',
        date: '2024 – 2026',
        description:
          "Taiwan's annual conference for Apple platform developers. The first time I attended, I could barely follow most of the talks; two years later I was its Student Community Lead.",
      },
      {
        title: 'World Taichung Developer Workshop',
        subtitle: 'Speaker — Feng Chia University',
        date: '2025.11.23',
        description:
          'Talk: "A God\'s-Eye View of User-Experience-Driven App Development." Framed around design thinking, I compared Ban Feng Yu Jia, an app I built, with FCU Mobile to show how to design features starting from real usage scenarios.',
      },
    ],
  },
  {
    id: 'wwdc',
    label: 'WWDC26',
    items: [
      {
        title: 'WWDC26 Apple Worldwide Developers Conference',
        subtitle: 'Attended in person — Apple Park, Cupertino',
        date: '2026.06.07 – 09',
        description:
          'Won an in-person spot through the lottery as an Apple Developer Program member and attended the Keynote, sessions and Design Lab.',
        body: [
          "During those days at Apple Park I saw how Apple Intelligence is making its way into everyday life. But what I learned most had nothing to do with technology: every detail of an experience can be done well, and the confidence and joy of everyone there was contagious. I want to bring that spirit back to the community in Taiwan.",
        ],
      },
      {
        title: 'Bitrig Bash',
        subtitle: 'Santana Row, San Jose',
        date: '2026.06.11',
        description: 'A developer party hosted by the Bitrig team during WWDC week.',
      },
      {
        title: 'build fridays sf',
        subtitle: 'Cursor Office, San Francisco',
        date: '2026.06.19',
        description: 'Presented LumaStage on stage at a developer meetup at the Cursor office.',
      },
      {
        title: 'WWDC Week Developer Meetups',
        subtitle: 'Step-Into-Coffee, Swift Students Cafe, AiOS Meetup, Pre-WWDC Gathering, Feedback Friday',
        date: '2026.06',
        description:
          'Saw someone teleoperate a humanoid robot with Apple Vision Pro, and met student communities from Singapore and Japan, which later led to bringing Swift Students Cafe to Taiwan together.',
      },
    ],
  },
];
