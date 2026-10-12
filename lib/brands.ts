export interface BrandConfig {
  slug: string;
  name: string;
  legalName: string;
  parentCompany: string;
  domain: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  disclosure: string;
  websiteUrl: string;
  logoText: string;
  badgeLabel: string;
  industry: string;
  foundedYear: number;
  founder: string;
  headquarters: string;
  locations: string[];
  contactEmail: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
  verifiedEmailDomain: string;
  theme: {
    primary: string;
    accent: string;
    surface: string;
    bg: string;
    heroGradient: string;
    badgeBg: string;
    badgeText: string;
  };
  facts: {
    label: string;
    value: string;
    description: string;
  }[];
  methodology: {
    title: string;
    description: string;
    steps: {
      name: string;
      desc: string;
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  supportedServices: string[];
}

export const BRANDS: Record<string, BrandConfig> = {
  "portfolio-builders": {
    slug: "portfolio-builders",
    name: "Portfolio Builders",
    legalName: "Portfolix Enterprise Private Limited",
    parentCompany: "Portfolix Enterprise Private Limited",
    domain: "portfoliobuilders.reviews",
    tagline: "Official Reviews & Customer Experience Hub",
    shortDescription: "Portfolio Builders provides design, development and career-oriented education programs.",
    fullDescription: "Portfolio Builders provides career-oriented education, UI/UX mentorship, modern mobile/web engineering tracks, and real-world project portfolio development for aspiring tech professionals.",
    disclosure: "This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.",
    websiteUrl: "https://portfoliobuilders.in/",
    logoText: "PORTFOLIO BUILDERS",
    badgeLabel: "Official Reviews Hub",
    industry: "Design, Development & Career-Oriented Education Programs",
    foundedYear: 2021,
    founder: "Portfolix Enterprise Group",
    headquarters: "Kochi, Kerala, India",
    locations: ["Kochi, India", "Calicut, India", "Online / Remote"],
    contactEmail: "reviews@portfoliobuilders.in",
    socials: {
      linkedin: "https://linkedin.com/company/portfolio-builders",
      instagram: "https://instagram.com/portfoliobuilders",
    },
    verifiedEmailDomain: "@portfoliobuilders.in",
    theme: {
      primary: "#059669",      // Emerald 600
      accent: "#0d9488",       // Teal 600
      surface: "#ffffff",
      bg: "#f0fdf4",          // Emerald 50
      heroGradient: "from-emerald-950 via-teal-950 to-slate-950",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
    },
    facts: [
      { label: "Legal Operating Entity", value: "Portfolix Enterprise Private Limited", description: "Registered corporate holding company" },
      { label: "Verified Student Feedback", value: "98.2%", description: "Authentic first-party reviews matched against LMS enrollments" },
      { label: "Primary Discipline", value: "UI/UX & Engineering Mentorship", description: "Hands-on project and portfolio development" },
      { label: "Review Verification SLA", value: "100% Verified Provenance", description: "Every submission verified by email OTP, LMS record, or manual audit" }
    ],
    methodology: {
      title: "How Reviews Are Collected & Verified",
      description: "Portfolio Builders enforces a transparent verification standard. We never fake badges or suppress genuine negative feedback.",
      steps: [
        { name: "1. Authentic Relationship Verification", desc: "Reviews are linked to student enrollment IDs, LMS account records, or verified email OTPs." },
        { name: "2. Dual-Layer Moderation", desc: "Automated linguistic spam filtering followed by human editorial review within 24 hours." },
        { name: "3. Immutable Student Sentiment", desc: "Both critical and positive reviews are published without alteration or filtering." },
        { name: "4. Official Right of Reply", desc: "Academic leadership responds publicly to address student observations and suggestions." }
      ]
    },
    faqs: [
      {
        question: "What is Portfolio Builders?",
        answer: "Portfolio Builders provides design, development, and career-oriented education programs focused on real-world portfolio creation, practical mentorship, and tech career placement."
      },
      {
        question: "Is Portfolio Builders legitimate?",
        answer: "Yes. Portfolio Builders is a recognized educational initiative operated under Portfolix Enterprise Private Limited, with verified student outcomes, public reviews, and transparent placement records."
      },
      {
        question: "Where is Portfolio Builders located?",
        answer: "Portfolio Builders is headquartered in Kerala, India (Kochi/Calicut) and provides both offline classroom tracks and interactive online programs across India and the Middle East."
      },
      {
        question: "Who founded Portfolio Builders?",
        answer: "Portfolio Builders was established by Portfolix Enterprise Private Limited as its dedicated talent education and creative portfolio incubator division."
      },
      {
        question: "What do students say about Portfolio Builders?",
        answer: "Students consistently highlight the personalized 1-on-1 mentor guidance, the focus on non-cookie-cutter portfolio projects, and practical preparation for design/development job interviews."
      },
      {
        question: "Is Portfolio Builders good for UI/UX?",
        answer: "Yes. The UI/UX curriculum covers end-to-end design thinking, user research, wireframing, Figma design systems, micro-interactions, and portfolio storytelling evaluated by industry practitioners."
      },
      {
        question: "What are Portfolio Builders course reviews?",
        answer: "Reviews across UI/UX, Flutter, AI/ML, and Python demonstrate an average 4.8 / 5.0 rating based on verified learner feedback and post-graduation hiring outcomes."
      },
      {
        question: "Does Portfolio Builders provide internships?",
        answer: "Yes. Portfolio Builders provides structured hands-on internships in UI/UX, Flutter, AI/ML, Python, and Cybersecurity, allowing students to work on production-like assignments."
      },
      {
        question: "What are Portfolio Builders internship reviews?",
        answer: "Interns praise the exposure to real-world codebases, pull request reviews by senior engineers, and practical portfolio additions that distinguish them during job hunts."
      },
      {
        question: "Does Portfolio Builders offer online learning?",
        answer: "Yes, Portfolio Builders provides interactive online cohorts featuring live lectures, mentor screen-shares, cloud lab access, and asynchronous Slack support."
      }
    ],
    supportedServices: [
      "UI/UX",
      "Flutter",
      "Internships",
      "AI/ML Internship",
      "Python Internship",
      "Cybersecurity Internship",
      "Career Programs",
      "Portfolio Mentorship",
      "Online Learning",
      "Offline Learning",
      "Career Support",
      "Placement Support"
    ]
  },

  "portfolix-tech": {
    slug: "portfolix-tech",
    name: "Portfolix.Tech",
    legalName: "Portfolix Enterprise Private Limited",
    parentCompany: "Portfolix Enterprise Private Limited",
    domain: "portfolixtech.reviews",
    tagline: "Official Reviews & Customer Experience Hub",
    shortDescription: "Portfolix.Tech delivers full-cycle software development, web engineering, mobile applications, and AI automation solutions.",
    fullDescription: "Portfolix.Tech architects enterprise developer platforms, performant web applications, custom SaaS products, and AI workflows for modern business organizations.",
    disclosure: "This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.",
    websiteUrl: "https://portfolix.tech/",
    logoText: "PORTFOLIX.TECH",
    badgeLabel: "Official Reviews Hub",
    industry: "Enterprise Software Engineering & AI Solutions",
    foundedYear: 2022,
    founder: "Portfolix Enterprise Group",
    headquarters: "Kochi, Kerala, India / Remote",
    locations: ["Kochi, India", "Bengaluru, India", "Global Remote"],
    contactEmail: "reviews@portfolix.tech",
    socials: {
      linkedin: "https://linkedin.com/company/portfolix-tech",
      github: "https://github.com/portfolix-tech",
    },
    verifiedEmailDomain: "@portfolix.tech",
    theme: {
      primary: "#2563eb",      // Blue 600
      accent: "#7c3aed",       // Violet 600
      surface: "#ffffff",
      bg: "#eff6ff",          // Blue 50
      heroGradient: "from-slate-950 via-blue-950 to-indigo-950",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
    },
    facts: [
      { label: "Legal Operating Entity", value: "Portfolix Enterprise Private Limited", description: "Registered corporate holding entity" },
      { label: "System Availability SLA", value: "99.99%", description: "Verified uptime across production cloud environments" },
      { label: "Core Expertise", value: "Web, Mobile & AI Systems", description: "Full-lifecycle engineering for scaling businesses" },
      { label: "Verified Client Satisfaction", value: "4.9 / 5.0", description: "Aggregated across direct verified client audits, Clutch, and G2" }
    ],
    methodology: {
      title: "Technical Review & Client Verification Framework",
      description: "Portfolix.Tech evaluates engineering quality, code maintainability, delivery velocity, and ongoing infrastructure reliability.",
      steps: [
        { name: "1. Commercial Client Verification", desc: "Reviews are validated against project service agreements, commercial invoice IDs, or verified corporate domain email." },
        { name: "2. Technical Scope Tagging", desc: "Reviews categorize specific technologies and business deliverables (Next.js, Flutter, AWS, AI workflows)." },
        { name: "3. Transparent Issue Logging", desc: "Engineering hurdles or delivery changes reported by clients remain public alongside company resolutions." },
        { name: "4. Multi-Source Provenance", desc: "Imports verified external reviews from Clutch and G2 with clear source attribution and direct links." }
      ]
    },
    faqs: [
      {
        question: "What is Portfolix.Tech?",
        answer: "Portfolix.Tech is the digital technology and software engineering arm of Portfolix Enterprise Private Limited, providing custom web applications, mobile apps, SaaS platforms, and AI automation."
      },
      {
        question: "Who owns Portfolix.Tech?",
        answer: "Portfolix.Tech is owned and operated by Portfolix Enterprise Private Limited."
      },
      {
        question: "What services does Portfolix.Tech provide?",
        answer: "Portfolix.Tech provides Website Development, Mobile App Development, UI/UX Design, Software Development, SaaS Architecture, LMS Platforms, AI Engineering, Workflow Automation, and Branding."
      },
      {
        question: "Where is Portfolix.Tech based?",
        answer: "Portfolix.Tech is based in Kerala, India, with remote engineering teams delivering projects globally across India, Europe, the Middle East, and North America."
      },
      {
        question: "What do clients say about Portfolix.Tech?",
        answer: "Clients consistently commend Portfolix.Tech for clean code architecture, reliable delivery timelines, transparent communication during sprints, and proactive system optimization."
      },
      {
        question: "Portfolix.Tech software development reviews",
        answer: "Portfolix.Tech maintains a 4.9 / 5.0 rating across verified software development reviews, highlighting robust API design, microservice stability, and scalable cloud deployments."
      },
      {
        question: "Portfolix.Tech UI/UX reviews",
        answer: "Clients appreciate Portfolix.Tech's user-centric design approach, high-fidelity prototypes, design system documentation, and smooth handoff to engineering."
      },
      {
        question: "Portfolix.Tech web development reviews",
        answer: "Reviews emphasize high Lighthouse scores, edge rendering with Next.js, search optimization, and seamless integration with headless CMS and database backends."
      },
      {
        question: "Portfolix.Tech application development reviews",
        answer: "Mobile app reviews note high responsiveness across iOS and Android, offline sync capabilities, and clean state management."
      }
    ],
    supportedServices: [
      "Website Development",
      "Mobile App Development",
      "UI/UX Design",
      "Software Development",
      "SaaS",
      "LMS",
      "AI",
      "Automation",
      "Branding",
      "Business Software"
    ]
  },

  "portfolix-entreprise": {
    slug: "portfolix-entreprise",
    name: "Portfolix Entreprise",
    legalName: "Portfolix Enterprise Private Limited",
    parentCompany: "Portfolix Enterprise Private Limited",
    domain: "portfolixentreprise.reviews",
    tagline: "Official Reviews & Customer Experience Hub",
    shortDescription: "Portfolix Entreprise manages corporate digital partnerships, technology ventures, enterprise transformations, and governance ecosystems.",
    fullDescription: "Portfolix Entreprise is the parent enterprise venture entity overseeing brand operations, strategic technology partnerships, corporate digital incubation, and cross-border commercial collaborations.",
    disclosure: "This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.",
    websiteUrl: "https://www.portfolixentreprise.com/",
    logoText: "PORTFOLIX ENTREPRISE",
    badgeLabel: "Official Reviews Hub",
    industry: "Enterprise Digital Ventures & Corporate Governance",
    foundedYear: 2020,
    founder: "Portfolix Enterprise Group",
    headquarters: "Kochi, Kerala, India / Remote",
    locations: ["Kochi, India", "Global Venture Network"],
    contactEmail: "reviews@portfolixentreprise.com",
    socials: {
      linkedin: "https://linkedin.com/company/portfolix-entreprise",
    },
    verifiedEmailDomain: "@portfolixentreprise.com",
    theme: {
      primary: "#4f46e5",      // Indigo 600
      accent: "#9333ea",       // Purple 600
      surface: "#ffffff",
      bg: "#faf5ff",          // Purple 50
      heroGradient: "from-neutral-950 via-purple-950 to-slate-900",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-800",
    },
    facts: [
      { label: "Legal Company Name", value: "Portfolix Enterprise Private Limited", description: "Parent corporate entity" },
      { label: "Operating Subsidiaries", value: "Portfolio Builders & Portfolix.Tech", description: "Education and engineering business divisions" },
      { label: "Governance Compliance", value: "100% Audited", description: "Strict multi-brand separation and data integrity standards" },
      { label: "Partner Trust Rating", value: "4.7 / 5.0", description: "Based on verified corporate partner reviews and stakeholder audits" }
    ],
    methodology: {
      title: "Enterprise Governance & Audit Protocol",
      description: "Our enterprise review platform ensures transparent auditability for institutional partners, corporate collaborators, and stakeholders.",
      steps: [
        { name: "1. Corporate Stakeholder Verification", desc: "Reviews are validated against formal business collaboration agreements and authorized officer credentials." },
        { name: "2. Strategic Value Assessment", desc: "Evaluations focus on venture execution, partnership reliability, corporate governance, and contract adherence." },
        { name: "3. Legal Integrity & Compliance", desc: "Strict adherence to non-misleading review standards and international consumer transparency laws." },
        { name: "4. Executive Leadership Right of Reply", desc: "Corporate directors respond directly to all stakeholder feedback with transparent progress reports." }
      ]
    },
    faqs: [
      {
        question: "What is Portfolix Entreprise?",
        answer: "Portfolix Entreprise (legally registered as Portfolix Enterprise Private Limited) is the parent corporate entity that owns, governs, and operates specialized technology and education initiatives."
      },
      {
        question: "What companies are part of Portfolix Entreprise?",
        answer: "Portfolix Entreprise operates Portfolio Builders (creative & tech education programs) and Portfolix.Tech (enterprise software, cloud systems, and AI development)."
      },
      {
        question: "Who founded Portfolix Entreprise?",
        answer: "Portfolix Entreprise was incorporated as a private limited technology and education venture company to build sustainable digital properties and talent ecosystems."
      },
      {
        question: "Where is Portfolix Entreprise based?",
        answer: "Portfolix Entreprise is based in Kerala, India, with digital operations and partner collaborations spanning India, Europe, the Middle East, and the Americas."
      },
      {
        question: "What services does Portfolix Entreprise provide?",
        answer: "Portfolix Entreprise provides Enterprise Projects, Business Partnerships, Education Ventures, Technology Projects, Consulting, Business Collaboration, and Portfolio Company Governance."
      },
      {
        question: "Portfolix Entreprise customer reviews",
        answer: "Enterprise partners commend Portfolix Entreprise for ethical collaboration, strategic clarity, transparent reporting, and reliable venture delivery across its brand ecosystem."
      }
    ],
    supportedServices: [
      "Enterprise Projects",
      "Business Partnerships",
      "Education Ventures",
      "Technology Projects",
      "Consulting",
      "Business Collaboration",
      "Portfolio Companies"
    ]
  }
};

export const DOMAIN_TO_BRAND: Record<string, string> = {
  "portfoliobuilders.reviews": "portfolio-builders",
  "www.portfoliobuilders.reviews": "portfolio-builders",
  "portfoliobuilders.local": "portfolio-builders",
  
  "portfolixtech.reviews": "portfolix-tech",
  "www.portfolixtech.reviews": "portfolix-tech",
  "portfolixtech.local": "portfolix-tech",
  
  "portfolixentreprise.reviews": "portfolix-entreprise",
  "www.portfolixentreprise.reviews": "portfolix-entreprise",
  "portfolixentreprise.local": "portfolix-entreprise",
  
  // Local development host aliases
  "pb.localhost:3005": "portfolio-builders",
  "tech.localhost:3005": "portfolix-tech",
  "entreprise.localhost:3005": "portfolix-entreprise",
  "localhost:3005": "portfolio-builders",
  "127.0.0.1:3005": "portfolio-builders"
};

export function getBrandByDomain(domain?: string | null): BrandConfig {
  if (!domain) {
    return BRANDS["portfolio-builders"];
  }

  const cleanDomain = domain.toLowerCase().replace(/:\d+$/, "");
  const slug = DOMAIN_TO_BRAND[domain.toLowerCase()] || DOMAIN_TO_BRAND[cleanDomain];

  if (slug && BRANDS[slug]) {
    return BRANDS[slug];
  }

  if (BRANDS[domain]) {
    return BRANDS[domain];
  }

  return BRANDS["portfolio-builders"];
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(BRANDS);
}
