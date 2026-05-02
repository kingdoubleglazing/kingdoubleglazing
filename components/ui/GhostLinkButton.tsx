import Link from 'next/link'

interface GhostLinkButtonProps {
  label: string
  href: string
  tinaField?: string
}

export function GhostLinkButton({ label, href, tinaField }: GhostLinkButtonProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-surface/30 hover:bg-on-surface/10 transition-colors duration-150"
    >
      {label}
    </Link>
  )
}
