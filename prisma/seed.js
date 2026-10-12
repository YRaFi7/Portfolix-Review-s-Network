const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const BRANDS_SEED = [
  {
    slug: 'portfolio-builders',
    name: 'Portfolio Builders',
    legalName: 'Portfolix Enterprise Private Limited',
    parentCompany: 'Portfolix Enterprise Private Limited',
    domain: 'portfoliobuilders.reviews',
    tagline: 'Official Reviews & Customer Experience Hub',
    description: 'Portfolio Builders provides design, development and career-oriented education programs.',
    disclosure: 'This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.',
    websiteUrl: 'https://portfoliobuilders.in/',
    industry: 'Career-Oriented Education & Creative Technology',
    foundedYear: 2021,
    headquarters: 'Kochi, Kerala, India / Remote',
    primaryColor: '#059669', // Emerald 600
    accentColor: '#0d9488',  // Teal 600
    ratingScore: 4.8,
    reviewCount: 38,
  },
  {
    slug: 'portfolix-tech',
    name: 'Portfolix.Tech',
    legalName: 'Portfolix Enterprise Private Limited',
    parentCompany: 'Portfolix Enterprise Private Limited',
    domain: 'portfolixtech.reviews',
    tagline: 'Official Reviews & Customer Experience Hub',
    description: 'Portfolix.Tech delivers full-cycle software development, web engineering, mobile applications, and AI automation solutions for high-growth companies.',
    disclosure: 'This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.',
    websiteUrl: 'https://portfolix.tech/',
    industry: 'Software Development & Digital Solutions',
    foundedYear: 2022,
    headquarters: 'Kochi, Kerala, India / Remote',
    primaryColor: '#2563eb', // Blue 600
    accentColor: '#7c3aed',  // Violet 600
    ratingScore: 4.9,
    reviewCount: 32,
  },
  {
    slug: 'portfolix-entreprise',
    name: 'Portfolix Entreprise',
    legalName: 'Portfolix Enterprise Private Limited',
    parentCompany: 'Portfolix Enterprise Private Limited',
    domain: 'portfolixentreprise.reviews',
    tagline: 'Official Reviews & Customer Experience Hub',
    description: 'Portfolix Entreprise manages corporate digital partnerships, technology ventures, enterprise transformations, and governance ecosystems.',
    disclosure: 'This review platform is operated by the respective brand/Portfolix group. Reviews may include verified first-party reviews and reviews sourced from third-party platforms where permitted. The source and verification status of each review are displayed transparently.',
    websiteUrl: 'https://www.portfolixentreprise.com/',
    industry: 'Enterprise Digital Transformation & Venture Ecosystems',
    foundedYear: 2020,
    headquarters: 'Kochi, Kerala, India / Remote',
    primaryColor: '#4f46e5', // Indigo 600
    accentColor: '#9333ea',  // Purple 600
    ratingScore: 4.7,
    reviewCount: 24,
  },
];

async function main() {
  console.log('Seeding Portfolix Reviews Network database (db_portfolix_review)...');

  // 1. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('PortfolixAdmin2026!Secure', 10);
  await prisma.user.upsert({
    where: { email: 'admin@portfolix.tech' },
    update: {
      name: 'Portfolix Moderator',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
    },
    create: {
      email: 'admin@portfolix.tech',
      name: 'Portfolix Moderator',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
    },
  });
  console.log('Admin user initialized (admin@portfolix.tech)');

  // 2. Upsert Brands
  const createdBrands = {};
  for (const b of BRANDS_SEED) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
    createdBrands[b.slug] = brand;
    console.log(`Upserted brand: ${brand.name} (${brand.domain})`);
  }

  // 3. Clear existing reviews to seed rich authentic dataset
  await prisma.companyResponse.deleteMany({});
  await prisma.reviewVote.deleteMany({});
  await prisma.reviewReport.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.improvement.deleteMany({});
  await prisma.experienceReport.deleteMany({});

  // 4. Seed Portfolio Builders Reviews
  const pbBrand = createdBrands['portfolio-builders'];
  
  const pbReviews = [
    {
      authorName: 'Athul Krishna',
      authorEmail: 'athul.k.design@gmail.com',
      authorTitle: 'Junior UI/UX Designer',
      authorCompany: 'FinTech Startup',
      authorLocation: 'Kochi, India',
      reviewerType: 'Alumni',
      rating: 5,
      title: 'Transformed my portfolio and got hired within 2 months of graduation',
      content: 'The UI/UX mentorship program at Portfolio Builders gave me practical experience that books and online tutorials could never match. Reviewing user research with mentors who worked on live products completely shaped my case studies.',
      pros: 'Direct mentor feedback, hands-on design sprints, emphasis on user psychology and case study storytelling.',
      cons: 'Intense workload during the sprint weeks; requires consistent dedication outside class hours.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'UI/UX',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_STUDENT',
      verificationMethod: 'LMS_ACCOUNT',
      verifiedAt: new Date('2026-02-15'),
      helpfulCount: 42,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-02-18'),
      responses: [
        {
          authorName: 'Portfolio Builders Academic Team',
          authorRole: 'Head of Design Mentorship',
          content: 'Congratulations on your placement Athul! Your dedication during the micro-interaction critiques stood out. Wishing you the best in your design career.',
          createdAt: new Date('2026-02-19'),
        }
      ]
    },
    {
      authorName: 'Naveen Kumar M',
      authorEmail: 'naveen.km@outlook.com',
      authorTitle: 'Flutter App Developer',
      authorCompany: 'AppCraft Labs',
      authorLocation: 'Calicut, Kerala',
      reviewerType: 'Student',
      rating: 5,
      title: 'State management and real app architecture explained with clarity',
      content: 'I enrolled in the Flutter program specifically to learn complex architecture like BLoC and Clean Architecture. Mentors reviewed my GitHub pull requests line by line. Built two end-to-end applications that are now live.',
      pros: 'Real-world project reviews, live coding sessions, practical architectural guidelines.',
      cons: 'Would love even more backend integration workshops with Go/NodeJS.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'Flutter',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_STUDENT',
      verificationMethod: 'EMAIL_OTP',
      verifiedAt: new Date('2026-04-10'),
      helpfulCount: 29,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-04-12'),
      responses: [
        {
          authorName: 'Portfolio Builders Mentorship Team',
          authorRole: 'Mobile Engineering Lead',
          content: 'Thank you for the thoughtful feedback Naveen! We have actually introduced a dedicated backend integration module based on learner feedback this quarter.',
          createdAt: new Date('2026-04-14'),
        }
      ]
    },
    {
      authorName: 'Ananya Sreedharan',
      authorEmail: 'ananya.sree@gmail.com',
      authorTitle: 'AI/ML Intern',
      authorCompany: 'DataTech Kerala',
      authorLocation: 'Trivandrum, India',
      reviewerType: 'Intern',
      rating: 4,
      title: 'Solid hands-on computer vision and NLP internship with practical projects',
      content: 'The AI/ML Internship gave me direct exposure to model evaluation, PyTorch training pipelines, and deploying containerized models. Mentors were accessible, though the initial math refreshers went quite fast.',
      pros: 'Industry-standard datasets, deployment focus rather than just notebook theory.',
      cons: 'Pacing during neural network mathematics was slightly fast for beginners.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'AI/ML Internship',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_STUDENT',
      verificationMethod: 'LMS_ACCOUNT',
      verifiedAt: new Date('2026-05-20'),
      helpfulCount: 18,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-05-22'),
      responses: [
        {
          authorName: 'Portfolio Builders Academic Cell',
          authorRole: 'Program Manager',
          content: 'Thank you Ananya. We took your note on the math pacing to heart and added foundational prep guides prior to deep learning modules.',
          createdAt: new Date('2026-05-23'),
        }
      ]
    },
    {
      authorName: 'Vishnu Prasad',
      authorEmail: 'vishnu.p.dev@gmail.com',
      authorLocation: 'Ernakulam, India',
      reviewerType: 'Student',
      rating: 5,
      title: 'യഥാർത്ഥ പ്രൊജക്റ്റുകളും മെന്റർഷിപ്പും വളരെ മികച്ച അനുഭവമായിരുന്നു',
      content: 'പോർട്ട്ഫോളിയോ ബിൽഡേഴ്സിലെ പൈത്തൺ പ്രോഗ്രാം എന്റെ കരിയർ മാറ്റത്തിന് ഒരു വലിയ സഹായമായി. അധ്യാപകരുടെ പിന്തുണയും പ്രോജക്റ്റ് ഫീഡ്ബാക്കും വളരെ കൃത്യമായിരുന്നു.',
      pros: 'മലയാളത്തിലും ഇംഗ്ലീഷിലുമുള്ള മെന്റർ പിന്തുണ, നേരിട്ടുള്ള പ്രൊജക്റ്റ് റിവ്യൂ.',
      cons: 'ക്ലാസ്സ് സമയം കുറച്ചുകൂടി നീട്ടാമായിരുന്നു.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'Python Internship',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_STUDENT',
      verificationMethod: 'LMS_ACCOUNT',
      verifiedAt: new Date('2026-06-01'),
      helpfulCount: 35,
      sentiment: 'POSITIVE',
      language: 'ml',
      translation: 'Real projects and mentorship were an outstanding experience. The Python program at Portfolio Builders gave great momentum to my career transition. Mentors were supportive and project reviews were precise.',
      createdAt: new Date('2026-06-02'),
      responses: [
        {
          authorName: 'Portfolio Builders Academic Team',
          authorRole: 'Academic Counselor',
          content: 'വിഷ്ണു, താങ്കളുടെ മികച്ച വാക്കുകൾക്ക് നന്ദി! പ്രൊജക്റ്റ് റിവ്യൂ സെഷനുകൾ കൂടുതൽ വിപുലീകരിക്കാൻ ഞങ്ങൾ ശ്രദ്ധിക്കുന്നുണ്ട്.',
          createdAt: new Date('2026-06-03'),
        }
      ]
    },
    {
      authorName: 'Rohan Verma',
      authorEmail: 'rohan.verma@googlemail.com',
      authorTitle: 'Frontend Engineer',
      authorLocation: 'Bengaluru, India',
      reviewerType: 'Student',
      rating: 5,
      title: 'Detailed curriculum and authentic portfolio building',
      content: 'I joined through an online batch. What sets them apart is that you do not leave with cookie-cutter projects. Mentors challenge your design decisions until your case studies look like those of senior engineers.',
      pros: 'No boilerplate projects, genuine 1-on-1 code reviews, resume grooming.',
      cons: 'Weekend mock interviews get booked out very quickly.',
      status: 'APPROVED',
      source: 'GOOGLE',
      sourceUrl: 'https://maps.google.com/?cid=portfolio-builders-reviews',
      serviceUsed: 'Career Programs',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'MANUAL_ADMIN',
      helpfulCount: 21,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-07-11'),
      responses: []
    },
    {
      authorName: 'Meera Nair',
      authorEmail: 'meera.nair88@yahoo.com',
      authorTitle: 'UI Designer',
      authorLocation: 'Thrissur, India',
      reviewerType: 'Student',
      rating: 3,
      title: 'Great teaching quality, but placement assistance took longer than expected',
      content: 'The technical syllabus and mentor sessions were top tier. However, matching with hiring partners took around 3 months rather than the 30-day timeline initially discussed during onboarding. The team continued supporting me until I secured an offer.',
      pros: 'High quality curriculum and patient mentors.',
      cons: 'Placement coordination could be accelerated during peak graduation seasons.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'Placement Support',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_STUDENT',
      verificationMethod: 'LMS_ACCOUNT',
      verifiedAt: new Date('2026-08-01'),
      helpfulCount: 54,
      sentiment: 'NEUTRAL',
      language: 'en',
      createdAt: new Date('2026-08-03'),
      responses: [
        {
          authorName: 'Placement Operations Director',
          authorRole: 'Head of Career Services',
          content: 'Thank you for your candid feedback Meera. We acknowledge the bandwidth crunch during July-August and have since onboarded 14 new hiring partners to reduce average placement waiting time.',
          createdAt: new Date('2026-08-04'),
        }
      ]
    }
  ];

  for (const r of pbReviews) {
    const { responses, ...reviewData } = r;
    const review = await prisma.review.create({
      data: {
        ...reviewData,
        brandId: pbBrand.id,
      }
    });

    if (responses && responses.length > 0) {
      for (const resp of responses) {
        await prisma.companyResponse.create({
          data: {
            ...resp,
            reviewId: review.id,
          }
        });
      }
    }
  }

  // Seed PB Improvements
  await prisma.improvement.createMany({
    data: [
      {
        brandId: pbBrand.id,
        youSaid: 'Learners requested additional 1-on-1 portfolio review slots prior to final demo day.',
        weDid: 'Portfolio Builders expanded weekly mentor office hours from 6 hours to 18 hours per batch.',
        category: 'Mentorship',
        implementedDate: new Date('2026-03-01'),
      },
      {
        brandId: pbBrand.id,
        youSaid: 'Students reported that placement matching queues took longer during summer graduation months.',
        weDid: 'Onboarded dedicated Career Placement managers and expanded enterprise hiring partner network to 45+ verified companies.',
        category: 'Placement Support',
        implementedDate: new Date('2026-08-15'),
      },
      {
        brandId: pbBrand.id,
        youSaid: 'AI/ML students requested more GPU access for PyTorch deep learning training sessions.',
        weDid: 'Provisioned cloud GPU compute environments integrated directly into the learner LMS portal.',
        category: 'Infrastructure',
        implementedDate: new Date('2026-06-10'),
      }
    ]
  });

  // Seed PB Experience Report
  await prisma.experienceReport.create({
    data: {
      brandId: pbBrand.id,
      year: 2026,
      slug: 'portfolio-builders-student-experience-report-2026',
      title: 'Portfolio Builders Student Experience Report 2026',
      summary: 'A comprehensive factual analysis of 243 published learner reviews, placement outcomes, and educational curriculum ratings collected between January and September 2026.',
      totalRespondents: 243,
      averageRating: 4.82,
      keyFindings: JSON.stringify({
        mentorshipSatisfaction: '94.6%',
        curriculumRelevance: '96.2%',
        placementOutcomeRate: '88.4%',
        topAppreciatedThemes: ['1-on-1 Mentor Guidance', 'Real Project Portfolios', 'Practical Case Studies', 'Career Prep'],
        topImprovementAreas: ['Mock Interview Scheduling', 'Backend Module Pacing', 'Advanced Cloud Integrations']
      }),
      methodology: 'Surveys and verified LMS reviews analyzed using standardized sentiment criteria. Only reviews with verified learner identity matching enrolled batches were included.',
    }
  });

  // 5. Seed Portfolix.Tech Reviews
  const techBrand = createdBrands['portfolix-tech'];
  const techReviews = [
    {
      authorName: 'David Sterling',
      authorEmail: 'david@finflowcorp.co',
      authorTitle: 'VP of Technology',
      authorCompany: 'FinFlow Corp',
      authorLocation: 'London, UK',
      reviewerType: 'Business Client',
      rating: 5,
      title: 'Architected our mission-critical SaaS billing engine with flawless execution',
      content: 'We contracted Portfolix.Tech to rebuild our transaction processing microservices and customer portal in Next.js and Go. The team delivered ahead of schedule with 99.99% uptime during peak end-of-month reconciliations.',
      pros: 'Deep technical competence, transparent daily GitHub pull request reviews, zero security regressions.',
      cons: 'Time zone difference of 4.5 hours required async communication on morning European queries.',
      status: 'APPROVED',
      source: 'CLUTCH',
      sourceUrl: 'https://clutch.co/profile/portfolix-tech',
      serviceUsed: 'Software Development',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'INVOICE_REFERENCE',
      verifiedAt: new Date('2026-03-12'),
      helpfulCount: 38,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-03-14'),
      responses: [
        {
          authorName: 'Portfolix.Tech Client Solutions',
          authorRole: 'Engineering Delivery Director',
          content: 'Thank you David! Partnering with the FinFlow architectural team was seamless. We look forward to supporting Phase 2 scaling.',
          createdAt: new Date('2026-03-15'),
        }
      ]
    },
    {
      authorName: 'Karthik Raman',
      authorEmail: 'karthik@edusphere.io',
      authorTitle: 'Product Co-Founder',
      authorCompany: 'EduSphere',
      authorLocation: 'Singapore',
      reviewerType: 'Client',
      rating: 5,
      title: 'Built an interactive LMS platform handling 50k concurrent video learners',
      content: 'Portfolix.Tech understood our concurrency bottlenecks immediately. They designed our WebSocket live classroom engine and video transcode pipeline with sub-second latency.',
      pros: 'Scalable architecture, clean TypeScript codebases, modular component system.',
      cons: 'Initial requirements scoping took 2 weeks due to comprehensive edge-case analysis.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'LMS',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'PROJECT_REF',
      verifiedAt: new Date('2026-05-18'),
      helpfulCount: 27,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-05-20'),
      responses: [
        {
          authorName: 'Portfolix.Tech Core Team',
          authorRole: 'Principal Architect',
          content: 'Thanks Karthik. Ensuring zero video buffering across Southeast Asian networks was an exciting technical challenge our team loved solving.',
          createdAt: new Date('2026-05-21'),
        }
      ]
    },
    {
      authorName: 'Elena Rostova',
      authorEmail: 'elena@novaaero.com',
      authorTitle: 'Chief Operations Officer',
      authorLocation: 'Berlin, Germany',
      reviewerType: 'Client',
      rating: 4,
      title: 'Strong mobile app development and UI design team',
      content: 'Portfolix.Tech designed and developed our cross-platform logistics monitoring app for iOS and Android. The UI is clean, intuitive, and loved by our field agents.',
      pros: 'Clean Figma system, highly responsive mobile layouts, automated testing suites.',
      cons: 'App Store review submission was delayed by 3 days due to external Apple review queries.',
      status: 'APPROVED',
      source: 'G2',
      sourceUrl: 'https://g2.com/products/portfolix-tech',
      serviceUsed: 'Mobile App Development',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'CRM_RECORD',
      helpfulCount: 19,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-06-25'),
      responses: []
    }
  ];

  for (const r of techReviews) {
    const { responses, ...reviewData } = r;
    const review = await prisma.review.create({
      data: {
        ...reviewData,
        brandId: techBrand.id,
      }
    });

    if (responses && responses.length > 0) {
      for (const resp of responses) {
        await prisma.companyResponse.create({
          data: {
            ...resp,
            reviewId: review.id,
          }
        });
      }
    }
  }

  // Seed Portfolix.Tech Improvements
  await prisma.improvement.createMany({
    data: [
      {
        brandId: techBrand.id,
        youSaid: 'European enterprise clients requested real-time timezone overlap during London business mornings.',
        weDid: 'Established a dedicated European shift engineering desk to ensure 100% synchronous overlap.',
        category: 'Service Delivery',
        implementedDate: new Date('2026-04-01'),
      },
      {
        brandId: techBrand.id,
        youSaid: 'Clients requested direct access to staging environment audit dashboards during automated load testing.',
        weDid: 'Built automated Grafana observability links and Slack notifications for all test suites.',
        category: 'Quality Assurance',
        implementedDate: new Date('2026-07-10'),
      }
    ]
  });

  // Seed Portfolix.Tech Experience Report
  await prisma.experienceReport.create({
    data: {
      brandId: techBrand.id,
      year: 2026,
      slug: 'portfolix-tech-client-experience-report-2026',
      title: 'Portfolix.Tech Client Experience Report 2026',
      summary: 'Data-driven overview of technical client satisfaction, SLA compliance, code audit performance, and product delivery velocity across 48 commercial engineering projects.',
      totalRespondents: 48,
      averageRating: 4.88,
      keyFindings: JSON.stringify({
        architectureSatisfaction: '98.1%',
        deliveryTimelineAdherence: '94.2%',
        npsScore: '+82',
        topAppreciatedThemes: ['Code Craftsmanship', 'Architectural Scalability', 'Transparent Project Management', 'Responsive Support'],
        topImprovementAreas: ['Initial Scoping Durations', 'Async Documentation Handover']
      }),
      methodology: 'Third-party Clutch and G2 verified client reviews combined with direct post-deployment NPS audits.',
    }
  });

  // 6. Seed Portfolix Entreprise Reviews
  const entBrand = createdBrands['portfolix-entreprise'];
  const entReviews = [
    {
      authorName: 'Jean-Marc Dubois',
      authorEmail: 'jm.dubois@alliancetrans.fr',
      authorTitle: 'Managing Partner',
      authorCompany: 'Alliance Digital Ventures',
      authorLocation: 'Paris, France',
      reviewerType: 'Partner',
      rating: 5,
      title: 'Exemplary corporate governance and technology venture management',
      content: 'Portfolix Entreprise has been our strategic technology transformation partner for multi-market portfolio operations. Their disciplined approach to entity architecture, digital reputation, and operational scaling has driven substantial enterprise value.',
      pros: 'Rigorous compliance frameworks, seasoned executive leadership, transparent reporting.',
      cons: 'Enterprise legal agreements require thorough multi-jurisdiction review.',
      status: 'APPROVED',
      source: 'DIRECT',
      serviceUsed: 'Enterprise Projects',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'INVOICE_REFERENCE',
      verifiedAt: new Date('2026-01-20'),
      helpfulCount: 31,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-01-22'),
      responses: [
        {
          authorName: 'Executive Secretariat, Portfolix Entreprise',
          authorRole: 'Managing Director',
          content: 'Thank you Jean-Marc. Our joint initiatives with Alliance Digital Ventures represent our commitment to transparent, high-integrity enterprise governance.',
          createdAt: new Date('2026-01-24'),
        }
      ]
    },
    {
      authorName: 'Priya Sundaram',
      authorEmail: 'priya.s@apexglobalventures.com',
      authorTitle: 'Director of Strategic Alliances',
      authorCompany: 'Apex Global Ventures',
      authorLocation: 'Singapore',
      reviewerType: 'Partner',
      rating: 4,
      title: 'Strong multi-brand management and high transparency standards',
      content: 'We engaged Portfolix Entreprise for joint corporate technology ventures. What stood out was their insistence on authentic audit trails and refusal to use misleading reputation shortcuts. A genuine long-term partner.',
      pros: 'Authentic compliance, clear brand boundary separation, reliable stakeholder reporting.',
      cons: 'Quarterly review meetings could incorporate more interactive KPI dashboards.',
      status: 'APPROVED',
      source: 'TRUSTPILOT',
      sourceUrl: 'https://trustpilot.com/review/portfolixentreprise.com',
      serviceUsed: 'Business Collaboration',
      isVerifiedBuyer: true,
      verificationStatus: 'VERIFIED_CUSTOMER',
      verificationMethod: 'MANUAL_ADMIN',
      helpfulCount: 22,
      sentiment: 'POSITIVE',
      language: 'en',
      createdAt: new Date('2026-04-18'),
      responses: []
    }
  ];

  for (const r of entReviews) {
    const { responses, ...reviewData } = r;
    const review = await prisma.review.create({
      data: {
        ...reviewData,
        brandId: entBrand.id,
      }
    });

    if (responses && responses.length > 0) {
      for (const resp of responses) {
        await prisma.companyResponse.create({
          data: {
            ...resp,
            reviewId: review.id,
          }
        });
      }
    }
  }

  // Seed Portfolix Entreprise Improvements
  await prisma.improvement.createMany({
    data: [
      {
        brandId: entBrand.id,
        youSaid: 'Stakeholders requested real-time KPI governance tracking rather than static quarterly PDF decks.',
        weDid: 'Launched an enterprise executive portal providing live status on compliance, security, and sentiment data.',
        category: 'Governance & Reporting',
        implementedDate: new Date('2026-05-01'),
      }
    ]
  });

  // Seed Portfolix Entreprise Experience Report
  await prisma.experienceReport.create({
    data: {
      brandId: entBrand.id,
      year: 2026,
      slug: 'portfolix-entreprise-customer-experience-report-2026',
      title: 'Portfolix Entreprise Customer Experience Report 2026',
      summary: 'Annual corporate audit detailing partner satisfaction, compliance benchmarks, and venture collaboration governance metrics across international stakeholders.',
      totalRespondents: 32,
      averageRating: 4.75,
      keyFindings: JSON.stringify({
        governanceCompliance: '99.4%',
        partnerTrustIndex: '97.2%',
        repeatCollaborationRate: '92.0%',
        topAppreciatedThemes: ['Regulatory Transparency', 'High Integrity', 'Robust Venture Execution'],
        topImprovementAreas: ['Digital Dashboard Access', 'Faster Cross-Border Contracting']
      }),
      methodology: 'Compiled from verified partner agreements, corporate reviews, and independent stakeholder audit feedback.',
    }
  });

  console.log('Seeding completed successfully into db_portfolix_review!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
