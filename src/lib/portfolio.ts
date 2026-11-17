// Content for the portfolio pages (/portfolio and its sub-pages), taken from steven-chow.com in November 2026
// as placeholder. Edit it here and every design follows.

export const person = {
  first: 'Steven',
  last: 'Chow',
  role: 'Mechatronics Engineering Student',
  school: 'University of Waterloo',
  since: '2023',
  city: 'Waterloo, Canada',
  timeZone: 'America/Toronto', // drives the live clock in the Exposure hero
  coords: '43.47° N · 80.54° W',
  email: 'stevenchow0812@gmail.com',
  github: 'https://github.com/StevenTB1',
  linkedin: 'https://www.linkedin.com/in/stevenchow0812/',
  status: 'Open to opportunities',
  intro:
    'Building scalable web applications and engineering solutions. Currently studying Mechatronics Engineering at the University of Waterloo, combining hardware and software.',
  tagline: 'A blend of engineering precision and creative problem-solving.',
  contact: 'I’m always interested in challenging projects and new opportunities. Whether you have a question, want to collaborate, or just want to say hello, feel free to reach out.',
  about:
    'I’m a mechatronics engineer with a passion for building innovative solutions. I have experience with both mechanical design and software development, combining these disciplines to create meaningful projects.',
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`

// Stand-in photos, all free under the Unsplash License; photographers are credited in each page's footer.
export const photos = {
  hero: { src: unsplash('1587620962725-abab7fe55159'), alt: 'Laptop with code on screen on a dark desk', by: 'James Harrison', user: 'jstrippa' },
  about: { src: unsplash('1607705703571-c5a8695f18f6'), alt: 'Laptop displaying code beside a steaming mug', by: 'Mohammad Rahmani', user: 'afgprogrammer' },
  screens: { src: unsplash('1759661990336-51bd4b951fea'), alt: 'Screens showing code under strip lighting', by: 'Jakub Żerdzicki', user: 'jakubzerdzicki' },
  chip: { src: unsplash('1640955785023-1854685dae05'), alt: 'Tweezers placing a microchip onto a circuit board', by: 'Vishnu Mohanan', user: 'vishnumaiea' },
  printers: { src: unsplash('1611117775350-ac3950990985'), alt: 'A row of 3D printers at work on a wooden bench', by: 'Minku Kang', user: 'minkus' },
}

// From steven-chow.com itself: his portrait and the screenshots of both projects.
const assets = 'https://steven-portfolio-assets.s3.ca-central-1.amazonaws.com'
export const portrait = { src: `${assets}/IMG_3100.jpg`, alt: 'Steven Chow at a desk with a laptop, smiling' }
const shots = {
  dashboard: { src: `${assets}/savesquad.png`, alt: 'Screenshot of the e-commerce dashboard' },
  site: { src: 'https://www.steven-chow.com/images/portfolio.png', alt: 'Screenshot of the personal portfolio site' },
}

// One entry per photographer, for the credit line.
export const credits = Object.values(photos).filter((p, i, all) => all.findIndex((q) => q.user === p.user) === i)

export const experience = [
  {
    role: 'Software Engineering Intern',
    place: 'Quantified Health Inc.',
    short: 'Quantified Health',
    years: 'Dec 2024 — Now',
    summary: 'Telemedicine platforms at a health startup, supporting more than 600 patients a month.',
    points: [
      'Built telemedicine platforms in a startup setting with Next.js, GraphQL and Supabase, supporting more than 600 patients monthly.',
      'Refactored the code base into a hyperrepo architecture, enabling faster builds, streamlined CI/CD and multi-product deployments.',
      'Developed an in-house booking and scheduling platform with flexible time-slicing logic and secure Stripe payment workflows.',
      'Engineered a backend for medical records and scheduling with Firebase Auth, Supabase RLS and RBAC to keep data secure.',
      'Used Python for data analysis and business intelligence, tracking patient retention and web analytics to inform product decisions.',
      'Worked a startup-style on-call rotation, resolving live production issues alongside clinicians and engineers.',
    ],
    stack: ['Next.js', 'GraphQL', 'Supabase', 'Python', 'GCP'],
    photo: photos.screens,
  },
  {
    role: 'Firmware Developer',
    place: 'Midnight Sun Solar Car Racing Team',
    short: 'Midnight Sun',
    years: 'Sep 2023 — Aug 2025',
    summary: 'CAN tooling and FreeRTOS firmware for a solar race car.',
    points: [
      'Developed CAN Autogen to parse CAN messages efficiently using Python with YAML and Jinja.',
      'Optimized CAN communication protocols in C on STM32, improving data-exchange reliability and search speed.',
      'Re-engineered a finite state machine model for better task scheduling and management in FreeRTOS.',
      'Ran Mitsubishi motor testing with a hysteresis brake dynamometer and a Wavesculptor motor controller.',
    ],
    stack: ['C++', 'FreeRTOS', 'STM32', 'CAN'],
    photo: photos.chip,
  },
  {
    role: 'Program Instructor',
    place: 'The STEAM Project',
    short: 'The STEAM Project',
    years: 'May 2024 — Aug 2024',
    summary: 'Hands-on STEM teaching: more than 100 projects delivered and 50 lesson plans built.',
    points: [
      'Used SolidWorks, laser cutting and 3D printing to prototype models for educational STEM lesson plans.',
      'Delivered 100+ STEM projects, engaging students with practical, project-based learning.',
      'Developed and refined 50+ lesson plans, testing and validating them with DMMs for accuracy.',
    ],
    stack: ['SolidWorks', 'Laser cutting', '3D printing'],
    photo: photos.printers,
  },
]

export const projects = [
  {
    name: 'E-commerce Dashboard',
    what: 'An admin dashboard for managing e-commerce products, orders and customers.',
    stack: ['Next.js', 'MongoDB', 'Express'],
    href: 'https://github.com/stevenchow/dashboard',
    photo: shots.dashboard,
  },
  {
    name: 'Personal Portfolio',
    what: 'A responsive personal portfolio website built with Next.js and Tailwind CSS.',
    stack: ['Next.js', 'Tailwind CSS', 'React'],
    href: 'https://github.com/StevenTB1/personal-website/',
    photo: shots.site,
  },
]

// Experience and projects as one list, for designs that show them in a single index.
export const work = [
  ...experience.map((e) => ({ name: e.short, kind: e.role, when: e.years, what: e.summary, stack: e.stack, photo: e.photo, href: '' })),
  ...projects.map((p) => ({ name: p.name, kind: 'Project', when: '', what: p.what, stack: p.stack, photo: p.photo, href: p.href })),
]

export const education = [
  { years: '2023 — Now', what: 'Mechatronics Engineering, BASc', place: 'University of Waterloo' },
  { years: '2019 — 2023', what: 'Ontario Secondary School Diploma', place: 'Richmond Green Secondary School' },
]

export const skills = [
  { group: 'Full-stack', items: ['Next.js', 'GraphQL', 'Supabase', 'MongoDB'] },
  { group: 'Tools', items: ['C++', 'Git', 'Docker', 'Figma'] },
  { group: 'ML / AI', items: ['Python', 'PyTorch', 'TensorFlow', 'NumPy'] },
]
