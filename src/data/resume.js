// Single source of truth for everything on the page.
// Edit here — the components read from this file.

export const profile = {
  name: 'Pranav Tetali',
  title: 'Data Analyst',
  subtitle: 'Business Intelligence & Analytics',
  location: 'Frisco, TX',
  email: 'ptetali@smu.edu',
  linkedin: 'https://linkedin.com/in/pranavtetali',
  github: 'https://github.com/ptetalicoder',
  resumeFile: 'Pranav_Tetali_Resume.pdf', // lives in /public
  availability: 'Open to data analyst & BI roles',
  summary:
    'Data analyst with an MSBA from SMU Cox and 3 years of experience building SQL data audits, Python ETL pipelines, star schema data models, and executive Power BI and Tableau dashboards; strong record of translating analysis into stakeholder decisions and measurable business outcomes.',
}

// Headline numbers for the hero. Keep to four — they read as a row.
export const stats = [
  { value: '3', label: 'Years in analytics' },
  { value: '30K+', label: 'Records audited' },
  { value: '5,000+', label: 'Players modeled' },
  { value: '500+', label: 'Contracts parsed' },
]

export const skillGroups = [
  {
    name: 'Languages & Querying',
    items: ['SQL', 'Python', 'DAX', 'Excel'],
  },
  {
    name: 'Visualization & BI',
    items: ['Power BI', 'Tableau'],
  },
  {
    name: 'Data Engineering',
    items: [
      'ETL Pipelines',
      'Data Modeling (Star Schema)',
      'Alteryx',
      'Microsoft Fabric',
      'Databricks',
    ],
  },
  {
    name: 'Analytics & Modeling',
    items: [
      'Regression & Predictive Modeling',
      'Statistical Analysis',
      'K-means Clustering',
      'RAG / NL-to-SQL',
    ],
  },
  {
    name: 'Platforms & Process',
    items: ['AWS', 'Jira', 'Agile Development'],
  },
]

export const certifications = [
  'AWS Cloud Technical Essentials',
  'Tools for Data Science',
  'Python for Data Science',
  'AI & Development',
]

export const experience = [
  {
    company: 'Mollycoddle',
    role: 'Independent Developer',
    location: 'Remote / Self-directed',
    period: 'May 2026 – Present',
    tags: ['React Native', 'Expo', 'Cloudflare Workers', 'Claude API'],
    bullets: [
      'Designed and built Mollycoddle, a React Native/Expo iOS and Android app for tracking pet medicines and vaccinations, following a self-documented SDLC from requirements through local notification scheduling and dose history.',
      'Built a serverless extraction pipeline (Cloudflare Workers + Anthropic Claude API) that reads photographed or PDF vaccination and medication records, auto-populates structured data, and reconciles it against existing records instead of duplicating them.',
      'Shipped beta builds to test users via EAS Update, with the full project version-controlled on GitHub.',
    ],
  },
  {
    company: 'Epic Sales Partners',
    role: 'Data Analytics Consultant',
    location: 'Irving, TX',
    period: 'Jan 2026 – May 2026',
    tags: ['Python', 'Power BI', 'DAX', 'Star Schema'],
    bullets: [
      'Led a 4-person team to build a broker contract analytics platform for a $1B+ retail food brokerage, using 10 years of shipment and commission data to model vendor performance and provide C-Suite visibility into broker relationships.',
      'Engineered a Python pipeline to extract and standardize 500+ broker agreements across 3 product categories from PDFs, outputting a star schema covering commission, retailer networks, zone coverage, and contract metadata.',
      'Developed an executive Power BI dashboard with DAX measures and What-If parameters linking contract metadata to financials, creating visibility into vendor performance against targets across the initial 90-day revenue lifecycle.',
    ],
  },
  {
    company: 'Revature',
    role: 'Business Systems & QA Analyst',
    location: 'Reston, VA',
    period: 'Sep 2024 – May 2025',
    tags: ['Agile', 'Jira', 'AWS', 'Automation'],
    bullets: [
      'Owned creation and prioritization of 15 user stories per sprint for customer-facing features; aligned backlog with business goals across 12 sprints, maintaining a 98% on-time delivery rate.',
      'Analyzed 500+ usability assessments, surfacing insights that influenced feature prioritization decisions and contributed to a 50% reduction in user drop-off.',
      'Overhauled defect logging and capture through structured root cause analysis and Jira-based tracking workflows, closing gaps in how QA, development, and product teams tracked and triaged issues.',
      'Automated recurring data collection and centralized performance reporting on AWS, reducing QA cycle time by 40% and cutting manual reporting overhead by 72 hours per week for a team of 10.',
    ],
  },
  {
    company: 'Qualinfotech Solutions Inc.',
    role: 'Data Analyst',
    location: 'Dallas, TX',
    period: 'Aug 2022 – Sep 2024',
    tags: ['SQL', 'Python ETL', 'Data Quality', 'AWS'],
    bullets: [
      'Audited 30,000+ records across 3 databases using SQL to surface duplicate entries and errors; implemented validation rules and process improvements that increased data accuracy by 15% and cut executive reporting errors by 30%.',
      'Built a Python ETL pipeline validating data across 3 source systems, resolving 20+ schema mismatches; reduced manual data preparation time by 35% and migrated cleanly from Excel to AWS DocumentDB.',
    ],
  },
]

export const projects = [
  {
    name: 'Mollycoddle — AI Document Extraction for Pet Health Records',
    period: 'May 2026 – Present',
    blurb:
      "A cross-platform mobile app that turns photographed or scanned health records into structured, deduplicated data. Built and shipped solo, from the extraction backend to the app in testers' hands.",
    bullets: [
      'Built a schema-constrained extraction service on Cloudflare Workers that parses photos and PDFs of vaccination sheets and medication labels into validated JSON records, keeping the API credentials server-side rather than in the client.',
      'Designed a review-and-reconcile flow that matches extracted records against existing entries and defaults to updating rather than duplicating, with per-record override, so bulk imports do not fragment a pet\'s history.',
      'Modeled dose scheduling, vaccination due dates, and product expiration as separate date logics over a shared day-math layer, driving reminder notifications and overdue flagging.',
      'Shipped to real testers on Android via internal distribution, with iOS TestFlight in progress.',
    ],
    tags: ['Document Extraction', 'JSON Schema', 'Claude API', 'Cloudflare Workers', 'React Native'],
    links: [{ label: 'View source on GitHub', href: 'https://github.com/ptetalicoder/mollycoddle' }],
    media: [
      { src: 'projects/mollycoddle/pets-list.png', caption: 'Home screen pet list', type: 'image' },
      { src: 'projects/mollycoddle/pet-detail.png', caption: 'Pet detail with medicines and vaccinations', type: 'image' },
      { src: 'projects/mollycoddle/import-medicines.png', caption: 'Import medicines from a photo or PDF', type: 'image' },
      { src: 'projects/mollycoddle/import-vaccinations.png', caption: 'Import vaccinations from a photo or PDF', type: 'image' },
      { src: 'projects/mollycoddle/add-pet.png', caption: 'Add a pet', type: 'image' },
      { src: 'projects/mollycoddle/import-flow-demo.mp4', caption: 'Full import flow demo', type: 'video' },
    ],
  },
  {
    name: 'MLB Scouting & Roster Intelligence Platform',
    period: 'Oct 2025 – Dec 2025',
    blurb:
      'A relational scouting database and analytics dashboard covering every MLB organization, paired with an AI assistant that answers roster questions in plain English.',
    bullets: [
      'Designed a normalized relational database of 5,000+ MLB and minor league players spanning 5 league levels, and built an analytics dashboard with 15+ filterable metrics across player type, season, league level, team, and position.',
      'Developed an AI scouting assistant (RAG via Chroma) with natural-language-to-SQL querying to evaluate trades, call-ups, and roster construction across all 30 MLB organizations.',
    ],
    tags: ['SQL', 'Python', 'RAG', 'Chroma', 'Dashboard'],
    // Add a repo or demo link and the card grows a button.
    links: [
      { label: 'Live demo', href: 'https://mlbscoutingproject-nfie7pch9ajgcoemsrbewu.streamlit.app/' },
      { label: 'View source on GitHub', href: 'https://github.com/ptetalicoder/MLBScoutingProject' },
    ],
    caseStudy: {
      slug: 'mlb-scouting',
      question: [
        "This began as a database-systems course project: design a normalized schema, demonstrate CRUD, write non-trivial queries against it. Baseball was the domain because it has the deepest public data and the most mature public analytics culture of any sport. If you want a schema with real structural problems to solve, five levels of affiliated ball across four seasons will give you plenty.",
        "What pushed it past the assignment was noticing what the finished schema couldn't do. It held up fine. But the interesting problem had stopped being whether the tables were correct and become whether someone who doesn't write SQL could get an answer out of them. A player-development coordinator doesn't want a query interface. They want to ask whether a Double-A bat is ready and get back something they can argue with. Everything after the graded submission — the natural-language query layer, the retrieval-backed scouting assistant, and the trust work that followed — came from chasing that.",
      ],
      data: {
        source: "The MLB Stats API — the league's own public endpoint — for player, team, and 2021–2024 MLB stat lines.",
        problem: [
          "Player and team records, along with 2021–2024 MLB stat lines, come from the MLB Stats API, the league's own public endpoint. The data is clean, but it's built to serve box scores rather than evaluation, and that shaped most of the work.",
          "The advanced metrics aren't in it. wOBA, wRC+, WAR, hard-hit rate — the numbers a front office actually reasons with — come back empty. What you get is counting stats and traditional rates.",
          "Coverage stops at the majors. There's no affiliate-level stat feed at the granularity needed, and no scouting content of any kind. Minor-league stat lines and all 20-80 grades in this project are synthetic and labeled as such throughout the app. The database design and the query layer are the real work; the MiLB numbers are scaffolding.",
          'Even the parts that exist are uneven. The standings endpoint only returns MLB league IDs, so affiliate teams have no games-played baseline. That matters, because playing-time qualifiers ("502 plate appearances") are defined as a rate per team game. Getting a defensible qualifier at every level meant deriving team games from player rows where the standings data didn\'t reach.',
          'The responses are nested JSON, one shape per endpoint. Normalizing that into Player, Team, HitterStats, PitcherStats, and Contract tables, with a consistent player key across four seasons and five league levels, is what made a question like "who are the top qualified hitters at Double-A in 2023" answerable in one query instead of a scripting exercise.',
        ],
      },
      build: {
        approach:
          'Designed a normalized relational database and built an analytics dashboard with 15+ filterable metrics, then layered an AI scouting assistant (RAG via Chroma) with natural-language-to-SQL querying on top.',
        architecture: 'RAG pipeline via Chroma for natural-language-to-SQL querying over the relational database.',
        dataModel:
          'Normalized relational schema — Player, Team, HitterStats, PitcherStats, and Contract tables — with a consistent player key across 4 seasons and 5 league levels.',
      },
      images: [],
      outcome: [
        "The tool does what it set out to do. A plain-English question becomes SQL against a five-level, four-season schema, executes, and returns results, with a retrieval-backed assistant on top for judgment questions. It's been an active talking point in interviews since I built it.",
        'The more useful result came from going back through it as a skeptical user rather than as its author. Three findings:',
        {
          lead: 'The retrieval layer was describing real major leaguers as replacement-level.',
          detail:
            'Advanced metrics like WAR and wRC+ come back empty from the MLB Stats API, and the document builder defaulted missing values to zero. The text the language model actually read said "Wins Above Replacement: 0.00" for players who\'d had good seasons — indistinguishable, to the model, from a genuinely bad year.',
        },
        {
          lead: '"Who had the highest batting average in 2023" returned 2,236 rows.',
          detail:
            'Nothing in the code enforced a row limit or a ranking, and the playing-time qualifier that keeps a 12-at-bat hitter off a leaderboard lived in prose instructions the model was free to ignore.',
        },
        {
          lead: 'Leaderboards pooled every league level.',
          detail:
            'A Single-A season and a major-league season could occupy adjacent bars on the same chart with nothing on screen to distinguish them.',
        },
        'None of these made the application fail. They made it confidently wrong, which is the worse failure mode for a tool meant to inform a roster decision. That audit is what the current work is built around: nulls that render as nulls, playing-time qualifiers enforced in code instead of requested in a prompt, and per-level percentile framing so a comparison across levels either carries its context or doesn\'t get made.',
      ],
    },
  },
  {
    name: 'Workforce & Traffic Analytics Suite',
    period: 'Oct 2025 – Dec 2025',
    blurb:
      'Consolidated three years of fragmented HR data into a single Tableau extract, then used clustering to expose pay equity gaps and quantify statewide infrastructure delay costs.',
    bullets: [
      'Built an Alteryx pipeline consolidating 3 years of fragmented HR and salary data into a 3,100+ record Tableau extract; designed dashboards surfacing compensation gaps by gender and age, and PTO disparities by tenure.',
      'Applied K-means clustering to segment employees by compensation and tenure and visualized $4.7B in TxDOT road delay costs by district, revealing pay equity gaps and infrastructure priorities.',
    ],
    tags: ['Alteryx', 'Tableau', 'K-means', 'Pay Equity'],
    // TODO: Tableau Public link
    links: [],
  },
]

export const education = [
  {
    school: 'Southern Methodist University, Cox School of Business',
    degree: 'Master of Science in Business Analytics',
    location: 'Dallas, TX',
    period: 'May 2026',
    note: 'Cox Consulting Club · Cox Operations and Analytics Club · Cox Indian Professional Network Club · Cox Golf Club',
  },
  {
    school: 'University of Houston, Cullen College of Engineering',
    degree: 'Bachelor of Science, Computer Information Systems',
    location: 'Houston, TX',
    period: 'Dec 2022',
    note: 'Cum Laude · Dean’s Honor List',
  },
]

export const interests = [
  'Saxophone',
  'Tennis',
  'Boxing',
  'Dallas Cowboys',
  'Dallas Mavericks',
  'Golf',
  'Reading',
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
