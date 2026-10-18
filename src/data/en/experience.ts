// "Experience" page: research, publications, projects, work, teaching, clubs, certifications.
import type { Section } from '../site';

export const experienceSections: Section[] = [
  {
    id: 'research',
    label: 'Research',
    items: [
      {
        title:
          'Design and Evaluation of a Mixed Reality Visual Rehabilitation System Integrating Optokinetic Stimulation and Adaptive Difficulty Adjustment',
        subtitle:
          'NSTC Undergraduate Research Grant (National Science and Technology Council) · Principal Student Investigator · Capstone Project (Advisor: Prof. Pei-Jung Lin)',
        date: '2026.07 – 2027.02',
        description:
          'An assessment and training system for post-stroke visuospatial neglect on Apple Vision Pro, field-tested with 14 recruited participants.',
        body: [
          "Visuospatial neglect is a common symptom after stroke: patients fail to notice things on one side of space. A single paper-and-pencil test, which is what clinics typically use, misses at least 42.5% of patients (Bosma et al., 2023). I wanted patients to be able to assess and train themselves at home.",
          'The system combines three tests commonly used in hospitals with two custom tasks. It first locates the angle at which a patient stops noticing things, to within 1 degree, then places training targets along that neglect boundary. Every time the patient looks toward the boundary counts as a rep of rehabilitation.',
          "Neglect is a failure of attention to orient toward one side, not a failure of vision, so patients move their eyes freely during testing. The number of targets in each left and right region is fixed, and difficulty is adjusted only within each region, so the two sides can be compared fairly. Every scoring criterion is traced back to the original literature; anything without a source is explicitly labeled as custom.",
        ],
        tags: ['visionOS', 'SwiftUI', 'RealityKit'],
      },
    ],
  },
  {
    id: 'publications',
    label: 'Publications',
    items: [
      {
        title:
          'A Vision-Based System for Gamified Hand Rehabilitation and Quantitative Motion Assessment in Individuals with Mild Hemiparesis',
        subtitle: '2026 IEEE BECITHCON · third author',
        date: '2026',
        description:
          'Adapted from Hand Maestro, my entry in the National Electronic Design Creativity Competition.',
      },
      {
        title:
          'A Real-Time Feedback System for Smart Environment Management Based on Image Recognition and Ultrasonic Sensing',
        subtitle:
          '20th International Conference on Innovation, Management and Knowledge Community (iCIMKC) · second author',
        date: '2026',
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    items: [
      {
        title: 'Ban Feng Yu Jia (半逢遇甲)',
        subtitle: 'Founder',
        date: '2024.10 – Present',
        description:
          'An all-in-one campus app for Feng Chia University (FCU) with over 12,000 first-time downloads and a 4.9 rating on the App Store.',
        body: [
          "In the university's official app, you have to scroll up, down, left and right to find a class in your timetable. I wanted students to see their whole week at a glance. On launch day it reached #2 on the App Store's free Utilities chart; one week after launch, 277 users gave it an average System Usability Scale (SUS) score of 82.9 and a Net Promoter Score (NPS) of +56.",
          'Features include the timetable with Home Screen and Lock Screen widgets, single sign-on for MyFCU and iLearn, iLearn assignment reminders, parking and bus lookups, and a map of partner stores and campus food. Credentials are stored only in the Keychain, and the timetable is shared with widgets through an App Group. A shared Swift Package lets the app, the widgets and the Android version run the same timetable logic; I am currently porting the Android version with Skip.',
        ],
        href: 'https://apps.apple.com/tw/app/id6736971566',
        tags: ['SwiftUI', 'WidgetKit', 'Firebase', 'MVVM'],
      },
      {
        title: 'FCU Mobile',
        subtitle: 'Developer',
        date: '2024.12 – 2025.06',
        description:
          "Feng Chia University's official campus app, built with Flutter. I was responsible for four features.",
        body: [
          'I built a timetable widget so students can see their schedule right on the Home Screen; a campus map that renders campus buildings in 3D with Google Maps Platform 3D Maps and plans walking routes; a single list that collects assignments from every course on iLearn; and a redesigned academic calendar.',
        ],
        tags: ['Flutter'],
      },
      {
        title: 'LumaStage',
        subtitle: 'Product Manager, Lead Developer',
        date: '2026',
        description:
          'Describe a mood in words and an LLM generates the lighting setup for an entire stage, which you can preview in the real venue on iPad.',
        tags: ['SwiftUI', 'Foundation Models', 'RealityKit'],
      },
    ],
  },
  {
    id: 'work',
    label: 'Work Experience',
    items: [
      {
        title: 'Feng Chia University (FCU) Apple Regional Training Center',
        subtitle: 'Student Support',
        date: '2024.08 – 2026.06',
        description:
          "Managed the center's iMacs, Mac minis and iPads with Jamf School, Apple Remote Desktop and Apple School Manager.",
      },
    ],
  },
  {
    id: 'teaching',
    label: 'Teaching Experience',
    items: [
      {
        title: 'Fuhsing Experimental High School',
        subtitle: 'Club Instructor, ACE Club (AI Creator & Executor Club), Bilingual Secondary Division',
        date: '2026.09 – Present',
      },
      {
        title: 'Feng Chia University (FCU) Teaching Assistant',
        subtitle:
          'Programming I / II, Introduction to Computer Science, Mobile App Development, iOS App',
        date: '2024 – 2026',
      },
      {
        title: 'Coding Camps',
        subtitle: 'Staff · Teaching Assistant',
        date: '2024 – 2026',
        description:
          "Coding camps for Wagor International School and the Yong'an Elementary School gifted class, totaling 29 hours of service over three years.",
      },
    ],
  },
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
    id: 'certifications',
    label: 'Certifications',
    items: [
      {
        title: 'iPAS AI Application Planner (Associate)',
        subtitle: 'Industrial Development Administration, Ministry of Economic Affairs',
        date: '2025.12',
      },
      {
        title: 'TQC Linux System Administration (Professional)',
        subtitle: 'Computer Skills Foundation (CSF)',
        date: '2025.05',
      },
      { title: 'App Development with Swift Certified User', subtitle: 'Apple', date: '2024.11' },
      {
        title: 'Google Cloud Skill Badges (3)',
        subtitle:
          'Prompt Design in Vertex AI, Develop GenAI Apps with Gemini and Streamlit, Inspect Rich Documents with Gemini Multimodality and Multimodal RAG',
        date: '2024.10 – 11',
      },
      { title: 'App Development with Swift Associate', subtitle: 'Apple', date: '2024.08' },
      { title: 'Apple Teacher Swift Playgrounds', subtitle: 'Apple', date: '2023.10' },
    ],
  },
];
