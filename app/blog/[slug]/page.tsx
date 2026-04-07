import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // TODO: Phase 12 — read from MDX frontmatter
  const { slug } = await params
  void slug
  return {}
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // TODO: Phase 12 — MDX rendering
  void slug
  notFound()
}
