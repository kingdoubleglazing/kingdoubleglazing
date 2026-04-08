import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

/**
 * MDX component overrides — styles all prose elements to the KDG design system.
 * Passed to <MDXRemote components={...} />.
 * Zero JS, zero external dependencies.
 */
export const BlogProseComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display uppercase leading-[0.9] text-on-surface mt-14 mb-5"
      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-headline font-bold uppercase tracking-wide text-on-surface mt-10 mb-4"
      style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)' }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-headline font-semibold uppercase tracking-widest text-on-surface/80 mt-8 mb-3 text-sm">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-sans text-[1rem] text-on-surface/80 leading-relaxed mb-5">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-on-surface">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-on-surface/70">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 mb-6 pl-0 list-none">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 mb-6 pl-0 list-none counter-reset-[item]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="font-sans text-[1rem] text-on-surface/80 leading-relaxed flex gap-3">
      <span className="shrink-0 mt-[0.35em] w-1.5 h-1.5 bg-primary-container" aria-hidden="true" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="value-ledger px-6 py-5 my-8 font-headline font-semibold text-base text-on-surface/70 leading-snug">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-surface-container-high text-on-surface px-1.5 py-0.5">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-inverse-surface text-inverse-on-surface font-mono text-sm p-6 my-8 overflow-x-auto">
      {children}
    </pre>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold underline underline-offset-2 hover:text-primary-fixed-dim transition-colors duration-150"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-primary font-semibold underline underline-offset-2 hover:text-primary-fixed-dim transition-colors duration-150"
      >
        {children}
      </Link>
    )
  },
  hr: () => (
    <div className="my-12 h-px bg-surface-container-highest" aria-hidden="true" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse font-sans text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-inverse-surface text-inverse-on-surface">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="font-headline text-xs font-semibold uppercase tracking-widest text-left px-4 py-3">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="font-sans text-on-surface/75 px-4 py-3 border-b border-surface-container-high">
      {children}
    </td>
  ),
}
