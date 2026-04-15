export default async function ConfirmSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; phone?: string }>
}) {
  const { name, phone } = await searchParams

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div
          className="font-display text-primary-container leading-none mb-6"
          style={{ fontSize: 'clamp(4rem, 16vw, 8rem)' }}
          aria-hidden="true"
        >
          ✓
        </div>

        <h1
          className="font-display uppercase text-white leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Quote confirmed.
        </h1>

        <p className="font-sans text-base text-white/65 leading-relaxed mb-10">
          {name ? `${name} has` : 'The client has'} received their confirmation email.
          They&apos;re expecting your call.
        </p>

        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 bg-primary-container text-black font-headline text-base font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-yellow-300 transition-colors duration-150"
          >
            Call {name ?? 'them'} now — {phone}
          </a>
        )}
      </div>
    </div>
  )
}
