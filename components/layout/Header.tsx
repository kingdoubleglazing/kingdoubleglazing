'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const transparentNavRoutes = ['/']

export interface HeaderProps {
  mainNav: Array<{ label: string; href: string }>
  ctaNav: { label: string; href: string }
  phone: string
  phoneHref: string
  logoLight: string
  logoDark: string
}

export function Header({ mainNav, ctaNav, phone, phoneHref, logoLight, logoDark }: HeaderProps) {
  const pathname = usePathname()
  const isTransparent = transparentNavRoutes.includes(pathname)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 80) {
        setIsHidden(false)
      } else if (currentY > lastScrollY.current) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-40 w-full transition-transform duration-300 ease-in-out',
        isTransparent
          ? 'absolute top-0 left-0 right-0 bg-transparent border-transparent'
          : 'sticky top-0 bg-surface border-b border-surface-container-high',
        isHidden && 'lg:translate-y-0 -translate-y-full'
      )}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="King Double Glazing — home">
            <Image
              src={isTransparent ? logoDark : logoLight}
              alt="King Double Glazing"
              width={160}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Main nav — desktop */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {mainNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-headline text-sm font-semibold uppercase tracking-wide px-3 py-2 transition-colors duration-150',
                  isTransparent
                    ? 'text-white hover:text-white'
                    : 'text-on-surface hover:text-on-surface hover:bg-surface-container-low'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={phoneHref}
              className={cn(
                'hidden xl:inline-flex items-center gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide transition-colors duration-150',
                isTransparent ? 'text-white hover:text-white' : 'text-on-surface hover:text-on-surface'
              )}
              aria-label={`Call us: ${phone}`}
            >
              <Phone size={15} aria-hidden="true" />
              {phone}
            </Link>

            <Link
              href={ctaNav.href}
              className="hidden lg:inline-flex items-center font-headline text-sm font-bold uppercase tracking-wide px-5 py-2 bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors duration-150"
            >
              {ctaNav.label}
            </Link>

            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger
                className={cn(
                  'lg:hidden inline-flex items-center justify-center p-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
                  isTransparent
                    ? 'text-white hover:text-white'
                    : 'text-on-surface hover:text-on-surface hover:bg-surface-container-low'
                )}
                aria-label="Open navigation menu"
              >
                <Menu size={22} aria-hidden="true" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription>Site navigation menu</SheetDescription>
                <div className="flex flex-col h-full overflow-y-auto pt-12 pb-8 px-6">
                  <SheetClose asChild>
                    <Link href="/" className="mb-8 inline-block" aria-label="King Double Glazing — home">
                      <Image src={logoDark} alt="King Double Glazing" width={120} height={47} className="h-10 w-auto" />
                    </Link>
                  </SheetClose>
                  <nav aria-label="Mobile navigation">
                    <ul className="space-y-1 mb-6">
                      {mainNav.map(({ label, href }) => (
                        <li key={href}>
                          <SheetClose asChild>
                            <Link
                              href={href}
                              className="font-headline text-base font-semibold uppercase tracking-wide px-3 py-2.5 block transition-colors duration-150 text-inverse-on-surface hover:text-primary-container"
                            >
                              {label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
                    <SheetClose asChild>
                      <Link
                        href={ctaNav.href}
                        className="w-full inline-flex items-center justify-center font-headline text-sm font-bold uppercase tracking-wide px-6 py-3 bg-primary-container text-on-primary-fixed"
                      >
                        {ctaNav.label} →
                      </Link>
                    </SheetClose>
                    <a
                      href={phoneHref}
                      className="font-headline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-inverse-on-surface hover:text-primary-container transition-colors duration-150"
                    >
                      <Phone size={14} aria-hidden="true" />
                      {phone}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
