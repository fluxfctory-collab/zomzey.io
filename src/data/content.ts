import type { ImageSlug } from './images.generated'

/* ------------------------------------------------------------------ */
/* Shared types                                                        */
/* ------------------------------------------------------------------ */

export type Intent = 'promote' | 'earn'
export type ScenarioId = 'books' | 'products' | 'music' | 'apps'
export type RoleKind = 'project' | 'creator' | 'hub' | 'community' | 'agency'
/** Perimeter slot in the desktop scene: top-right, bottom-left, bottom-right. */
export type ParticipantSlot = 'reach' | 'place' | 'community'

export interface Participant {
  slot: ParticipantSlot
  role: RoleKind
  roleLabel: string
  name: string
  reach: string
  image: ImageSlug
  /** What this participant could offer the project — shown in the detail area. */
  detail: string
}

export interface Scenario {
  id: ScenarioId
  label: string
  project: {
    kind: string
    title: string
    line: string
    image: ImageSlug
    /** Larger crop used in the relationship story, when a different photo reads better. */
    storyImage?: ImageSlug
  }
  participants: Participant[]
  /** Participant highlighted when the scene first appears. */
  defaultSlot: ParticipantSlot
  summary: string
  story: {
    explanation: string
    /** Two participants shown in the "Reach in different worlds" story. */
    pair: [ParticipantSlot, ParticipantSlot]
  }
}

/* ------------------------------------------------------------------ */
/* Scenarios (opening scene + relationship stories)                    */
/* All are hypothetical examples — not live listings or endorsements. */
/* ------------------------------------------------------------------ */

export const scenarios: Scenario[] = [
  {
    id: 'books',
    label: 'Books',
    project: {
      kind: 'Book launch',
      title: 'A debut novel',
      line: 'Looking for its first readers',
      image: 'book-pages',
      storyImage: 'reading-aloud',
    },
    participants: [
      {
        slot: 'reach',
        role: 'creator',
        roleLabel: 'Creator',
        name: 'Book reviewer',
        reach: 'Content audience',
        image: 'reader-park',
        detail: 'A reviewer could read an early copy and share an honest take with people who follow their recommendations.',
      },
      {
        slot: 'place',
        role: 'hub',
        roleLabel: 'Shop / Hub',
        name: 'Independent bookshop',
        reach: 'Local shop',
        image: 'bookshop',
        detail: 'A local bookshop could host a launch evening and keep copies where browsers will find them.',
      },
      {
        slot: 'community',
        role: 'community',
        roleLabel: 'Community / Hub',
        name: 'Reading community',
        reach: 'Reading community',
        image: 'reading-group',
        detail: 'A reading group could choose the novel for a session and talk it through together.',
      },
    ],
    defaultSlot: 'place',
    summary: 'One book, three different ways to reach readers: online, on a shop shelf and around a table.',
    story: {
      explanation: 'Discover different ways a story might find readers.',
      pair: ['reach', 'place'],
    },
  },
  {
    id: 'products',
    label: 'Products',
    project: {
      kind: 'Product launch',
      title: 'Handmade ceramics',
      line: 'A small brand’s first collection',
      image: 'potter-hands',
    },
    participants: [
      {
        slot: 'reach',
        role: 'creator',
        roleLabel: 'Creator',
        name: 'Home-studio creator',
        reach: 'Content audience',
        image: 'creator-desk',
        detail: 'A creator could show the pieces in everyday use for an audience that trusts their taste.',
      },
      {
        slot: 'place',
        role: 'hub',
        roleLabel: 'Shop / Hub',
        name: 'Independent retailer',
        reach: 'Local shop',
        image: 'indie-shop',
        detail: 'A shop could give the collection a shelf, so people can see and handle it in person.',
      },
      {
        slot: 'community',
        role: 'community',
        roleLabel: 'Community / Hub',
        name: 'Makers’ market',
        reach: 'Local community',
        image: 'craft-market',
        detail: 'A market community could offer a stall and introduce the brand to regular visitors.',
      },
    ],
    defaultSlot: 'place',
    summary: 'A new product can be discovered on screen and picked up in a shop.',
    story: {
      explanation: 'Combine content discovery with a physical point of contact.',
      pair: ['reach', 'place'],
    },
  },
  {
    id: 'music',
    label: 'Music',
    project: {
      kind: 'New release',
      title: 'A songwriter’s EP',
      line: 'With a local launch show',
      image: 'guitarist',
    },
    participants: [
      {
        slot: 'reach',
        role: 'creator',
        roleLabel: 'Creator',
        name: 'Music creator',
        reach: 'Listening audience',
        image: 'home-studio',
        detail: 'A music creator could feature the release in a session, a review or a playlist video.',
      },
      {
        slot: 'place',
        role: 'hub',
        roleLabel: 'Venue / Hub',
        name: 'Small venue',
        reach: 'Live audience',
        image: 'small-venue',
        detail: 'A venue could offer a support slot or an intimate launch night.',
      },
      {
        slot: 'community',
        role: 'community',
        roleLabel: 'Community / Hub',
        name: 'Fan community',
        reach: 'Fan community',
        image: 'gig-crowd',
        detail: 'A fan community could share the release and turn up for the show.',
      },
    ],
    defaultSlot: 'place',
    summary: 'A release can travel through listeners online and a room full of people.',
    story: {
      explanation: 'Explore both online listening and in-person audiences.',
      pair: ['place', 'community'],
    },
  },
  {
    id: 'apps',
    label: 'Apps',
    project: {
      kind: 'App launch',
      title: 'A study planner app',
      line: 'Built for busy students',
      image: 'phone-app',
    },
    participants: [
      {
        slot: 'reach',
        role: 'creator',
        roleLabel: 'Creator',
        name: 'Tech reviewer',
        reach: 'Content audience',
        image: 'tech-podcast',
        detail: 'A reviewer could walk through the app and explain who it suits.',
      },
      {
        slot: 'place',
        role: 'hub',
        roleLabel: 'Educator / Hub',
        name: 'Workshop educator',
        reach: 'Learning community',
        image: 'workshop',
        detail: 'An educator could demonstrate the app in a workshop where it solves a real problem.',
      },
      {
        slot: 'community',
        role: 'community',
        roleLabel: 'Community / Hub',
        name: 'Niche community',
        reach: 'Online community',
        image: 'meetup',
        detail: 'A focused community could try the app and share practical feedback.',
      },
    ],
    defaultSlot: 'reach',
    summary: 'An app makes sense fastest when someone shows it to the people it helps.',
    story: {
      explanation: 'Bring a demonstration to people likely to understand its value.',
      pair: ['reach', 'place'],
    },
  },
]

export const scenarioById = Object.fromEntries(scenarios.map((s) => [s.id, s])) as Record<ScenarioId, Scenario>

/* ------------------------------------------------------------------ */
/* Collaboration process                                               */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    title: 'Discover',
    text: 'Find people, places or opportunities relevant to your project.',
    artefactLabel: 'Example search',
    artefact: ['Independent bookshop', 'Reading community'],
  },
  {
    title: 'Connect',
    text: 'Explain what you need or what you can offer.',
    artefactLabel: 'Example brief',
    artefact: ['Launch evening for a debut novel', 'Around 40 guests, early spring'],
  },
  {
    title: 'Agree',
    text: 'Make the scope, price and delivery expectations clear.',
    artefactLabel: 'Example agreed deliverables',
    artefact: ['One hosted launch evening', 'Copies displayed for four weeks'],
  },
  {
    title: 'Deliver',
    text: 'Complete the work and provide the agreed evidence.',
    artefactLabel: 'Example evidence',
    artefact: ['Event photos', 'Display confirmation'],
  },
  {
    title: 'Review and complete',
    text: 'Review delivery and follow the platform’s completion process.',
    artefactLabel: 'Example next step',
    artefact: ['Buyer reviews delivery', 'Completion follows platform policy'],
  },
] as const

/* ------------------------------------------------------------------ */
/* Explorer example data (local only — not live ZOMZEY members)        */
/* ------------------------------------------------------------------ */

export type Where = 'online' | 'in-person'

export const whereLabels: Record<Where, string> = {
  online: 'Online',
  'in-person': 'In person',
}

export type ProfileCategory = 'creators' | 'shops' | 'music' | 'agencies'
export type OpportunityCategory = ScenarioId

export interface ExampleProfile {
  id: string
  name: string
  role: RoleKind
  type: string
  category: ProfileCategory
  where: Where[]
  reach: string
  image: ImageSlug
  summary: string
  offers: string[]
  keywords: string
}

export interface ExampleOpportunity {
  id: string
  title: string
  category: OpportunityCategory
  where: Where[]
  seeking: string
  status: string
  image: ImageSlug
  summary: string
  wants: string[]
  keywords: string
}

export const profileCategories: { id: 'all' | ProfileCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'creators', label: 'Creators' },
  { id: 'shops', label: 'Shops and communities' },
  { id: 'music', label: 'Music and venues' },
  { id: 'agencies', label: 'Agencies' },
]

export const opportunityCategories: { id: 'all' | OpportunityCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'books', label: 'Books' },
  { id: 'products', label: 'Products' },
  { id: 'music', label: 'Music' },
  { id: 'apps', label: 'Apps' },
]

export const exampleProfiles: ExampleProfile[] = [
  {
    id: 'book-reviewer',
    name: 'Book reviewer example',
    role: 'creator',
    type: 'Creator',
    category: 'creators',
    where: ['online'],
    reach: 'Content audience',
    image: 'reader-park',
    summary: 'Reviews new fiction and shares reading recommendations with followers.',
    offers: ['Written or video review', 'Mention in a monthly reading round-up'],
    keywords: 'books book review reviewer reading fiction novel content creator',
  },
  {
    id: 'tech-podcast',
    name: 'Tech podcast example',
    role: 'creator',
    type: 'Creator',
    category: 'creators',
    where: ['online'],
    reach: 'Listening audience',
    image: 'tech-podcast',
    summary: 'Talks through useful new apps and tools in a regular show.',
    offers: ['Walkthrough segment', 'Interview with the founder'],
    keywords: 'apps app tech technology podcast audio reviewer tools creator',
  },
  {
    id: 'bookshop',
    name: 'Independent bookshop example',
    role: 'hub',
    type: 'Shop / Hub',
    category: 'shops',
    where: ['in-person'],
    reach: 'Local shop',
    image: 'bookshop',
    summary: 'A neighbourhood bookshop with room for small launch events.',
    offers: ['Launch evening', 'Front-of-shop display'],
    keywords: 'books bookshop bookstore shop store local events place',
  },
  {
    id: 'makers-market',
    name: 'Makers’ market example',
    role: 'community',
    type: 'Community / Hub',
    category: 'shops',
    where: ['in-person'],
    reach: 'Local community',
    image: 'craft-market',
    summary: 'A regular market where independent makers meet local shoppers.',
    offers: ['Market stall', 'Feature in the market newsletter'],
    keywords: 'products market makers craft handmade community stall local',
  },
  {
    id: 'small-venue',
    name: 'Small music venue example',
    role: 'hub',
    type: 'Venue / Hub',
    category: 'music',
    where: ['in-person'],
    reach: 'Live audience',
    image: 'small-venue',
    summary: 'An intimate room that books emerging acts and launch nights.',
    offers: ['Support slot', 'Launch night booking'],
    keywords: 'music venue live gig stage performance band musician place',
  },
  {
    id: 'talent-agency',
    name: 'Talent agency example',
    role: 'agency',
    type: 'Agency',
    category: 'agencies',
    where: ['online', 'in-person'],
    reach: 'Represented talent',
    image: 'agency-meeting',
    summary: 'Represents creators and performers and can coordinate several at once.',
    offers: ['Multi-creator campaign', 'Talent shortlist for an event'],
    keywords: 'agency agencies talent represented creators performers campaign',
  },
]

export const exampleOpportunities: ExampleOpportunity[] = [
  {
    id: 'debut-novel',
    title: 'Debut novel launch example',
    category: 'books',
    where: ['online'],
    seeking: 'Reviewers and reading groups',
    status: 'Open to proposals',
    image: 'book-pages',
    summary: 'An independent author is looking for honest reviews and reading-group sessions around a spring launch.',
    wants: ['Early-copy review', 'Reading-group discussion'],
    keywords: 'books book novel author review reviewers reading groups',
  },
  {
    id: 'picture-book',
    title: 'Picture book reading example',
    category: 'books',
    where: ['in-person'],
    seeking: 'Bookshop or library readings',
    status: 'Open to proposals',
    image: 'bookshop',
    summary: 'A children’s author would like to read at bookshops and family events.',
    wants: ['Story-time reading', 'Signed copies on display'],
    keywords: 'books children picture book reading bookshop library family events',
  },
  {
    id: 'ceramics',
    title: 'Ceramics collection example',
    category: 'products',
    where: ['in-person'],
    seeking: 'Stockists and market stalls',
    status: 'Open to proposals',
    image: 'potter-hands',
    summary: 'A small ceramics brand wants a few shops and markets to show its first collection.',
    wants: ['Shelf space or display', 'Market stall introduction'],
    keywords: 'products product ceramics handmade shop retail stockist market',
  },
  {
    id: 'kitchen-demo',
    title: 'Kitchen product demo example',
    category: 'products',
    where: ['online'],
    seeking: 'Demonstration content',
    status: 'Open to proposals',
    image: 'creator-desk',
    summary: 'A new kitchen tool needs creators who can show it working in real recipes.',
    wants: ['Short demonstration video', 'Honest first impressions'],
    keywords: 'products product kitchen demo demonstration content creator video',
  },
  {
    id: 'folk-ep',
    title: 'Folk EP release example',
    category: 'music',
    where: ['online', 'in-person'],
    seeking: 'Venues and session features',
    status: 'Open to proposals',
    image: 'guitarist',
    summary: 'A folk duo is releasing an EP and planning a handful of small shows.',
    wants: ['Support slot or launch night', 'Live session feature'],
    keywords: 'music ep release folk band venue gig session musician',
  },
  {
    id: 'study-app',
    title: 'Study app launch example',
    category: 'apps',
    where: ['online'],
    seeking: 'Educators and tech reviewers',
    status: 'Open to proposals',
    image: 'phone-app',
    summary: 'A study planner app is looking for people who can demonstrate it to students.',
    wants: ['Workshop demonstration', 'Walkthrough review'],
    keywords: 'apps app study students education educator teacher tech review',
  },
]
