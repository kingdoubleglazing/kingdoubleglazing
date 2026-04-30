export const transparentNavRoutes = ['/']

// Re-export from content JSON so TinaCMS edits flow through automatically
import siteJson from '@/content/settings/site.json'
export const siteConfig = siteJson as typeof siteJson & {
  pricing: { retrofitFromPerSqm: number; retrofitFromDisplay: string }
}
