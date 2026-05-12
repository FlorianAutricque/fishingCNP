import { forwardRef, useId } from 'react'

export const MsPasswordField = forwardRef(function MsPasswordField(
  {
    label,
    value,
    onChange,
    error,
    autoComplete = 'current-password',
    name = 'password',
    onBlur,
    ...props
  },
  ref,
) {
  const id = useId()
  const invalid = Boolean(error)
  const errorId = `${id}-error`

  return (
    <div className="mt-5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type="password"
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`box-border w-full rounded-none border-0 border-b-2 border-solid bg-[#f0f6fc] px-3 py-[11px] text-[15px] leading-snug text-black outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-[#605e5c] focus-visible:bg-[#e8f3fc] focus-visible:shadow-[inset_0_0_0_1px_rgba(0,103,184,0.35)] ${
          invalid
            ? 'border-[#a4262c] focus-visible:border-[#a4262c]'
            : 'border-ms-blue focus-visible:border-ms-blue-hover'
        }`}
        {...props}
      />
      {invalid ? (
        <p
          id={errorId}
          role="alert"
          className="mt-3 text-[13px] leading-snug text-[#a4262c]"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
})
