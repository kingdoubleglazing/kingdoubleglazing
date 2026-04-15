export default function ConfirmSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div
          className="font-display text-primary-container leading-none mb-8"
          style={{ fontSize: 'clamp(5rem, 20vw, 10rem)' }}
          aria-hidden="true"
        >
          ✓
        </div>
        <h1
          className="font-display uppercase text-white leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Quote confirmed.
        </h1>
        <p className="font-sans text-base text-white/70 leading-relaxed max-w-md mx-auto">
          We&apos;ve sent the client their confirmation email. They&apos;ll hear from Tas within 2 hours to arrange the free in-home assessment.
        </p>
      </div>
    </div>
  )
}
