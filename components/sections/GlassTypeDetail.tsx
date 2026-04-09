import Image from 'next/image'

interface Spec {
  label: string
  value: string
}

interface GlassTypeDetailProps {
  id: string
  eyebrow: string
  name: string
  body: string
  specs: Spec[]
  imageSrc: string
  imageAlt: string
  imageLeft?: boolean
}

export function GlassTypeDetail({
  id,
  eyebrow,
  name,
  body,
  specs,
  imageSrc,
  imageAlt,
  imageLeft = false,
}: GlassTypeDetailProps) {
  const image = (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  )

  const content = (
    <div className="flex flex-col justify-center py-4">
      <p className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
        {eyebrow}
      </p>
      <h2
        className="font-display uppercase leading-none text-on-surface mb-6"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        {name}
      </h2>
      <p className="font-sans text-base text-on-surface/65 leading-relaxed mb-8 max-w-lg">
        {body}
      </p>

      {/* Spec pills */}
      <dl className="flex flex-wrap gap-3">
        {specs.map(({ label, value }) => (
          <div
            key={label}
            className="border border-on-surface/15 px-4 py-3 flex flex-col gap-0.5"
          >
            <dt className="font-headline text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-on-surface/40">
              {label}
            </dt>
            <dd className="font-display uppercase text-on-surface leading-none" style={{ fontSize: '1.25rem' }}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )

  return (
    <section id={id} className="bg-surface py-16 md:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {imageLeft ? (
            <>
              {image}
              {content}
            </>
          ) : (
            <>
              {content}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
