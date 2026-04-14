import Image from 'next/image'

export function WarrantyBadge({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-label="10 Year+ Warranty">
      <Image
        src="/warranty.webp"
        alt="10 Year+ Warranty"
        width={140}
        height={140}
        className="w-full h-full object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
      />
    </div>
  )
}
