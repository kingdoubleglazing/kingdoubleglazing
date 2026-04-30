import { buildLocalBusinessSchema } from '@/lib/seo/schema/localBusiness'
import { buildWebSiteSchema } from '@/lib/seo/schema/website'
import { getSiteSettings } from '@/lib/content'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { Footer } from '@/components/layout/Footer'
import { EmergencyBanner } from '@/components/layout/EmergencyBanner'
import { FloatingNavWrapper } from '@/components/layout/FloatingNavWrapper'

const GTM_ID = 'GTM-KDRL294K'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = getSiteSettings()

  const localBusinessSchema = buildLocalBusinessSchema(settings)
  const webSiteSchema = buildWebSiteSchema(settings)

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <EmergencyBanner />
      <FloatingNavWrapper />
      <div className="relative flex flex-col flex-1">
        <HeaderWrapper />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
