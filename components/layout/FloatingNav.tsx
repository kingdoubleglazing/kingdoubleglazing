'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
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

            {/* Right: phone + Get Quote */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
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
                className="font-headline text-xs font-bold uppercase tracking-wide px-4 py-2 bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors duration-150"
              >
                {ctaNav.label}
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}
