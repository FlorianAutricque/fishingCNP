const base =
  'inline-flex min-h-[32px] cursor-pointer items-center justify-center border-0 px-6 py-[7px] text-[15px] font-normal leading-none outline-none transition-[background-color,color,transform] duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ms-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  secondary:
    'bg-[#e0e0e0] text-black hover:bg-[#d0d0d0] active:bg-[#c8c8c8]',
  primary:
    'bg-ms-blue text-white hover:bg-ms-blue-hover active:bg-[#004578]',
}

export function MsButton({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
