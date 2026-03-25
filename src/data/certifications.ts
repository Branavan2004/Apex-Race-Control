export type CertificationItem = {
  title: string;
  issuer: string;
  issued: string;
  level?: string;
  skills: string[];
};

export type CertificationBay = {
  id: string;
  label: string;
  color: string;
  items: CertificationItem[];
};

export const CERTIFICATION_BAYS: CertificationBay[] = [
  {
    id: 'anaconda',
    label: 'ANACONDA',
    color: '#FFD43B',
    items: [
      {
        title: 'Machine Learning with Python Professional Certificate',
        issuer: 'Anaconda, Inc.',
        issued: 'Mar 2026',
        level: 'Professional Certificate',
        skills: ['Python', 'Machine Learning'],
      },
    ],
  },
  {
    id: 'snowflake',
    label: 'SNOWFLAKE',
    color: '#29B5E8',
    items: [
      {
        title: 'Data Engineering Professional Certificate',
        issuer: 'Snowflake',
        issued: 'Mar 2026',
        level: 'Professional Certificate',
        skills: ['Data Pipelines', 'Data Engineering', 'Snowflake', 'SQL'],
      },
      {
        title: 'Advanced Data Engineering with Snowflake',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Pipelines', 'DevOps'],
      },
      {
        title: 'Introduction to Modern Data Engineering with Snowflake',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Engineering', 'Snowflake'],
      },
      {
        title: 'Intro to Snowflake for Devs, Data Scientists, Data Engineers',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Engineering', 'Snowflake'],
      },
    ],
  },
  {
    id: 'jetbrains',
    label: 'JETBRAINS',
    color: '#FE2857',
    items: [
      {
        title: 'Java Foundations Professional Certificate',
        issuer: 'JetBrains',
        issued: 'Mar 2026',
        level: 'Professional Certificate',
        skills: ['Data Structures', 'Java', 'OOP'],
      },
      {
        title: 'Learning JDBC',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Java Database Connectivity (JDBC)'],
      },
      {
        title: 'Java: Data Structures',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Structures', 'Java'],
      },
      {
        title: 'Programming Foundations: Algorithms',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Structures', 'Algorithm Design', 'Problem Solving'],
      },
    ],
  },
  {
    id: 'docker',
    label: 'DOCKER',
    color: '#2496ED',
    items: [
      {
        title: 'Docker Foundations Professional Certificate',
        issuer: 'Docker, Inc.',
        issued: 'Mar 2026',
        level: 'Professional Certificate',
        skills: ['Containerization', 'Docker'],
      },
      {
        title: 'Docker: Your First Project',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Docker Products'],
      },
      {
        title: 'Learning Docker',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Docker Products'],
      },
    ],
  },
  {
    id: 'github',
    label: 'GITHUB',
    color: '#80838A',
    items: [
      {
        title: 'Career Essentials in GitHub Professional Certificate',
        issuer: 'GitHub',
        issued: 'Mar 2026',
        level: 'Professional Certificate',
        skills: ['GitHub', 'Version Control'],
      },
      {
        title: 'Practical GitHub Code Search',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['GitHub'],
      },
      {
        title: 'Practical GitHub Project Management & Collaboration',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Project Management', 'GitHub'],
      },
    ],
  },
  {
    id: 'ml-linkedin',
    label: 'MACHINE LEARNING',
    color: '#0a66c2',
    items: [
      {
        title: 'Machine Learning with Python: k-Means Clustering',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['k-Means Clustering', 'Unsupervised Learning'],
      },
      {
        title: 'Machine Learning with Python: Logistic Regression',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Machine Learning', 'Logistic Regression', 'Classification'],
      },
      {
        title: 'Machine Learning with Python: Foundations',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Machine Learning', 'Artificial Intelligence'],
      },
    ],
  },
  {
    id: 'web-data',
    label: 'WEB & DATA',
    color: '#64C4FF',
    items: [
      {
        title: 'Introduction to Web APIs',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['APIs', 'API Development'],
      },
      {
        title: 'SQL for Data Analysis',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Data Analysis', 'SQL'],
      },
      {
        title: 'React Essential Training',
        issuer: 'LinkedIn',
        issued: 'Mar 2026',
        skills: ['Web Development', 'Front-End Development', 'React'],
      },
      {
        title: 'Learning Python',
        issuer: 'LinkedIn',
        issued: 'Nov 2024',
        skills: ['Python'],
      },
    ],
  },
];

export const CERTIFICATION_COUNT = CERTIFICATION_BAYS.reduce(
  (total, bay) => total + bay.items.length,
  0,
);
