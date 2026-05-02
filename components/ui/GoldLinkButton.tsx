import Link from 'next/link'

interface GoldLinkButtonProps {
  label: string
  href: string
  tinaField?: string
}

export function GoldLinkButton({ label, href, tinaField }: GoldLinkButtonProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="shrink-0 inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
    >
      {label}
      <span aria-hidden="true" className="text-base leading-none">→</span>
    </Link>
  )
}
