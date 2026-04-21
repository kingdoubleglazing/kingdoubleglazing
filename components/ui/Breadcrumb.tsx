import Link from 'next/link'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Emit BreadcrumbList JSON-LD. Defaults to true. Set false if the parent page already emits it. */
  emitSchema?: boolean
  className?: string
}

/**
 * Accessible breadcrumb navigation with optional JSON-LD schema emission.
 * Uses KDG design tokens — no rounded corners, headline font.
 */
export function Breadcrumb({ items, emitSchema = true, className }: BreadcrumbProps) {
  const schema = emitSchema ? buildBreadcrumbSchema(items) : null

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-headline text-[0.7rem] uppercase tracking-widest text-on-surface">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-x-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-on-surface/60">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-on-surface" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-on-surface transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
