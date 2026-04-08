import type { SuburbData } from './suburbs'

export interface FaqItem {
  q: string
  a: string
}

export function buildSuburbFaq(suburb: SuburbData): FaqItem[] {
  return [
    {
      q: `Do you service ${suburb.name}?`,
      a: `Yes — we regularly install retrofit double glazing, shower screens and carry out emergency glass repairs across ${suburb.name} (${suburb.postcode}) and surrounding ${suburb.region} suburbs. Lead time for retrofit work is typically 5–10 business days; emergency call-outs are same-day.`,
    },
    {
      q: `How much does double glazing cost in ${suburb.name}?`,
      a: `Pricing in ${suburb.name} starts from $495/m² for standard double-glazed units and ranges to $1,190/m² for triple glazing with acoustic laminate. A typical ${suburb.name} home with 10–14 windows falls between $4,500 and $12,000 — pane size, glass specification and frame condition are the main variables. Use the Instant Estimate Tool for a firm, itemised price before committing to anything.`,
    },
    {
      q: `Is double glazing worth it in ${suburb.name}?`,
      a: `For most ${suburb.name} homes, yes. Single-pane windows account for 25–35% of home heat loss in Melbourne winters. At current energy prices, most retrofit installations in ${suburb.region} suburbs return the investment within 7–12 years through reduced heating and cooling bills — sooner on properties where acoustic performance is also a driver.`,
    },
    {
      q: `Will double glazing affect my heritage home in ${suburb.name}?`,
      a: `Retrofit double glazing replaces the glass only — the existing frame stays exactly in place. Because no structural work is involved and the exterior appearance is unchanged, most ${suburb.name} heritage overlay properties are exempt from planning permits. We confirm eligibility at measure-up; in almost all cases no permit is required.`,
    },
    {
      q: `How long does installation take in ${suburb.name}?`,
      a: `A standard ${suburb.name} home with 8–14 windows is completed in a single day. We remove the old glass, install factory-sealed double-glazed units, re-seal and clean up before leaving. There is no structural work, no plaster damage, and no return visit required for most jobs.`,
    },
  ]
}
