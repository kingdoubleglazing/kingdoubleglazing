import Link from 'next/link'

interface EstimateButtonProps {
  label: string
  href?: string
  tinaField?: string
}

export function EstimateButton({ label, href = '/instant-estimate/', tinaField }: EstimateButtonProps) {
  return (
    <Link
      href={href}
      data-tina-field={tinaField}
      className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-on-primary-fixed/80 transition-colors duration-150"
    >
      {label}
    </Link>
  )
}
