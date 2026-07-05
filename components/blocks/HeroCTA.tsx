import { Button } from '@/components/ui/Button'

interface HeroCTAProps {
  label: string
  href: string
  tinaField?: string
}

export function HeroCTA({ label, href, tinaField }: HeroCTAProps) {
  return (
    <Button as="link" href={href} size="lg" data-tina-field={tinaField}>
      {label}
    </Button>
  )
}
