// Re-export sync singleton getters from the client-safe module
export {
  getSiteSettings,
  getNavigation,
  getHomePage,
  getServicesPage,
  getAboutPage,
  getContactPage,
  getWarrantyPage,
  getEstimatePage,
} from '@/lib/site-settings'

// Server-only collection readers (use fs/promises — never import in client components)
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import type { GalleryItem, PricingOption, ProcessStep, FaqItem } from '@/lib/types'

async function readJsonDir<T>(dirName: string): Promise<T[]> {
  const dir = path.join(process.cwd(), 'content', dirName)
  const files = await readdir(dir)
  const items = await Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .sort()
      .map(async f => {
        const raw = await readFile(path.join(dir, f), 'utf-8')
        return JSON.parse(raw) as T
      })
  )
  return items
}

export const getGalleryItems = () => readJsonDir<GalleryItem>('gallery')
export const getPricingOptions = () => readJsonDir<PricingOption>('pricing')
export const getProcessSteps = () => readJsonDir<ProcessStep>('process-steps')
export const getAllFaqs = () => readJsonDir<FaqItem>('faqs')
export async function getFaqs(group: string): Promise<FaqItem[]> {
  const all = await getAllFaqs()
  return all.filter(f => f.group === group).sort((a, b) => a.order - b.order)
}
