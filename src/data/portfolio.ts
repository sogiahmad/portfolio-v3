export interface ServiceItem {
  id: string;
  number: string;
  tabLabel: string;
  tabColor: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  tags: string[];
  palette: string[];
  summary: string;
  impact: string[];
  images: [string, string];
  slotLabels: [string, string];
  repoUrl: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  period: string;
  chapter: string;
  location: string;
  badge: string;
  summary: string;
  metrics: string;
  slotLabel: string;
  image?: string;
}

export const PROFILE_DATA = {
  brand: "SYAUQI",
  brandLower: "syauqi",
  fullName: "SYAUQI AHMAD",
  roleBadge: "INFORMATION SYSTEMS STUDENT",
  location: "BASED IN JAKARTA, INDONESIA",
  
  heroTagline:
    "INFORMATION SYSTEMS STUDENT TURNING IDEAS INTO SECURE, SCALABLE & DATA-DRIVEN WEB INTERFACES.",
  aboutParagraph:
    "I'm Syauqi Ahmad, an Information Systems undergraduate at UIN Syarif Hidayatullah Jakarta with hands-on experience building a full-stack hospital IT system (ICT Helpdesk & Asset Management) at Rumah Sakit Pertamina Jaya. Certified in Cisco Cybersecurity, Data Analytics, and BNSP Computer Programming, I combine full-stack web development, security vulnerability research (CVSS 7.5), and data-driven advocacy to build secure, scalable digital solutions.",
  metrics: [
    { value: "3.47", label: "GPA / 4.00 AT UIN JAKARTA" },
    { value: "500+", label: "STUDENT ASPIRATIONS MANAGED" },
    { value: "5", label: "INDUSTRY CERTIFICATIONS" },
  ],
  contact: {
    email: "sogiahmad123@gmail.com",
    phone: "089509925026",
    whatsappUrl: "https://wa.me/6289509925026",
    linkedin: "https://www.linkedin.com/in/uqi19/",
    github: "https://github.com/uqi19",
  },
  education: [
    {
      institution: "UIN Syarif Hidayatullah Jakarta",
      degree: "Bachelor of Information Systems",
      period: "2023 – Present",
      note: "GPA: 3.47 / 4.00 • Active in Student Senate (SEMA FST)",
    },
    {
      institution: "SMK Negeri 71 Jakarta",
      degree: "Software Engineering (RPL)",
      period: "2020 – 2023",
      note: "Selected as Eligible Student (Top Tier Graduate) for SNBP",
    },
  ],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-web",
    number: "01",
    tabLabel: "Full-Stack Web",
    tabColor: "#1B6B3A",
    title: "FULL-STACK WEB DEVELOPMENT",
    description:
      "Building responsive, database-driven web applications using Next.js, Python (Flask), PHP, and MySQL with RBAC security and clean UI/UX.",
    highlights: ["Next.js & Prisma ORM", "Python (Flask) & PHP", "MySQL & RBAC Security"],
  },
  {
    id: "service-sec",
    number: "02",
    tabLabel: "Security Research",
    tabColor: "#FF4D00",
    title: "SECURITY VULNERABILITY RESEARCH",
    description:
      "Conducting web application security audits, identifying High-severity (CVSS 7.5) information disclosures, and formulating .htaccess server hardening.",
    highlights: ["CVSS 7.5 Auditing", ".htaccess Hardening", "Risk Mitigation"],
  },
  {
    id: "service-data",
    number: "03",
    tabLabel: "Data & Systems",
    tabColor: "#D99B16",
    title: "DATA ANALYTICS & SYSTEMS",
    description:
      "Transforming raw survey and operational datasets into strategic reports using SQL, Excel, and Cisco-certified analytical methodologies.",
    highlights: ["Cisco Data Analytics", "SQL Querying", "500+ Constituent Data"],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-01",
    number: "01",
    category: "FULL-STACK SYSTEM",
    year: "2026",
    title: "RSPJ ICT HELPDESK & ASSET SYSTEM",
    subtitle: "Hospital-Wide IT Ticketing & Real-Time Asset Management Platform",
    tags: ["NEXT.JS", "MYSQL", "PRISMA ORM", "RBAC"],
    palette: ["#1B6B3A", "#1C1C1C", "#EBE7E0"],
    summary:
      "Designed and built a full-stack web-based ICT Helpdesk & Asset Management system for Rumah Sakit Pertamina Jaya (RSPJ), replacing a fully manual hospital-wide ticketing and asset-tracking workflow with real-time digital integration.",
    impact: [
      "Replaced manual hospital-wide IT ticketing and asset logs with real-time digital synchronization.",
      "Secured multi-role access (Staff, Technician, Admin) using Role-Based Access Control (RBAC) and password encryption.",
      "Validated system reliability across structured Black-box testing scenarios with a 100% pass rate.",
    ],
    images: ["/images/RSPJ1.png", "/images/RSPJ2.png"],
    slotLabels: [
      "RSPJ • ICT HELPDESK TICKETING DASHBOARD",
      "RSPJ • REAL-TIME ASSET TRACKING & RBAC",
    ],
    repoUrl: "https://github.com/uqi19",
  },
  {
    id: "proj-02",
    number: "02",
    category: "CYBERSECURITY",
    year: "2025",
    title: "VULNERABILITY RESEARCH: INFO DISCLOSURE",
    subtitle: "Government Domain Security Audit & Server Hardening",
    tags: ["CYBERSECURITY", "CVSS 7.5", ".HTACCESS", "HARDENING"],
    palette: ["#FF4D00", "#1C1C1C", "#EBE7E0"],
    summary:
      "Conducted security vulnerability research on a government domain, identifying a High-severity Information Disclosure flaw (CVSS Score 7.5) and engineering server-level remediation.",
    impact: [
      "Identified a High-severity Information Disclosure vulnerability (CVSS Score 7.5), preventing potential sensitive data exposure.",
      "Formulated a remediation strategy via server hardening using .htaccess rules.",
      "Reduced unauthorized directory and file access risks across production endpoints.",
    ],
    images: ["/images/ITSM1.png", "/images/ITSM2.png"],
    slotLabels: [
      "SECURITY AUDIT • CVSS 7.5 ASSESSMENT",
      "REMEDIATION • .HTACCESS SERVER HARDENING",
    ],
    repoUrl: "https://www.linkedin.com/in/uqi19/",
  },
  {
    id: "proj-03",
    number: "03",
    category: "FULL-STACK WEB",
    year: "2024",
    title: "JOURNAL & SCIENCE BOOK PLATFORM",
    subtitle: "Digital Library & Academic Repository System",
    tags: ["PYTHON", "FLASK", "MYSQL", "BCRYPT"],
    palette: ["#165B33", "#EBE7E0", "#FF4D00"],
    summary:
      "Developed a full-stack digital library system using Python (Flask) and MySQL, integrating 5+ core modules including role-based authentication, catalog indexing, and dynamic search.",
    impact: [
      "Implemented bcrypt password hashing to guarantee 100% cryptographic protection of user credentials.",
      "Engineered relational MySQL schema for fast multi-keyword filtering across journals and science books.",
      "Built responsive reading & management views tailored for academic accessibility.",
    ],
    images: ["/images/Picture1.png", "/images/Picture2.png"],
    slotLabels: [
      "FLASK CATALOG & SEARCH INTERFACE",
      "MYSQL SCHEMA & AUTHENTICATION VIEW",
    ],
    repoUrl: "https://github.com/uqi19",
  },
  {
    id: "proj-04",
    number: "04",
    category: "E-COMMERCE",
    year: "2023",
    title: "DIMSKUY!! BUSINESS WEB",
    subtitle: "Asynchronous Culinary Landing Page & Automated Ordering System",
    tags: ["PHP", "AJAX", "JAVASCRIPT", "UI/UX"],
    palette: ["#D99B16", "#1C1C1C", "#FF4D00"],
    summary:
      "Built a functional commercial landing page and real-time ordering workflow, automating customer product inquiries through PHP and asynchronous AJAX requests.",
    impact: [
      "Reduced manual order response time by streamlining customer checkout into structured payloads.",
      "Eliminated full-page reloads during cart and inquiry submission using vanilla JS & AJAX.",
      "Designed mobile-first menu showcase optimized for quick customer conversion.",
    ],
    images: ["/images/dimsum.png", "/images/dimsum 1.png"],
    slotLabels: [
      "DIMSKUY!! • STOREFRONT LANDING PAGE",
      "DIMSKUY!! • AJAX ORDERING WORKFLOW",
    ],
    repoUrl: "https://github.com/uqi19",
  },
  {
    id: "proj-05",
    number: "05",
    category: "COMPANY PROFILE",
    year: "2022",
    title: "MEGA BAJA COMPANY PROFILE",
    subtitle: "Responsive Corporate Website & UI/UX Navigation Redesign",
    tags: ["HTML5", "CSS3", "JAVASCRIPT", "UI/UX"],
    palette: ["#FF4D00", "#1C1C1C", "#EBE7E0"],
    summary:
      "Developed a responsive Company Profile website for Mega Baja using HTML, CSS, and JavaScript, ensuring 100% cross-device accessibility and streamlined user navigation.",
    impact: [
      "Ensured 100% cross-device accessibility across desktop, tablet, and mobile viewports.",
      "Designed UI/UX interfaces that optimized user navigation flow and information clarity.",
      "Collaborated with Senior Developers to align with 95% of project technical requirements.",
    ],
    images: ["/images/portfolio-2.jpg", "/images/portfolio-3.jpg"],
    slotLabels: [
      "MEGA BAJA • COMPANY PROFILE INTERFACE",
      "MEGA BAJA • RESPONSIVE NAVIGATION FLOW",
    ],
    repoUrl: "https://www.linkedin.com/in/uqi19/",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-01",
    title: "Rumah Sakit Pertamina Jaya (RSPJ)",
    role: "Information Systems Intern",
    period: "APR 2026 – MAY 2026",
    chapter: "WORK EXPERIENCE",
    location: "Jakarta, Indonesia",
    badge: "100% BLACK-BOX TEST PASS RATE",
    summary:
      "Designed and built a full-stack web-based ICT Helpdesk & Asset Management system (Next.js, MySQL, Prisma ORM), replacing a fully manual hospital-wide ticketing and asset-tracking process with real-time digital integration.",
    metrics: "Secured Staff, Technician & Admin workflows via RBAC with 100% Black-box test pass rate.",
    slotLabel: "SLOT EXP-01 • RSPJ ICT HELPDESK & ASSET SYSTEM",
    image: "/images/RSPJ3.png",
  },
  {
    id: "exp-02",
    title: "Mega Baja — IT Analyst Intern",
    role: "Information Technology Analyst Intern",
    period: "APR 2022 – JUN 2022",
    chapter: "WORK EXPERIENCE",
    location: "Jakarta, Indonesia",
    badge: "100% CROSS-DEVICE ACCESSIBILITY",
    summary:
      "Developed a responsive Company Profile website using HTML, CSS, and JavaScript while designing UI/UX navigation flows alongside Senior Developers.",
    metrics: "Aligned with 95% of project technical requirements & 100% cross-device compatibility.",
    slotLabel: "SLOT EXP-02 • MEGA BAJA COMPANY PROFILE MOCKUP",
    image: "/images/mgbaja.jpg",
  },
  {
    id: "exp-03",
    title: "SEMA FST UIN Jakarta",
    role: "Member of Aspiration Commission",
    period: "2025 – PRESENT",
    chapter: "STUDENT SENATE",
    location: "UIN Syarif Hidayatullah Jakarta",
    badge: "500+ STUDENT CONSTITUENTS",
    summary:
      "Managed, structured, and advocated academic & facility aspirations from over 500 FST students directly to the faculty deanery using data-driven survey reports.",
    metrics: "Processed 500+ student survey responses into actionable deanery policy briefs.",
    slotLabel: "SLOT EXP-03 • SEMA FST ASPIRATION DATA REPORT",
    image: "/images/sema.png",
  },
  {
    id: "exp-04",
    title: "GDGOC UIN Jakarta",
    role: "Google Developer Groups On Campus Member",
    period: "DEC 2024 – DEC 2025",
    chapter: "DEVELOPER COMMUNITY",
    location: "UIN Syarif Hidayatullah Jakarta",
    badge: "40+ HOURS INTENSIVE TRAINING",
    summary:
      "Selected for a Google-supported developer community, completing 40+ hours of hands-on workshops in SQL databases, UI/UX engineering, and Back-End Web Development.",
    metrics: "Certified in Web Development (Back-End) by GDGOC & OrCampus (2025).",
    slotLabel: "SLOT EXP-04 • GDGOC UIN JAKARTA WORKSHOP",
    image: "/images/gdgoc.jpg",
  },
  {
    id: "exp-05",
    title: "Meetup Sistem Informasi",
    role: "Staff of K3 Division & Kabim Staff",
    period: "2024 – 2025",
    chapter: "CAMPUS LEADERSHIP",
    location: "Information Systems Dept.",
    badge: "200+ ATTENDEES & 50+ MENTEES",
    summary:
      "Designed 3+ emergency protocols and risk management plans for 200+ event attendees (K3 Division 2024), and mentored 50+ junior students in organizational leadership (Kabim 2025).",
    metrics: "Zero safety incidents across 200+ participants; guided 50+ freshmen.",
    slotLabel: "SLOT EXP-05 • MEETUP SISTEM INFORMASI",
    image: "/images/metup.jpg",
  },
  {
    id: "exp-06",
    title: "Milad Sistem Informasi",
    role: "Staff of Logistics & Equipment",
    period: "AUG 2024 – SEP 2024",
    chapter: "EVENT OPERATIONS",
    location: "Information Systems Dept.",
    badge: "ZERO-DEFICIT INVENTORY",
    summary:
      "Managed technical equipment inventory and cross-division facility procurement for the major departmental anniversary event serving hundreds of participants.",
    metrics: "100% technical facility availability with zero equipment deficit.",
    slotLabel: "SLOT EXP-06 • MILAD SISTEM INFORMASI",
    image: "/images/milad.jpeg",
  },
];