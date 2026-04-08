'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { mainNav, servicesNav } from '@/data/nav'
import { Button } from '@/components/ui/Button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

/**
 * FloatingNav — appears on upward scroll only, after the main header has left
 * the viewport (i.e. the hero section is no longer visible). Hides instantly
 * whenever the user scrolls down or the main header re-enters the viewport.
 */
export function FloatingNav() {
  const [show, setShow] = useState(false)
  const lastScrollY = useRef(0)
  const headerVisible = useRef(true)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    // Watch main site header — when it leaves the viewport we can potentially show
    const header = document.querySelector('header')
    let observer: IntersectionObserver | null = null

    if (header) {
      observer = new IntersectionObserver(
        ([entry]) => {
          headerVisible.current = entry.isIntersecting
          // Immediately hide whenever the main header is back in view
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
        show ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'
      )}
      aria-hidden={!show}
    >
      <nav
        className="backdrop-blur-xl bg-black/92 border-b border-white/8"
        aria-label="Floating navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="King Double Glazing — home"
              tabIndex={show ? 0 : -1}
            >
              <Image
                src={siteConfig.logos.dark}
                alt="King Double Glazing"
                width={130}
                height={41}
                className="h-8 w-auto"
              />
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                tabIndex={show ? 0 : -1}
                className="font-headline text-xs font-semibold uppercase tracking-wide px-3 py-2 text-white/70 hover:text-white transition-colors duration-150"
              >
                Home
              </Link>

              {/* Services dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent! text-white/70 hover:text-white! hover:bg-white/10! data-active:bg-white/10! data-[state=open]:bg-white/10! text-xs! font-headline! uppercase! tracking-wide! font-semibold!">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-0 w-140 p-4">
                        {servicesNav.map((group) => (
                          <div key={group.heading}>
                            <p className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface/40 px-3 pb-1 pt-2">
                              {group.heading}
                            </p>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={item.href}
                                      className="block px-3 py-2 hover:bg-surface-container-low focus:outline-none focus:bg-surface-container-low transition-colors duration-150"
                                    >
                                      <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface block">
                                        {item.label}
                                      </span>
                                      <span className="text-xs text-on-surface/50 font-sans normal-case tracking-normal">
                                        {item.description}
                                      </span>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {mainNav
                .filter((item) => item.href !== '/')
                .map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    tabIndex={show ? 0 : -1}
                    className="font-headline text-xs font-semibold uppercase tracking-wide px-3 py-2 text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                ))}
            </div>

            {/* CTA — phone + quote */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={siteConfig.phoneHref}
                tabIndex={show ? 0 : -1}
                className="hidden sm:inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors duration-150"
                aria-label={`Call us: ${siteConfig.phone}`}
              >
                <Phone size={13} aria-hidden="true" />
                {siteConfig.phone}
              </Link>
              <Button
                as="link"
                href="/instant-estimate/"
                size="sm"
                // @ts-expect-error — tabIndex not in Button's prop type but passes through to Link
                tabIndex={show ? 0 : -1}
              >
                Get Quote
              </Button>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}
