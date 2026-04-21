import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { footerNav } from '@/data/nav'
import { siteConfig } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="King Double Glazing — home" className="inline-block mb-4">
              <Image
                src={siteConfig.logos.dark}
                alt="King Double Glazing"
                width={222}
                height={87}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-white mb-4 leading-relaxed">
              Stop. Don&apos;t Overpay.<br />
              Melbourne&apos;s retrofit window specialists.<br />
              We&apos;ll beat any genuine quote by 30%.
            </p>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-primary-container transition-colors duration-150"
                >
                  <Phone size={13} aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-primary-container transition-colors duration-150"
                >
                  <Mail size={13} aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {siteConfig.address.display}
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">Services</h3>
            <ul className="space-y-2">
              {footerNav.services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white hover:text-primary-container transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNav.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white hover:text-primary-container transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/80">
          <p>
            © {new Date().getFullYear()} Brooklyn Glass Pty Ltd t/a King Double Glazing. ABN {siteConfig.abn}. All rights reserved.
          </p>
          <p>10-year warranty on every job.</p>
        </div>
      </div>
    </footer>
  )
}
