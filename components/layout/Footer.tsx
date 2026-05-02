import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { getSiteSettings, getNavigation } from '@/lib/site-settings'

type FooterNavItem = { label: string; href: string; tinaLabel?: string }

interface FooterSettings {
  phone: string
  phoneHref: string
  email: string
  addressDisplay: string
  logoDark: string
  footerTagline?: string
  footerBio?: string
  warrantyBlurb?: string
  legalName?: string
  abn?: string
  footerServicesHeading?: string
  footerCompanyHeading?: string
  footerServicesNav: FooterNavItem[]
  footerCompanyNav: FooterNavItem[]
}

interface FooterTinaFields {
  footerTagline?: string
  footerBio?: string
  phone?: string
  email?: string
  addressDisplay?: string
  warrantyBlurb?: string
  footerServicesHeading?: string
  footerCompanyHeading?: string
}

export function Footer({
  settings: settingsProp,
  tinaFields,
}: {
  settings?: FooterSettings
  tinaFields?: FooterTinaFields
} = {}) {
  const staticSettings = getSiteSettings()
  const staticNav = getNavigation()

  const s = settingsProp ?? {
    phone: staticSettings.phone,
    phoneHref: staticSettings.phoneHref,
    email: staticSettings.email,
    addressDisplay: staticSettings.address.display,
    logoDark: staticSettings.logos.dark,
    footerTagline: staticSettings.footerTagline ?? undefined,
    footerBio: staticSettings.footerBio ?? undefined,
    warrantyBlurb: staticSettings.warrantyBlurb ?? undefined,
    legalName: staticSettings.legalName ?? undefined,
    abn: staticSettings.abn ?? undefined,
    footerServicesHeading: staticNav.footerServicesHeading ?? undefined,
    footerCompanyHeading: staticNav.footerCompanyHeading ?? undefined,
    footerServicesNav: staticNav.footerServicesNav as FooterNavItem[],
    footerCompanyNav: staticNav.footerCompanyNav as FooterNavItem[],
  }

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="King Double Glazing — home" className="inline-block mb-4">
              <Image
                src={s.logoDark}
                alt="King Double Glazing"
                width={222}
                height={87}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-white mb-4 leading-relaxed">
              <span data-tina-field={tinaFields?.footerTagline}>{s.footerTagline ?? "Stop. Don't Overpay."}</span>
              <br />
              <span data-tina-field={tinaFields?.footerBio}>{s.footerBio ?? "Melbourne's retrofit window specialists. We'll beat any genuine quote by 30%."}</span>
            </p>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a
                  href={s.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-primary-container transition-colors duration-150"
                >
                  <Phone size={13} aria-hidden="true" />
                  <span data-tina-field={tinaFields?.phone}>{s.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${s.email}`}
                  className="inline-flex items-center gap-2 hover:text-primary-container transition-colors duration-150"
                >
                  <Mail size={13} aria-hidden="true" />
                  <span data-tina-field={tinaFields?.email}>{s.email}</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span data-tina-field={tinaFields?.addressDisplay}>{s.addressDisplay}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              data-tina-field={tinaFields?.footerServicesHeading}
              className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4"
            >
              {s.footerServicesHeading ?? 'Services'}
            </h3>
            <ul className="space-y-2">
              {s.footerServicesNav.map(({ label, href, tinaLabel }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white hover:text-primary-container transition-colors duration-150">
                    <span data-tina-field={tinaLabel}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              data-tina-field={tinaFields?.footerCompanyHeading}
              className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4"
            >
              {s.footerCompanyHeading ?? 'Company'}
            </h3>
            <ul className="space-y-2">
              {s.footerCompanyNav.map(({ label, href, tinaLabel }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white hover:text-primary-container transition-colors duration-150">
                    <span data-tina-field={tinaLabel}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/80">
          <p>
            © {new Date().getFullYear()} {s.legalName}. ABN {s.abn}. All rights reserved.
          </p>
          <p data-tina-field={tinaFields?.warrantyBlurb}>{s.warrantyBlurb ?? '10-year warranty on every job.'}</p>
        </div>
      </div>
    </footer>
  )
}
