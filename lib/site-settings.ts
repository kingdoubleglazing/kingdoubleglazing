// Sync, client-safe — only JSON imports, no fs/promises
import type { Settings } from '@/lib/types'

import settingsJson from '@/content/settings/settings.json'

export const getSettings = (): Settings => settingsJson as Settings

// Backwards-compatible aliases — both return the full Settings object
export const getSiteSettings = getSettings
export const getNavigation = getSettings
