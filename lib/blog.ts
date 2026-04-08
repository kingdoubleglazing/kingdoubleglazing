import fs from 'node:fs'
import path from 'node:path'
import { blogPosts, type BlogPost } from '@/data/blog-posts'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

/** Read raw MDX source for a given slug. Returns null if file doesn't exist. */
export function getBlogPostContent(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

/** Look up post metadata by slug. Returns null for unknown slugs. */
export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

/** Return metadata for a list of slugs, preserving order and skipping unknowns. */
export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined)
}

/** All slugs — used by generateStaticParams. */
export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
