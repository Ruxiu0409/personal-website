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
