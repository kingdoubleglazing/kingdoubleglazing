'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

interface FloatingNavProps {
  logoSrc: string
  mainNav: Array<{ label: string; href: string; tinaLabel?: string }>
  ctaNav: { label: string; href: string }
  phone: string
  phoneHref: string
  tinaMainNav?: Array<{ tinaLabel?: string } | undefined>
}

export function FloatingNav({ logoSrc, mainNav, ctaNav, phone, phoneHref, tinaMainNav }: FloatingNavProps) {
  const [show, setShow] = useState(false)
  const lastScrollY = useRef(0)
  const headerVisible = useRef(true)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const header = document.querySelector('header')
    let observer: IntersectionObserver | null = null

    if (header) {
      observer = new IntersectionObserver(
        ([entry]) => {
          headerVisible.current = entry.isIntersecting
          if (entry.isIntersecting) setShow(false)
        },
        { threshold: 0 }
      )
      observer.observe(header)
    }

    const handleScroll = () => {
      const currentY = window.scrollY
      const scrollingUp = currentY < lastScrollY.current

      if (!headerVisible.current && scrollingUp) {
        setShow(true)
      } else if (!scrollingUp) {
        setShow(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 inset-x-0 z-50',
        'transition-transform duration-300 ease-in-out',
        show ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      )}
      inert={!show}
    >
      <nav
        className="backdrop-blur-xl bg-black/92 border-b border-white/8"
        aria-label="Floating navigation"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="King Double Glazing — home"
            >
              <Image
                src={logoSrc}
                alt="King Double Glazing"
                width={130}
                height={41}
                className="h-8 w-auto"
              />
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {mainNav.map(({ label, href, tinaLabel }, i) => (
                <Link
                  key={href}
                  href={href}
                  className="font-headline text-xs font-semibold uppercase tracking-wide px-3 py-2 text-white hover:text-white transition-colors duration-150"
                >
                  <span data-tina-field={tinaLabel ?? tinaMainNav?.[i]?.tinaLabel}>{label}</span>
                </Link>
              ))}
            </div>

            {/* Right cluster: phone + Get Quote + mobile menu */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={phoneHref}
                className="hidden xl:inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-wide text-white hover:text-white transition-colors duration-150"
                aria-label={`Call us: ${phone}`}
              >
                <Phone size={13} aria-hidden="true" />
                {phone}
              </Link>
              <Link
                href={ctaNav.href}
                className="hidden sm:inline-flex items-center font-headline text-xs font-bold uppercase tracking-wide px-4 py-2 bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors duration-150"
              >
                {ctaNav.label}
              </Link>

              {/* Mobile hamburger */}
              <Sheet>
                <SheetTrigger
                  className="lg:hidden inline-flex items-center justify-center p-2 text-white hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
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
                        <Image src={logoSrc} alt="King Double Glazing" width={120} height={47} className="h-10 w-auto" />
                      </Link>
                    </SheetClose>
                    <nav aria-label="Mobile navigation">
                      <ul className="space-y-1 mb-6">
                        {mainNav.map(({ label, href, tinaLabel }, i) => (
                          <li key={href}>
                            <SheetClose asChild>
                              <Link
                                href={href}
                                className="font-headline text-base font-semibold uppercase tracking-wide px-3 py-2.5 block transition-colors duration-150 text-inverse-on-surface hover:text-primary-container"
                              >
                                <span data-tina-field={tinaLabel ?? tinaMainNav?.[i]?.tinaLabel}>{label}</span>
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
      </nav>
    </div>
  )
}
