// "Portfolio" page. Teammates' names are intentionally omitted; only my own role is listed.
// slug, date, tags, links and image must stay identical to ../portfolio.ts.
import type { Project } from '../site';
import banFengImg from '../../assets/portfolio/ban-feng-yu-jia.png';
import lumaStageImg from '../../assets/portfolio/lumastage.png';
import neglectImg from '../../assets/portfolio/mr-neglect-training.png';
import fcuMobileImg from '../../assets/portfolio/fcu-mobile.png';
import parcelImg from '../../assets/portfolio/smart-parcel.png';
import tcmImg from '../../assets/portfolio/tcm-diagnosis-companion.png';
import handMaestroImg from '../../assets/portfolio/hand-maestro.png';
import petScanImg from '../../assets/portfolio/petscan.png';
import chairImg from '../../assets/portfolio/chair-fitness.png';

export const portfolio: Project[] = [
  {
    slug: 'ban-feng-yu-jia',
    title: 'Ban Feng Yu Jia (半逢遇甲)',
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
    slug: 'lumastage',
    title: 'LumaStage',
    role: 'Product Manager, Lead Developer',
    date: '2026.07',
    summary:
      'Describe a mood in words and an LLM generates the lighting setup for an entire stage, which you can preview in the real venue on iPad.',
    body: [
      'My first version generated the whole show in one pass with on-device Foundation Models and blew past the 4,096-token context window. I then locked the output format with @Generable and split generation into two stages: first the lighting rig, then one session per cue. It now generates complete shows of 4–12 lights and 2–6 cues on device; we later switched to a cloud LLM.',
    ],
    award: 'Third Prize, Mobile App Innovation Contest (MAIC)',
    image: lumaStageImg,
    imageAlt: 'LumaStage previewing a virtual stage, truss and lighting fixtures in a real campus setting',
    tags: ['SwiftUI', 'Foundation Models', 'RealityKit', 'ARKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/Ruxiu0409/LumaStage' }],
  },
  {
    slug: 'mr-neglect-training',
    title: 'Mixed-Reality Attention Training System for Visuospatial Neglect',
    role: 'Principal Student Investigator · Tests & caregiver app',
    date: '2026',
    summary:
      'An assessment and training system for post-stroke visuospatial neglect on Apple Vision Pro, which later grew into an NSTC Undergraduate Research Grant.',
    body: [
      'Built star cancellation, line bisection and butterfly-tracking tests plus an iPad caregiver app with SwiftUI and RealityKit. A single paper-and-pencil test, which is what clinics typically use, misses at least 42.5% of patients (Bosma et al., 2023); I wanted patients to be able to assess and train themselves at home.',
      'As an NSTC project, the system first locates the angle at which a patient stops noticing things, to within 1 degree, then places training targets along that neglect boundary. It was field-tested with 14 recruited participants.',
    ],
    award: 'Runner-up, 22nd National Electronic Design Creativity Competition',
    image: neglectImg,
    imageAlt: 'Star cancellation test in Apple Vision Pro, with white shapes floating in front of a real room wall',
    tags: ['visionOS', 'SwiftUI', 'RealityKit'],
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
    imageAlt: 'FCU Mobile 3D campus map showing a walking route with estimated time and remaining distance',
    tags: ['Flutter', 'Google Maps Platform'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/tw/app/id6633420933' }],
  },
  {
    slug: 'smart-parcel',
    title: 'Smart Parcel Receiving System for Residential Communities',
    role: 'Solution design & backend',
    date: '2026.03',
    summary:
      'A parcel receiving system for apartment buildings that cross-checks identity, barcode, weight and camera images to match parcels with recipients, replacing manual logging.',
    body: [
      'The challenge was set by a security company. Instead of building physical locker doors, I proposed cross-checking four factors. I built the backend with FastAPI and Supabase, deployed it on Google Cloud Run, and it alerts building management in real time when a weight anomaly occurs or someone lingers too long.',
    ],
    award: 'Honorable Mention, 22nd National Electronic Design Creativity Competition',
    image: parcelImg,
    imageAlt: 'Building management iPad screen for shelving a parcel: enter recipient details, then scan the barcode and place it on the weighing shelf',
    tags: ['FastAPI', 'Supabase', 'Cloud Run'],
  },
  {
    slug: 'tcm-diagnosis-companion',
    title: 'TCM Diagnosis Companion (三診隨行)',
    role: 'Team member',
    date: '2025.07',
    summary:
      'An app assisting the inspection, listening and inquiry diagnoses of Traditional Chinese Medicine (TCM): it analyzes the tongue, tone of voice and complaints, generates a wellness plan, and marks acupoints on the hand.',
    body: [
      'Inspection uses YOLO trained on 16,551 tongue images; listening analyzes tone of voice; inquiry uses an LLM with RAG to generate a wellness plan. MediaPipe then marks acupoints on the hand using the proportional body-inch (tongshencun) method.',
    ],
    award:
      'Second Prize (Shanghai) and Outstanding Exhibition Award (Fuzhou), 10th Cross-Strait Youth Maker Competition',
    image: tcmImg,
    imageAlt: 'TCM Diagnosis Companion results screen summarizing tongue, voice and complaint findings with AI wellness advice',
    tags: ['YOLO', 'MediaPipe', 'RAG'],
  },
  {
    slug: 'hand-maestro',
    title: 'Hand Maestro',
    role: 'Team lead',
    date: '2025.03',
    summary:
      'A gamified hand-training app for patients with mild hemiparesis. No wearables: the tablet camera tracks both hands as you train along to music.',
    body: [
      'The tablet camera tracks 21 joints on each hand, and the index finger acts as a cursor to clear levels in time with music, while the app quantifies hand tremor and bimanual coordination. It was my first time implementing Core ML, and the work later became an IEEE BECITHCON 2026 paper.',
    ],
    award: 'IEEE Tainan Section Special Award, 21st National Electronic Design Creativity Competition',
    image: handMaestroImg,
    imageAlt: 'Hand Maestro iPad home screen with single-hand conducting and two-hand ensemble modes',
    tags: ['MediaPipe', 'Core ML', 'SwiftUI'],
  },
  {
    slug: 'petscan',
    title: 'PetScan',
    role: 'Team lead',
    date: '2024.07',
    summary:
      'A dog skin check app that classifies skin as healthy, eczema or atopic dermatitis directly on the phone, with no photo uploads.',
    body: [
      'With only 36 photos, I trained a Create ML model using data augmentation and leave-one-out validation, running on device with Core ML. I also hand-coded the design mockups in SwiftUI.',
    ],
    award: 'Third Prize, Mobile App Innovation Contest (MAIC)',
    image: petScanImg,
    imageAlt: 'PetScan app icon and name',
    tags: ['Create ML', 'Core ML', 'SwiftUI'],
    links: [{ label: 'GitHub', href: 'https://github.com/Ruxiu0409/PetScan-Maic' }],
  },
  {
    slug: 'chair-fitness',
    title: 'Chair Fitness (椅上健康)',
    role: 'Literature review & training design',
    date: '2024.03',
    summary:
      'A seated exercise app for wheelchair users: the iPad front camera tracks both wrists and turns upper-limb movements into game levels.',
    body: [
      'I handled the literature review and training design, capping each session at 10 minutes based on rotator cuff tear risk.',
    ],
    award: 'First Place, 20th National Electronic Design Creativity Competition',
    image: chairImg,
    imageAlt: 'Chair Fitness iPad home screen listing upper-limb exercise game levels',
    tags: ['Vision', 'Core ML', 'SwiftUI'],
  },
];
