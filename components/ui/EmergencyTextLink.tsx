import Link from 'next/link'

interface EmergencyTextLinkProps {
  label: string
  href: string
  tinaField?: string
}

export function EmergencyTextLink({ label, href, tinaField }: EmergencyTextLinkProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150 underline underline-offset-4"
    >
      {label}
    </Link>
  )
}
