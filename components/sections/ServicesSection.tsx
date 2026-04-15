import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCard {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
  featured?: boolean
}

const defaultServices: ServiceCard[] = [
  {
    title: 'Retrofit\nDouble Glazing',
    description: 'We add a second layer of glass to the windows you already have. Same frames. Up to 70% quieter. Up to 50% warmer. From $595/m².',
    href: '/services/#retrofit',
    image: '/hero/hero-double-glazing.webp',
    imageAlt: 'Retrofit double glazing installation Melbourne',
    featured: true,
  },
  {
    title: 'Emergency\nGlass Repair',
    description: 'Broken window right now? We do same-day emergency glass repair across Melbourne.',
    href: '/services/#emergency',
    image: '/hero/hero-emergency.webp',
    imageAlt: 'Emergency glass repair Melbourne',
  },
  {
    title: 'Shower\nScreens',
    description: 'Frameless and semi-frameless toughened glass. One-day install.',
    href: '/services/#shower-screens',
    image: '/hero/hero-shower-screens.webp',
    imageAlt: 'Frameless shower screens Melbourne',
  },
  {
    title: 'Commercial\nGlazing',
    description: 'Offices, retail, and strata. We service Melbourne businesses.',
    href: '/services/#commercial',
    image: '/hero/hero-commercial-glazing.webp',
    imageAlt: 'Commercial glazing Melbourne',
  },
]

interface ServicesSectionProps {
  heading?: string
  services?: ServiceCard[]
}

export function ServicesSection({
  heading = 'All Our Services',
  services = defaultServices,
}: ServicesSectionProps) {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className="font-display uppercase text-on-surface leading-none mb-12 md:mb-16"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 ghost-border">
          {services.map(({ title, description, href, image, imageAlt, featured }) => (
            <Link
              key={href}
              href={href}
              className={[
                'group relative flex flex-col ghost-border overflow-hidden min-h-96',
                featured ? 'border-l-4 border-primary-container' : '',
              ].filter(Boolean).join(' ')}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-inverse-surface/70 group-hover:bg-inverse-surface/60 transition-colors duration-300" />
              <div className="relative flex flex-col p-7 flex-1 z-10">
                <h3 className="font-headline text-xl font-semibold uppercase tracking-wide text-inverse-on-surface leading-tight mb-4">
                  {title.split('\n').map((line, j) => (
                    <span key={j} className="block">{line}</span>
                  ))}
                </h3>
                <p className="font-sans text-sm text-inverse-on-surface/80 leading-relaxed flex-1 mb-8">
                  {description}
                </p>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="text-inverse-on-surface/80 group-hover:text-primary-container transition-colors duration-150 group-hover:translate-x-1 motion-safe:transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
