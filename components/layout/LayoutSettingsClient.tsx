'use client'

import { useEffect } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingNav } from './FloatingNav'
import { EmergencyBanner } from './EmergencyBanner'
import type { SettingsQuery, SettingsQueryVariables } from '@/tina/__generated__/types'

type TinaSettingsResult = { data: SettingsQuery; query: string; variables: SettingsQueryVariables }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sf(obj: object, field: string): string | undefined {
  try { return (tinaField as (o: any, f: any) => string)(obj, field) || undefined } catch { return undefined }
}

export function LayoutSettingsClient({
  tinaSettings,
  children,
}: {
  tinaSettings: TinaSettingsResult
  children: React.ReactNode
}) {
  const { data } = useTina(tinaSettings)
  const s = data.settings

  const mainNav = (s.mainNav ?? [])
    .filter(Boolean)
    .map(item => ({
      label: item!.label ?? '',
      href: item!.href ?? '',
      tinaLabel: sf(item!, 'label'),
    }))

  const footerServicesNav = (s.footerServicesNav ?? [])
    .filter(Boolean)
    .map(item => ({
      label: item!.label ?? '',
      href: item!.href ?? '',
      tinaLabel: sf(item!, 'label'),
    }))

  const footerCompanyNav = (s.footerCompanyNav ?? [])
    .filter(Boolean)
    .map(item => ({
      label: item!.label ?? '',
      href: item!.href ?? '',
      tinaLabel: sf(item!, 'label'),
    }))

  const ctaNav = { label: s.ctaNav?.label ?? '', href: s.ctaNav?.href ?? '/instant-estimate/' }

  useEffect(() => {
    if (typeof window === 'undefined' || window === window.parent) return
    if (document.querySelector('[data-tina-field]')) {
      window.parent.postMessage({ type: 'quick-edit', value: true }, window.location.origin)
    }
  }, [s])

  return (
    <>
      <EmergencyBanner />
      <FloatingNav
        logoSrc={s.logos?.dark ?? ''}
        mainNav={mainNav}
        ctaNav={ctaNav}
        phone={s.phone ?? ''}
        phoneHref={s.phoneHref ?? ''}
        tinaMainNav={mainNav}
      />
      <div className="relative flex flex-col flex-1">
        <Header
          mainNav={mainNav}
          ctaNav={ctaNav}
          phone={s.phone ?? ''}
          phoneHref={s.phoneHref ?? ''}
          logoLight={s.logos?.light ?? ''}
          logoDark={s.logos?.dark ?? ''}
          tinaFields={{
            phone: sf(s, 'phone'),
            ctaLabel: s.ctaNav ? sf(s.ctaNav, 'label') : undefined,
            mainNav,
          }}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer
          settings={{
            phone: s.phone ?? '',
            phoneHref: s.phoneHref ?? '',
            email: s.email ?? '',
            addressDisplay: s.address?.display ?? '',
            logoDark: s.logos?.dark ?? '',
            footerTagline: s.footerTagline ?? undefined,
            footerBio: s.footerBio ?? undefined,
            warrantyBlurb: s.warrantyBlurb ?? undefined,
            legalName: s.legalName ?? undefined,
            abn: s.abn ?? undefined,
            footerServicesHeading: s.footerServicesHeading ?? undefined,
            footerCompanyHeading: s.footerCompanyHeading ?? undefined,
            footerServicesNav,
            footerCompanyNav,
          }}
          tinaFields={{
            footerTagline: sf(s, 'footerTagline'),
            footerBio: sf(s, 'footerBio'),
            phone: sf(s, 'phone'),
            email: sf(s, 'email'),
            addressDisplay: s.address ? sf(s.address, 'display') : undefined,
            warrantyBlurb: sf(s, 'warrantyBlurb'),
            footerServicesHeading: sf(s, 'footerServicesHeading'),
            footerCompanyHeading: sf(s, 'footerCompanyHeading'),
          }}
        />
      </div>
    </>
  )
}
