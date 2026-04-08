import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { HeroSection } from '@/components/sections/HeroSection'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers",
  description:
    'Brooklyn Glass Pty Ltd t/a King Double Glazing. Melbourne glaziers with a mission: transparent pricing, no middlemen, no upsells. Meet the team.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <>
      <HeroSection
        badge="Melbourne's Anti-Ripoff Glaziers"
        headlineWhite="About King"
        headlineYellow="Double Glazing"
        subtext="Transparent pricing. No middlemen. No upsells. No surprises."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageAlt="King Double Glazing team — Melbourne glaziers"
      />
    </>
  )
}
