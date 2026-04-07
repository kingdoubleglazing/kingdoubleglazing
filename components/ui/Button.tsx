import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps &
  (
    | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a'; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as: 'link'; href: string })
  )

// Design system: I-Beams. Sharp, no bounce, no scale on active.
const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container text-on-primary-fixed font-semibold hover:bg-primary-fixed-dim',
  secondary:
    'bg-inverse-surface text-inverse-on-surface font-semibold hover:bg-primary-fixed-dim hover:text-on-primary-fixed',
  ghost:
    'bg-transparent text-on-surface font-semibold hover:bg-surface-container-low',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

function getClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  extra?: string
) {
  return [
    'inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer select-none font-headline uppercase tracking-wide',
    variantClass[variant],
    sizeClass[size],
    fullWidth ? 'w-full' : '',
    extra ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = getClasses(variant, size, fullWidth, className)

  if ('as' in rest && rest.as === 'link') {
    const { as, href, ...linkProps } = rest as { as: 'link'; href: string }
    return (
      <Link href={href} className={classes} {...(linkProps as object)}>
        {children}
      </Link>
    )
  }

  if ('as' in rest && rest.as === 'a') {
    const { as, href, ...aProps } = rest as {
      as: 'a'
      href: string
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...aProps}>
        {children}
      </a>
    )
  }

  const { as: _as, ...btnProps } = rest as { as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...btnProps}>
      {children}
    </button>
  )
}
