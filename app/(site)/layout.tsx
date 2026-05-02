import { buildLocalBusinessSchema } from '@/lib/seo/schema/localBusiness'
import { buildWebSiteSchema } from '@/lib/seo/schema/website'
import { getSiteSettings } from '@/lib/content'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { Footer } from '@/components/layout/Footer'
import { EmergencyBanner } from '@/components/layout/EmergencyBanner'
import { FloatingNavWrapper } from '@/components/layout/FloatingNavWrapper'
import { LayoutSettingsClient } from '@/components/layout/LayoutSettingsClient'
import { client } from '@/tina/__generated__/client'

const GTM_ID = 'GTM-KDRL294K'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = getSiteSettings()

  const localBusinessSchema = buildLocalBusinessSchema(settings)
  const webSiteSchema = buildWebSiteSchema(settings)

  const schemaTags = (
    <>
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
    </>
  )

  const gtmNoscript = (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )

  try {
    const tinaSettings = await client.queries.settings({ relativePath: 'settings.json' })
    return (
      <>
        {gtmNoscript}
        {schemaTags}
        <LayoutSettingsClient tinaSettings={tinaSettings}>
          {children}
        </LayoutSettingsClient>
      </>
    )
  } catch {
    return (
      <>
        {gtmNoscript}
        {schemaTags}
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
}
