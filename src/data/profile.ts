export type ProfileReference = {
  name: string;
  role: string;
  org: string;
  email: string;
  phone: string;
};

export type ProfileStat = {
  label: string;
  value: number;
};

export type TelemetryGauge = {
  label: string;
  subtitle: string;
  value: number;
  color: string;
  skills: string[];
};

export const PROFILE = {
  name: 'Branavan Kuganesan',
  nameDisplay: { first: 'BRANAVAN', last: 'KUGANESAN' },
  driverNumber: '01',
  nationality: 'Sri Lanka',
  flag: '🇱🇰',
  phone: '+94 724 200 700',
  email: 'branavan09@gmail.com',
  github: 'https://github.com/Branavan2004',
  linkedin: 'https://linkedin.com/in/branavan-kuganesan',
  location: 'Colombo, Sri Lanka',
  timezone: 'UTC+5:30',
  availability: 'Available for internships',
  university: 'University of Westminster',
  institute: 'Informatics Institute of Technology (IIT)',
  degree: 'BSc (Hons) Computer Science',
  years: '2024 – 2028',
  school: 'Royal College Colombo',
  schoolYears: '2010 – 2023',
  headline: 'Computer Science Undergraduate',
  languages: ['Tamil 🇱🇰', 'English 🇬🇧', 'Sinhala'],
  bio: 'Computer Science undergraduate at the Informatics Institute of Technology (IIT) affiliated with the University of Westminster. Passionate about software engineering, problem solving, and building technology solutions that address real-world challenges. Experienced in developing web applications and data-driven projects using modern programming tools. Actively involved in IEEE initiatives and university events, demonstrating leadership in organising technical programmes, managing student-focused events, and volunteering in large-scale technology activities. Seeking internship opportunities to gain hands-on industry experience and contribute to impactful software projects.',
  awards: [
    {
      title: 'Best Logistics Volunteer',
      org: 'IEEE Student Branch of IIT',
      year: '2025–2026',
      description: 'Recognised for exceptional contribution to event logistics operations.',
    },
    {
      title: 'Best Performer',
      org: 'International Space Science Competition — Go4Guru',
      year: '',
      description: 'Outstanding performance in international science competition.',
    },
  ],
  stats: [
    { label: 'Problem Solving', value: 92 },
    { label: 'Full-Stack Dev', value: 88 },
    { label: 'Data Engineering', value: 85 },
    { label: 'Machine Learning / AI', value: 82 },
    { label: 'System Design', value: 80 },
    { label: 'Leadership (IEEE)', value: 92 },
  ] satisfies ProfileStat[],
  moduleChips: [
    'Software Development',
    'Object Oriented Programming',
    'Database Systems',
    'Algorithms & Data Structures',
    'Client Server Architectures',
    'Machine Learning & Data Mining',
  ],
  roleBadges: [
    'Full-Stack Engineer',
    'ML Engineer',
    'Data Engineer',
    'IEEE Leader',
    'Educator',
  ],
  telemetryGauges: [
    {
      label: 'ENGINE POWER',
      subtitle: 'Backend Development',
      value: 88,
      color: 'var(--f1-red)',
      skills: ['Node.js', 'Express', 'Java', 'Spring', 'JDBC', 'REST APIs'],
    },
    {
      label: 'AERODYNAMICS',
      subtitle: 'Frontend Development',
      value: 88,
      color: 'var(--f1-cyan)',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS'],
    },
    {
      label: 'ERS SYSTEM',
      subtitle: 'Machine Learning & AI',
      value: 82,
      color: 'var(--f1-purple)',
      skills: ['Python', 'scikit-learn', 'k-Means', 'Logistic Regression', 'Data Mining'],
    },
    {
      label: 'FUEL MANAGEMENT',
      subtitle: 'Data Engineering',
      value: 85,
      color: 'var(--f1-blue)',
      skills: ['Snowflake', 'SQL', 'Data Pipelines', 'Data Analysis', 'PostgreSQL'],
    },
    {
      label: 'TYRE STRATEGY',
      subtitle: 'DevOps & Tools',
      value: 80,
      color: 'var(--f1-green)',
      skills: ['Docker', 'GitHub', 'Git', 'Containerization', 'SDLC', 'Vite'],
    },
  ] satisfies TelemetryGauge[],
  conceptChips: [
    'OOP',
    'Data Structures',
    'Algorithm Design',
    'REST APIs',
    'SDLC',
    'Problem Solving',
    'Team Collaboration',
    'Technical Communication',
  ],
  languagesTelemetry: [
    { label: 'Python', value: 80 },
    { label: 'JavaScript', value: 80 },
    { label: 'Java', value: 70 },
    { label: 'SQL', value: 80 },
    { label: 'TypeScript', value: 72 },
  ],
  references: [
    {
      name: 'Dhanushka Surendra Rathnayake',
      role: 'Senior Lecturer',
      org: 'Informatics Institute of Technology, Colombo',
      email: 'dhanushka.d@iit.ac.lk',
      phone: '+94 77 228 7083',
    },
    {
      name: 'Partheepan Radhakrishnan',
      role: 'Senior Quality Assurance Analyst',
      org: 'LSEG Sri Lanka',
      email: 'partheepan17@gmail.com',
      phone: '+94 77 723 1145',
    },
  ] satisfies ProfileReference[],
};
