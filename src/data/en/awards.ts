// "Competitions" page. Teammates' names are intentionally omitted; only my own role is listed.
import type { Section } from '../site';

export const awardSections: Section[] = [
  {
    id: 'awards',
    label: 'Awards',
    items: [
      {
        title: 'Runner-up, 22nd National Electronic Design Creativity Competition',
        subtitle: 'Mixed-reality attention training system for visuospatial neglect',
        date: '2026.03',
        description:
          'Built star cancellation, line bisection and butterfly-tracking tests plus an iPad caregiver app with SwiftUI and RealityKit. The project later grew into an NSTC Undergraduate Research Grant.',
        tags: ['visionOS', 'RealityKit'],
      },
      {
        title: 'Honorable Mention, 22nd National Electronic Design Creativity Competition',
        subtitle: 'Smart parcel receiving system for residential communities · Solution design & backend',
        date: '2026.03',
        description:
          'The challenge was set by a security company. Instead of building physical locker doors, I proposed cross-checking four factors: identity, barcode, weight and camera images. I built the backend with FastAPI and Supabase, deployed it on Google Cloud Run, and it alerts building management in real time when a weight anomaly occurs or someone lingers too long.',
        tags: ['FastAPI', 'Supabase', 'Cloud Run'],
      },
      {
        title: 'Third Prize, Mobile App Innovation Contest (MAIC)',
        subtitle: 'LumaStage · Product manager & lead developer',
        date: '2026.07',
        description:
          'Describe a mood in words and get a full stage lighting show. My first version generated the whole show in one pass with on-device Foundation Models and blew past the 4,096-token context window. I then locked the output format with @Generable and split generation into two stages; it now generates complete shows of 4–12 lights and 2–6 cues on device.',
        tags: ['Foundation Models', 'RealityKit', 'ARKit'],
      },
      {
        title:
          'Second Prize (Shanghai) and Outstanding Exhibition Award (Fuzhou), 10th Cross-Strait Youth Maker Competition',
        subtitle:
          'TCM Diagnosis Companion (三診隨行) — assisting the inspection, listening and inquiry diagnoses of Traditional Chinese Medicine (TCM)',
        date: '2025.07',
        description:
          'Inspection uses YOLO trained on 16,551 tongue images; listening analyzes tone of voice; inquiry uses an LLM with RAG to generate a wellness plan. MediaPipe then marks acupoints on the hand using the proportional body-inch (tongshencun) method.',
        tags: ['YOLO', 'MediaPipe', 'RAG'],
      },
      {
        title: 'IEEE Tainan Section Special Award, 21st National Electronic Design Creativity Competition',
        subtitle: 'Hand Maestro — gamified hand training · Team lead',
        date: '2025.03',
        description:
          'A hand-training app for patients with mild hemiparesis. No wearables: the tablet camera tracks 21 joints on each hand, and the index finger acts as a cursor to clear levels in time with music, while the app quantifies hand tremor and bimanual coordination. It was my first time implementing Core ML, and the work later became an IEEE BECITHCON 2026 paper.',
        tags: ['MediaPipe', 'Core ML', 'SwiftUI'],
      },
      {
        title: 'Bronze Award (University Division), Nantou Mountain City Digital Hackathon',
        subtitle: 'Travel Copywriter (旅文寫手) — travel copy for lesser-known spots · Model & RAG',
        date: '2024.10',
        description:
          'Built a knowledge base of Nantou attractions from on-site visits and government open data, then used the MediaTek DaVinci model with RAG to write travel copy for lesser-known spots, spreading visitors from popular sites to other townships.',
        tags: ['RAG', 'LLM'],
      },
      {
        title: 'Third Prize, Mobile App Innovation Contest (MAIC)',
        subtitle: 'PetScan — dog skin check app · Team lead',
        date: '2024.07',
        description:
          'With only 36 photos, I trained a Create ML model using data augmentation and leave-one-out validation. It classifies skin as healthy, eczema or atopic dermatitis directly on the phone, with no photo uploads. I also hand-coded the design mockups in SwiftUI.',
        tags: ['Create ML', 'Core ML', 'SwiftUI'],
      },
      {
        title: 'Third Prize (Shanghai), 9th Cross-Strait Youth Maker Competition',
        subtitle: 'Fitness Butler (健身管家) — health management app combining diet and exercise',
        date: '2024',
        description:
          'Developed the app: integrated HealthKit with SwiftUI and used an LLM to generate dietary advice and recipes.',
        tags: ['SwiftUI', 'HealthKit'],
      },
      {
        title: 'First Place, 20th National Electronic Design Creativity Competition',
        subtitle: 'Chair Fitness (椅上健康) — a seated exercise app for wheelchair users',
        date: '2024.03',
        description:
          "The iPad front camera tracks both wrists and turns upper-limb movements into game levels. I handled the literature review and training design, capping each session at 10 minutes based on rotator cuff tear risk.",
        tags: ['Vision', 'Core ML', 'SwiftUI'],
      },
    ],
  },
];
