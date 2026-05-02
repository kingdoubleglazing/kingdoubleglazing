import Link from 'next/link'

interface ServiceCTAButtonProps {
  label: string
  href: string
  tinaField?: string
}

export function ServiceCTAButton({ label, href, tinaField }: ServiceCTAButtonProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="inline-flex items-center gap-2 bg-on-surface text-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-150 shrink-0"
    >
      {label}
    </Link>
  )
}
