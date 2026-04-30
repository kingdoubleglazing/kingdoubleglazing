// Sync, client-safe — only JSON imports, no fs/promises
import type { SiteSettings, Navigation } from '@/lib/types'

import siteJson from '@/content/settings/site.json'
import navJson from '@/content/settings/nav.json'

export const getSiteSettings = (): SiteSettings => siteJson as SiteSettings
export const getNavigation = (): Navigation => navJson as Navigation
