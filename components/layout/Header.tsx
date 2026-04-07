import Link from 'next/link'
import { Phone } from 'lucide-react'
import { mainNav } from '@/data/nav'
import { Button } from '@/components/ui/Button'

type HeaderProps = {
  phone: string
}

export function Header({ phone }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-panel ghost-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="King Double Glazing — home"
          >
            <span className="bg-inverse-surface text-primary-container font-black text-lg px-2 py-0.5">
              KDG
            </span>
            <span className="font-headline font-semibold text-on-surface text-sm leading-tight hidden sm:block uppercase tracking-wide">
              King Double<br />Glazing
            </span>
          </Link>

          {/* Main nav — desktop */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {mainNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/70 px-3 py-2 hover:text-on-surface hover:bg-surface-container-low transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/70 hover:text-on-surface transition-colors duration-150"
              aria-label={`Call us: ${phone}`}
            >
              <Phone size={15} aria-hidden="true" />
              {phone}
            </Link>
            <Button as="link" href="/instant-estimate/" size="sm">
              Get Estimate
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
