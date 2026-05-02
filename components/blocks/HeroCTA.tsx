import { Button } from '@/components/ui/Button'

interface HeroCTAProps {
  label: string
  href: string
  tina?: {
    label?: string
    href?: string
  }
}

export function HeroCTA({ label, href, tina }: HeroCTAProps) {
  return (
    <Button as="link" href={href} size="lg" data-tina-field={tina?.label}>
      {label}
    </Button>
  )
}
