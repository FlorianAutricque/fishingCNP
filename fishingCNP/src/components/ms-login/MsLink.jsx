export function MsLink({
  href = '#',
  children,
  className = '',
  onClick,
  ...props
}) {
  return (
    <a
      href={href}
      className={`text-ms-blue decoration-transparent underline-offset-2 transition-colors duration-200 hover:text-ms-blue-hover hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ms-blue ${className}`}
      onClick={(e) => {
        if (href === '#') e.preventDefault()
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
