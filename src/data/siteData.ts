import { PROFILE } from "./profile";

export { PROFILE };

export const SECTION_ORDER = [
  { id: "hero", short: "S1", name: "HERO", drsLabel: "SECTOR 1 — HERO" },
  { id: "driver-profile", short: "S2", name: "PROFILE", drsLabel: "SECTOR 2 — PROFILE" },
  { id: "skills-telemetry", short: "S3", name: "TELEMETRY", drsLabel: "SECTOR 3 — SKILLS TELEMETRY" },
  { id: "race-history", short: "S4", name: "PROJECTS", drsLabel: "SECTOR 4 — PROJECT CLASSIFICATION" },
  { id: "pit-wall", short: "S5", name: "PIT WALL", drsLabel: "SECTOR 5 — PIT WALL" },
  { id: "certifications-garage", short: "S6", name: "GARAGE", drsLabel: "SECTOR 6 — CREDENTIALS GARAGE" },
  { id: "live-telemetry", short: "S7", name: "LIVE", drsLabel: "SECTOR 7 — LIVE TELEMETRY" },
  { id: "contact-radio", short: "S8", name: "CONTACT", drsLabel: "SECTOR 8 — CONTACT RADIO" },
  { id: "finish-line", short: "S9", name: "PODIUM", drsLabel: "SECTOR 9 — FINISH LINE" },
] as const;

export const SKILL_GAUGES = [
  {
    title: "ENGINE POWER",
    subtitle: "Software Engineering",
    value: 88,
    color: "var(--f1-red)",
    skills: ["React", "TypeScript", "Node.js", "Express", "REST APIs", "Architecture"],
  },
  {
    title: "AERODYNAMICS",
    subtitle: "Frontend Development",
    value: 87,
    color: "var(--f1-cyan)",
    skills: ["React", "Tailwind CSS", "Framer Motion", "HTML", "CSS", "UI Systems"],
  },
  {
    title: "ERS SYSTEM",
    subtitle: "Machine Learning & AI",
    value: 82,
    color: "var(--f1-purple)",
    skills: ["Python", "scikit-learn", "k-Means", "Regression", "AI", "Data Mining"],
  },
  {
    title: "FUEL MANAGEMENT",
    subtitle: "Data Engineering",
    value: 85,
    color: "var(--f1-blue)",
    skills: ["Snowflake", "SQL", "Data Pipelines", "Analysis", "PostgreSQL", "Warehousing"],
  },
  {
    title: "TYRE STRATEGY",
    subtitle: "DevOps & Tools",
    value: 80,
    color: "var(--f1-green)",
    skills: ["Docker", "GitHub", "Git", "Vite", "Containerization", "SDLC"],
  },
] as const;

export const LANGUAGE_METRICS = [
  { label: "Python", value: 80 },
  { label: "JavaScript", value: 80 },
  { label: "Java", value: 70 },
  { label: "SQL", value: 80 },
  { label: "TypeScript", value: 72 },
] as const;

export const CONCEPTS = [
  "OOP",
  "Data Structures",
  "Algorithm Design",
  "REST APIs",
  "SDLC",
  "Problem Solving",
  "Team Collaboration",
  "Technical Communication",
] as const;

export const PROJECTS = [
  {
    position: "P1",
    badge: "FASTEST LAP",
    featured: true,
    title: "APEX RACE CONTROL",
    subtitle: "Bahrain Grand Prix — Full Season",
    stack: ["React 18", "Express", "Node.js", "Recharts", "Framer Motion", "Ergast API"],
    summary:
      "Full-stack F1 analytics dashboard with animated track visualisation, lap replay storytelling, and points calculations shaped for a broadcast-style experience.",
    bullets: [
      "Built a Formula 1-inspired analytics interface with immersive overlays and smooth section choreography.",
      "Implemented standings logic, points calculations, and resilient fallbacks for incomplete race data.",
      "Combined frontend storytelling with data visualisation to make complex race information readable.",
    ],
    stats: ["24 circuits", "20 drivers", "437pts exact", "Season dashboard"],
    github: "https://github.com/Branavan2004",
    demo: "#",
  },
  {
    position: "P2",
    title: "ECO PULSE WEB PLATFORM",
    stack: ["HTML", "CSS", "JavaScript"],
    summary:
      "Climate awareness platform aligned with the UN Sustainable Development Goals, featuring volunteer registration and educational resources for broader community impact.",
    stats: ["UN SDG aligned", "Volunteer registration", "Community focus"],
    github: "https://github.com/Branavan2004",
  },
  {
    position: "P3",
    title: "F1 RACE RESULT CALCULATOR",
    stack: ["Python", "JavaScript"],
    summary:
      "Race result calculation tool for Formula 1 scenarios, handling penalties, gap analysis, and automated points-driven leaderboard generation.",
    stats: ["Automated leaderboard", "Penalty engine", "Gap analysis", "Points calculator"],
    github: "https://github.com/Branavan2004",
  },
  {
    position: "RACE 04",
    title: "NEXT ON CALENDAR",
    summary: "Project in active development.",
    eta: "ETA: Q3 2026",
    placeholder: true,
  },
  {
    position: "RACE 05",
    title: "NEXT ON CALENDAR",
    summary: "Project in active development.",
    eta: "ETA: Q3 2026",
    placeholder: true,
  },
] as const;

export const EXPERIENCE = {
  teaching: {
    role: "Volunteer Mathematics Teacher",
    org: "St Mary's College, Avissawella",
    years: "2024 – Present",
    bullets: [
      "Conduct mathematics sessions for Grade 11 students, focusing on exam preparation and concept clarity.",
      "Develop structured lesson plans and provide one-on-one mentoring tailored to student learning needs.",
      "Strengthen analytical reasoning and problem-solving through guided practice and targeted support.",
    ],
    tag: "UNDERCUT STRATEGY",
  },
  leadership: [
    {
      lap: "LAP 1",
      color: "var(--f1-red)",
      role: "Industry Relations Lead",
      org: "IEEE Student Branch of IIT",
      dates: "January 2026 – Present",
      tag: "CURRENT ROLE",
      bullets: [
        "Leads industry outreach and partnerships connecting students with technology professionals and organisations.",
        "Coordinates technical workshops, networking sessions, and large-scale IEEE events across Sri Lanka.",
        "Manages sponsor, speaker, and organising committee communication for smooth execution.",
      ],
    },
    {
      lap: "LAP 2",
      color: "var(--f1-blue)",
      role: "Vice Chair Program — Let's Talk",
      org: "IEEE Young Professionals Sri Lanka",
      dates: "March 2026 – Present",
      tag: "CURRENT ROLE",
      bullets: [
        "Leading programme coordination for a professional engagement initiative focused on industry dialogue.",
      ],
    },
    {
      lap: "LAP 3",
      color: "var(--f1-blue)",
      role: "Industry Outreach Vice Chair — IX'25",
      org: "IEEE Student Branch of IIT",
      dates: "October 2025 – December 2025",
      bullets: [
        "Assisted in organising industry engagement programmes and networking sessions for students.",
        "Supported partnership outreach and communication with technology professionals.",
      ],
    },
    {
      lap: "LAP 4",
      color: "var(--f1-blue)",
      role: "Industry Outreach Vice Chair — TechTrek 2.0",
      org: "IEEE Robotics and Automation Society of IIT",
      dates: "June 2025 – November 2025",
      bullets: [
        "Supported outreach coordination and industry-facing event execution for a robotics-focused initiative.",
      ],
    },
    {
      lap: "LAP 5",
      color: "var(--f1-green)",
      role: "Logistics Standing Committee Member",
      org: "IEEE Student Branch of IIT",
      dates: "January 2025 – Present",
      bullets: [
        "Contributed to planning, logistics coordination, and operational support across multiple IEEE flagship events.",
      ],
    },
    {
      lap: "LAP 6",
      color: "var(--f1-white)",
      role: "Batch Representative",
      org: "Informatics Institute of Technology",
      dates: "2024 – 2026",
      bullets: [
        "Represented the student batch in academic and administrative discussions.",
        "Facilitated communication between students and faculty and supported academic coordination.",
      ],
    },
  ],
  volunteerStops: [
    "CodeSprint X · Logistics · Mar–Jul 2025",
    "AfterMath'25 · Logistics · Jul–Aug 2025",
    "HackSphere · Industry Outreach · Jul–Sep 2025",
    "MicroMaze 2.0 · Industry Outreach · Jun–Aug 2025",
    "Traction · Industry Outreach · Mar–Apr 2025",
    "Robot Nexus-2 · Industry Outreach · Dec 2024–Mar 2025",
    "Techfest · IEEE Sri Lanka Section · Sep–Dec 2025",
    "Industpro 4.0 · IEEE CS IIT · Feb–Apr 2025",
  ],
  awards: [
    {
      icon: "Award",
      title: "Best Logistics Volunteer",
      org: "IEEE Student Branch of IIT",
      year: "2025–2026",
      note: "Recognised for standout contribution to large-scale event logistics and team execution.",
    },
    {
      icon: "Recognition",
      title: "Best Performer",
      org: "International Space Science Competition — Go4Guru",
      year: "",
      note: "Outstanding performance in an international science competition environment.",
    },
  ],
} as const;

export const FEATURED_CREDENTIALS = [
  {
    title: "Data Engineering",
    subtitle: "Professional Certificate",
    issuer: "SNOWFLAKE",
    date: "Mar 2026",
    skills: ["Data Pipelines", "Data Engineering", "Snowflake", "SQL"],
    brandColor: "#29B5E8",
    credentialUrl: PROFILE.linkedin,
  },
  {
    title: "Machine Learning",
    subtitle: "with Python Prof. Cert",
    issuer: "ANACONDA, INC.",
    date: "Mar 2026",
    skills: ["Python", "Machine Learning", "AI", "scikit-learn"],
    brandColor: "#FFD43B",
    credentialUrl: PROFILE.linkedin,
  },
  {
    title: "Java Foundations",
    subtitle: "Professional Cert",
    issuer: "JETBRAINS",
    date: "Mar 2026",
    skills: ["Java", "Data Structures", "OOP", "Algorithms"],
    brandColor: "#FE2857",
    credentialUrl: PROFILE.linkedin,
  },
  {
    title: "Docker Foundations",
    subtitle: "Professional Cert",
    issuer: "DOCKER, INC.",
    date: "Mar 2026",
    skills: ["Docker", "Containerization", "Images", "Workflow"],
    brandColor: "#2496ED",
    credentialUrl: PROFILE.linkedin,
  },
  {
    title: "Career Essentials in GitHub",
    subtitle: "Professional Cert",
    issuer: "GITHUB",
    date: "Mar 2026",
    skills: ["GitHub", "Version Control", "Projects", "Collaboration"],
    brandColor: "#333333",
    credentialUrl: PROFILE.linkedin,
  },
] as const;

export const CERTIFICATIONS = [
  {
    bay: "BAY 1",
    label: "Machine Learning (LinkedIn)",
    color: "#0A66C2",
    items: [
      {
        title: "Machine Learning with Python: k-Means Clustering",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["k-Means", "Clustering"],
      },
      {
        title: "Machine Learning with Python: Logistic Regression",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Logistic Regression", "Classification"],
      },
      {
        title: "Machine Learning with Python: Foundations",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Machine Learning", "AI"],
      },
    ],
  },
  {
    bay: "BAY 2",
    label: "Snowflake (Companion)",
    color: "#29B5E8",
    items: [
      {
        title: "Advanced Data Engineering with Snowflake",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Data Pipelines", "Snowflake"],
      },
      {
        title: "Introduction to Modern Data Engineering with Snowflake",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Data Engineering", "Warehousing"],
      },
      {
        title: "Intro to Snowflake for Developers, Data Scientists, Engineers",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Snowflake", "Data Roles"],
      },
    ],
  },
  {
    bay: "BAY 3",
    label: "JetBrains (Companion)",
    color: "#FE2857",
    items: [
      {
        title: "Learning JDBC",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["JDBC", "Java"],
      },
      {
        title: "Java: Data Structures",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Java", "Data Structures"],
      },
      {
        title: "Programming Foundations: Algorithms",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Algorithms", "Problem Solving"],
      },
    ],
  },
  {
    bay: "BAY 4",
    label: "Docker (Companion)",
    color: "#2496ED",
    items: [
      {
        title: "Docker: Your First Project",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Docker", "Projects"],
      },
      {
        title: "Learning Docker",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["Docker", "Containers"],
      },
    ],
  },
  {
    bay: "BAY 5",
    label: "GitHub (Companion)",
    color: "#333333",
    items: [
      {
        title: "Practical GitHub Code Search",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["GitHub", "Search"],
      },
      {
        title: "Practical GitHub Project Management & Collaboration",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["GitHub", "Collaboration"],
      },
    ],
  },
  {
    bay: "BAY 6",
    label: "Web & Data",
    color: "#64C4FF",
    items: [
      {
        title: "Introduction to Web APIs",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["APIs", "Integration"],
      },
      {
        title: "SQL for Data Analysis",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["SQL", "Analysis"],
      },
      {
        title: "React Essential Training",
        issuer: "LinkedIn",
        date: "Mar 2026",
        skills: ["React", "Frontend"],
      },
    ],
  },
  {
    bay: "BAY 7",
    label: "Foundations",
    color: "#8B5CF6",
    items: [
      {
        title: "Learning Python",
        issuer: "LinkedIn",
        date: "Nov 2024",
        skills: ["Python", "Programming"],
      },
    ],
  },
] as const;

export const TOTAL_CERTIFICATIONS = 22;

export const REFERENCES = [
  {
    name: "Dhanushka Surendra Rathnayake",
    role: "Senior Lecturer",
    org: "Informatics Institute of Technology, Colombo",
    email: "dhanushka.d@iit.ac.lk",
    phone: "+94 77 228 7083",
  },
  {
    name: "Partheepan Radhakrishnan",
    role: "Senior Quality Assurance Analyst",
    org: "LSEG Sri Lanka",
    email: "partheepan17@gmail.com",
    phone: "+94 77 723 1145",
  },
] as const;

export const TICKER_ITEMS = [
  "BRANAVAN KUGANESAN",
  "SOFTWARE ENGINEER",
  "COMPUTER SCIENCE UNDERGRADUATE",
  "IIT / UNIVERSITY OF WESTMINSTER",
  "COLOMBO, SRI LANKA",
  "AVAILABLE IMMEDIATELY",
  "DATA ENGINEERING",
  "MACHINE LEARNING",
  "IEEE INDUSTRY RELATIONS LEAD",
  "22 CERTIFICATIONS",
  "branavan09@gmail.com",
  "+94 724 200 700",
  "github.com/Branavan2004",
  "linkedin.com/in/branavan-kuganesan",
] as const;

export const RADIO_MESSAGES = [
  "ENGINEER → BRN: Systems nominal, push for quality",
  "ENGINEER → BRN: Software Engineer target role confirmed",
  "BRN → PIT: Copy, telemetry stable and building pace",
  "ENGINEER → BRN: Data engineering package looks strong",
  "ENGINEER → BRN: Credentials loaded, all verified 2026",
  "BRN → PIT: Ready to transmit to high-impact teams",
  "ENGINEER → BRN: Internship window open, keep pushing",
] as const;

export const DIRECTOR_MESSAGES = [
  "FIA RACE CONTROL: SOFTWARE ENGINEER APPLICATION BUILD V2 ACTIVE",
  "TIMING SCREEN: BRANAVAN KUGANESAN LEADS THE FIELD",
  "GARAGE UPDATE: 22 CERTIFICATIONS VERIFIED FOR 2026",
  "PIT WALL: IEEE LEADERSHIP PACKAGE DEPLOYED",
  "CONTACT RADIO: OPEN CHANNEL TO TEAM BRANAVAN RACING",
  "CHEQUERED FLAG: SOFTWARE ENGINEER PRIMARY CLASSIFICATION CONFIRMED",
  "DRS ENABLED: DATA ENGINEERING AND MACHINE LEARNING SECONDARY SPECIALISATIONS",
] as const;

export const TEAM_COLORS = {
  RedBull: "#3671C6",
  Ferrari: "#E8002D",
  McLaren: "#FF8000",
  Mercedes: "#27F4D2",
} as const;

export const TIMING_TOWER = [
  { pos: "P1", code: "BRN", gap: "LEADER", color: "var(--f1-gold)" },
  { pos: "P2", code: "SWE", gap: "+0.347", color: "var(--f1-red)" },
  { pos: "P3", code: "DTE", gap: "+1.203", color: "var(--f1-blue)" },
  { pos: "P4", code: "ML", gap: "+2.891", color: "var(--f1-purple)" },
  { pos: "P5", code: "I3E", gap: "+4.112", color: "var(--f1-green)" },
] as const;
