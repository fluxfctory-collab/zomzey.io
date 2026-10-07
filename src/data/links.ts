// First-party destinations observed on zomzey.io on 7 October 2026 (spec §10).
// They could not be re-fetched from this build environment; see docs/QA_REPORT.md.
export const links = {
  home: 'https://zomzey.io/',
  directory: 'https://zomzey.io/?ian_zz_directory=1&zzd_view=all',
  opportunities: 'https://zomzey.io/opportunities/',
  signup: 'https://zomzey.io/signup/',
  signin: 'https://zomzey.io/signup/#signin',
  about: 'https://zomzey.io/about/',
  pricing: 'https://zomzey.io/pricing/',
  pioneers: 'https://zomzey.io/what-is-a-pioneer/',
  influencers: 'https://zomzey.io/what-is-an-influencer/',
  hubs: 'https://zomzey.io/what-is-a-hub/',
  agencies: 'https://zomzey.io/agencies/',
  music: 'https://zomzey.io/bands-singers-musicians/',
  protectedPayments: 'https://zomzey.io/zomzey-protected-payments/',
  support: 'https://zomzey.io/zomzey-support-hub/',
  terms: 'https://zomzey.io/terms/',
  privacy: 'https://zomzey.io/privacy/',
  accessibility: 'https://zomzey.io/accessibility/',
} as const

export const participantLinks = [
  { label: 'Pioneers', description: 'People promoting a project', href: links.pioneers },
  { label: 'Influencers', description: 'Creators with an audience', href: links.influencers },
  { label: 'Hubs', description: 'Shops, venues and communities', href: links.hubs },
  { label: 'Agencies', description: 'Represented talent and brands', href: links.agencies },
  { label: 'Music', description: 'Bands, singers and musicians', href: links.music },
] as const
