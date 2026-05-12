import { useId } from 'react'

export function MsUnderlineField({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  autoComplete = 'username',
  name,
  error,
}) {
  const id = useId()
  const invalid = Boolean(error)
  const errorId = `${id}-error`

  return (
    <div className="mt-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name ?? 'login'}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`box-border w-full border-0 border-b border-solid bg-transparent pb-[7px] pt-1 text-[15px] leading-snug text-black outline-none transition-[border-color,border-width,padding-bottom] duration-200 placeholder:text-[#605e5c] focus:border-b-2 focus:pb-[6px] ${
          invalid
            ? 'border-[#a4262c] focus:border-[#a4262c]'
            : 'border-[#a19f9d] focus:border-ms-blue'
        }`}
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
}
