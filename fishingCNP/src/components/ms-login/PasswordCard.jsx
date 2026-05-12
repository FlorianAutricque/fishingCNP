import { useEffect, useRef, useState } from 'react'
import { MicrosoftLogo } from './MicrosoftLogo.jsx'
import { MsPasswordField } from './MsPasswordField.jsx'
import { MsButton } from './MsButton.jsx'
import { MsLink } from './MsLink.jsx'
import { validatePassword } from './loginValidation.js'

export function PasswordCard({
  email,
  active,
  onSignIn,
  onForgotPassword,
  onUseAnotherAccount,
}) {
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [active])

  const validationError = touched ? validatePassword(password) : null

  const handleSubmit = () => {
    setTouched(true)
    const err = validatePassword(password)
    if (err) return
    onSignIn?.({ email })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <article
      className="shadow-[var(--shadow-ms-card)]"
      aria-labelledby="password-heading"
    >
      <div className="bg-white px-9 pb-10 pt-10 sm:px-10">
        <MicrosoftLogo />

        <p className="mt-5 truncate text-[15px] leading-snug text-ms-muted">
          {email}
        </p>

        <h1
          id="password-heading"
          className="mt-3 text-2xl font-semibold tracking-tight text-ms-heading"
        >
          Entrez le mot de passe
        </h1>

        <MsPasswordField
          ref={inputRef}
          label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          onKeyDown={handleKeyDown}
          error={validationError}
        />

        <div className="mt-7 flex flex-col gap-3">
          <MsLink href="#" onClick={onForgotPassword}>
            J&apos;ai oublié mon mot de passe
          </MsLink>
          <MsLink href="#" onClick={onUseAnotherAccount}>
            Se connecter avec un autre compte
          </MsLink>
        </div>

        <div className="mt-10 flex justify-end">
          <MsButton variant="primary" type="button" onClick={handleSubmit}>
            Se connecter
          </MsButton>
        </div>
      </div>

      <div className="border-t border-[#edebe9] bg-[#f2f2f2] px-9 py-[14px] text-[13px] text-ms-muted sm:px-10">
        Bienvenue !
      </div>
    </article>
  )
}
