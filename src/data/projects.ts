export type ProjectCard = {
  id: string;
  position: string;
  race: string;
  title: string;
  subtitle: string;
  constructor: string;
  description: string[];
  stats: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  placeholder?: boolean;
};

export const PROJECTS: ProjectCard[] = [
  {
    id: 'apex-race-control',
    position: 'P1',
    race: 'RACE 01',
    title: 'APEX RACE CONTROL',
    subtitle: 'Bahrain Grand Prix — Full Season',
    constructor: 'React 18 · Express · Node.js · Recharts · Framer Motion · Ergast API · Pure CSS',
    description: [
      'Full-stack F1 race analytics dashboard.',
      'SVG track animation with all 20 cars simultaneously.',
      'Lap-by-lap replay engine across all 24 rounds of the 2024 season.',
      'Pure-function championship calculator reproducing exact official standings.',
      'Ergast API + silent mock fallback.',
    ],
    stats: [
      '24 circuits · 20 drivers · 437pts exact',
      'VER 437 · NOR 374 · LEC 356 (verified)',
      'McLaren 666pts constructor champions',
    ],
    github: 'https://github.com/Branavan2004/f1-react-mvp',
    featured: true,
  },
  {
    id: 'eco-pulse',
    position: 'P2',
    race: 'RACE 02',
    title: 'ECO PULSE WEB PLATFORM',
    subtitle: 'Climate Awareness Platform',
    constructor: 'HTML · CSS · JavaScript',
    description: [
      'Climate awareness platform aligned with UN Sustainable Development Goals (SDGs).',
      'Features volunteer registration system, environmental awareness resources, and educational content sections.',
    ],
    stats: [
      'UN SDG Aligned',
      'Volunteer Registration',
      'Environmental Awareness',
      'Community Focus',
    ],
    github: 'https://github.com/Branavan2004',
  },
  {
    id: 'race-result-calculator',
    position: 'P3',
    race: 'RACE 03',
    title: 'F1 RACE RESULT CALCULATOR',
    subtitle: 'Telemetry and Points Tool',
    constructor: 'Python · JavaScript',
    description: [
      'Tool to calculate F1 race results including lap times, penalties, and gap calculations.',
      'Automatic leaderboard statistics generation with full points system implementation.',
    ],
    stats: [
      'Automated Leaderboard',
      'Penalty Engine',
      'Points Calculator',
      'Gap Analysis',
    ],
    github: 'https://github.com/Branavan2004',
  },
  {
    id: 'upcoming-1',
    position: 'RACE 04',
    race: 'TBC',
    title: 'IN DEVELOPMENT',
    subtitle: 'Next race on the calendar.',
    constructor: 'To be announced',
    description: ['Expected: Q3 2026'],
    stats: [],
    placeholder: true,
  },
  {
    id: 'upcoming-2',
    position: 'RACE 05',
    race: 'TBC',
    title: 'IN DEVELOPMENT',
    subtitle: 'Next race on the calendar.',
    constructor: 'To be announced',
    description: ['Expected: Q3 2026'],
    stats: [],
    placeholder: true,
  },
];
