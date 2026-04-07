import Link from 'next/link'
import { showerScreensNav } from '@/data/nav'

export default function ShowerScreensLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav
        aria-label="Shower screens sub-navigation"
        className="bg-surface-container-low"
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {showerScreensNav.map(({ label, href }) => (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  className="font-headline text-xs font-semibold uppercase tracking-wider text-on-surface/70 px-3 py-1.5 hover:text-on-surface hover:bg-surface-container transition-colors duration-150 whitespace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {children}
    </div>
  )
}
