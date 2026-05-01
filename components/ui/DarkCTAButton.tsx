import Link from 'next/link'

interface DarkCTAButtonProps {
  label: string
  href: string
  tinaField?: string
}

export function DarkCTAButton({ label, href, tinaField }: DarkCTAButtonProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="inline-flex items-center justify-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  )
}
