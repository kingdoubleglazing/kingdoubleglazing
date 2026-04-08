'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone } from 'lucide-react'
import { mainNav, servicesNav } from '@/data/nav'
import { siteConfig } from '@/data/site'
import { transparentNavRoutes } from '@/data/site'
import { Button } from '@/components/ui/Button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const isTransparent = transparentNavRoutes.includes(pathname)

  return (
    <header
      className={cn(
        'z-40 w-full',
        isTransparent
          ? 'absolute top-0 left-0 right-0 bg-transparent border-transparent'
          : 'sticky top-0 bg-surface border-b border-surface-container-high'
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="King Double Glazing — home"
          >
            <Image
              src={isTransparent ? siteConfig.logos.dark : siteConfig.logos.light}
              alt="King Double Glazing"
              width={160}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Main nav — desktop */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                'font-headline text-sm font-semibold uppercase tracking-wide px-3 py-2 transition-colors duration-150',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-on-surface/70 hover:text-on-surface hover:bg-surface-container-low'
              )}
            >
              Home
            </Link>

            {/* Services dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      isTransparent && 'bg-transparent! text-white/80 hover:text-white! hover:bg-white/10! data-[active]:bg-white/10! data-[state=open]:bg-white/10!'
                    )}
                  >
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
                                    className={cn(
                                      'block px-3 py-2 hover:bg-surface-container-low transition-colors duration-150',
                                      'focus:outline-none focus:bg-surface-container-low'
                                    )}
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
              .filter(({ href }) => href !== '/')
              .map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'font-headline text-sm font-semibold uppercase tracking-wide px-3 py-2 transition-colors duration-150',
                    isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-on-surface/70 hover:text-on-surface hover:bg-surface-container-low'
                  )}
                >
                  {label}
                </Link>
              ))}
          </nav>

          {/* CTA — desktop */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={siteConfig.phoneHref}
              className={cn(
                'hidden sm:inline-flex items-center gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide transition-colors duration-150',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-on-surface/70 hover:text-on-surface'
              )}
              aria-label={`Call us: ${siteConfig.phone}`}
            >
              <Phone size={15} aria-hidden="true" />
              {siteConfig.phone}
            </Link>
            <Button as="link" href="/instant-estimate/" size="sm" className="hidden sm:inline-flex">
              Get Quote
            </Button>

            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger
                className={cn(
                  'lg:hidden inline-flex items-center justify-center p-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
                  isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-on-surface/70 hover:text-on-surface hover:bg-surface-container-low'
                )}
                aria-label="Open navigation menu"
              >
                <Menu size={22} aria-hidden="true" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription>Site navigation menu</SheetDescription>

                <div className="flex flex-col h-full overflow-y-auto pt-12 pb-8 px-6">
                  {/* Logo */}
                  <SheetClose asChild>
                    <Link href="/" className="mb-8 inline-block" aria-label="King Double Glazing — home">
                      <Image
                        src={siteConfig.logos.dark}
                        alt="King Double Glazing"
                        width={120}
                        height={47}
                        className="h-10 w-auto"
                      />
                    </Link>
                  </SheetClose>

                  {/* Top-level nav links */}
                  <nav aria-label="Mobile navigation">
                    <ul className="space-y-1 mb-6">
                      {mainNav.map(({ label, href }) => (
                        <li key={href}>
                          <SheetClose asChild>
                            <Link
                              href={href}
                              className="font-headline text-base font-semibold uppercase tracking-wide text-inverse-on-surface/80 hover:text-primary-container px-3 py-2.5 block transition-colors duration-150"
                            >
                              {label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>

                    {/* Services — grouped inline */}
                    {servicesNav.map((group) => (
                      <div key={group.heading} className="mb-5">
                        <p className="font-headline text-xs font-semibold uppercase tracking-widest text-inverse-on-surface/30 px-3 mb-1">
                          {group.heading}
                        </p>
                        <ul className="space-y-0.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <SheetClose asChild>
                                <Link
                                  href={item.href}
                                  className="font-headline text-sm font-semibold uppercase tracking-wide text-inverse-on-surface/70 hover:text-primary-container px-3 py-2 block transition-colors duration-150"
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>

                  {/* Bottom CTAs */}
                  <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
                    <a
                      href={siteConfig.phoneHref}
                      className="font-headline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-inverse-on-surface/70 hover:text-primary-container transition-colors duration-150"
                    >
                      <Phone size={14} aria-hidden="true" />
                      {siteConfig.phone}
                    </a>
                    <SheetClose asChild>
                      <Button as="link" href="/instant-estimate/" size="sm" fullWidth>
                        Get Quote
                      </Button>
                    </SheetClose>
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
