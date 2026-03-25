export type ExperienceItem = {
  title: string;
  org: string;
  date: string;
  bullets: string[];
  tag?: string;
};

export type TimelineRole = {
  lap: string;
  tone: 'red' | 'blue' | 'green' | 'white';
  title: string;
  org: string;
  date: string;
  bullets: string[];
  tag?: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Volunteer Mathematics Teacher',
    org: "St Mary's College, Avissawella",
    date: '2024 – Present',
    bullets: [
      'Conduct mathematics sessions for Grade 11 students, focusing on exam preparation and O/L syllabus.',
      'Developed structured lesson plans and provided one-on-one mentoring to struggling students.',
      'Improved students’ analytical and problem-solving abilities through tailored teaching methods.',
    ],
    tag: 'UNDERCUT STRATEGY',
  },
];

export const LEADERSHIP_TIMELINE: TimelineRole[] = [
  {
    lap: 'LAP 1',
    tone: 'red',
    title: 'Industry Relations Lead',
    org: 'IEEE Student Branch of IIT',
    date: 'Jan 2026 – Present (3 months)',
    bullets: [
      'Leads all industry outreach initiatives and partnerships connecting students with technology professionals and organisations.',
      'Coordinates technical workshops, networking sessions, and large-scale IEEE events hosted by the student branch.',
      'Manages communication with sponsors, guest speakers, and organising committees to ensure smooth event execution.',
    ],
    tag: 'CURRENT ROLE',
  },
  {
    lap: 'LAP 2',
    tone: 'blue',
    title: "Vice Chair Program — Let's Talk",
    org: 'IEEE Young Professionals Sri Lanka',
    date: 'Mar 2026 – Present (1 month)',
    bullets: [],
    tag: 'CURRENT ROLE',
  },
  {
    lap: 'LAP 3',
    tone: 'blue',
    title: "Industry Outreach Vice Chair — IX'25",
    org: 'IEEE Student Branch of IIT',
    date: 'Oct 2025 – Dec 2025 (3 months)',
    bullets: [
      'Assisted in organising industry engagement programmes and technology networking sessions for students.',
      'Supported industry partnerships and communication with technology companies and professionals.',
    ],
  },
  {
    lap: 'LAP 4',
    tone: 'blue',
    title: 'Industry Outreach Vice Chair — TechTrek 2.0',
    org: 'IEEE Robotics and Automation Society of IIT',
    date: 'Jun 2025 – Nov 2025 (6 months)',
    bullets: [],
  },
  {
    lap: 'LAP 5',
    tone: 'green',
    title: 'Logistics Standing Committee Member',
    org: 'IEEE Student Branch of IIT',
    date: 'Jan 2025 – Present (1 yr 3 months)',
    bullets: [],
  },
  {
    lap: 'LAP 6',
    tone: 'green',
    title: 'Batch Representative',
    org: 'Informatics Institute of Technology',
    date: '2024 – 2026',
    bullets: [
      'Represented the student batch in academic and administrative discussions.',
      'Facilitated communication between students and faculty; supported academic coordination.',
    ],
  },
];

export const VOLUNTEER_PIT_STOPS = [
  'CodeSprint X · Logistics · Mar–Jul 2025',
  "AfterMath'25 · Logistics · Jul–Aug 2025",
  'Hacksphere · Industry Outreach · Jul–Sep 2025',
  'MicroMaze 2.0 · Industry Outreach · Jun–Aug 2025',
  'Traction · Industry Outreach · Mar–Apr 2025',
  'Robot Nexus-2 · Industry Outreach · Dec 2024–Mar 2025',
  'Techfest, IEEE Sri Lanka Section · Sep–Dec 2025',
  'Industpro 4.0, IEEE CS IIT · Feb–Apr 2025',
];
