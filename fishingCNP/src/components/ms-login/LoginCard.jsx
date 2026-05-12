import { MicrosoftLogo } from './MicrosoftLogo.jsx'
import { MsUnderlineField } from './MsUnderlineField.jsx'
import { MsButton } from './MsButton.jsx'
import { MsLink } from './MsLink.jsx'

export function LoginCard({
  identifier,
  onIdentifierChange,
  identifierError,
  onNext,
  onBack,
}) {
  const handleNext = () => {
    onNext?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <section
      className="bg-white px-9 pb-10 pt-10 shadow-[var(--shadow-ms-card)] sm:px-10 sm:pt-10"
      aria-labelledby="sign-in-heading"
    >
      <MicrosoftLogo />
      <h1
        id="sign-in-heading"
        className="mt-4 text-2xl font-semibold tracking-tight text-ms-heading"
      >
        Se connecter
      </h1>

      <MsUnderlineField
        label="E-mail, téléphone ou identifiant Skype"
        placeholder="E-mail, téléphone ou identifiant Skype"
        value={identifier}
        onChange={(e) => onIdentifierChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        error={identifierError}
      />

      <p className="mt-6 text-[13px] leading-snug text-black">
        Vous n&apos;avez pas encore de compte ?{' '}
        <MsLink href="#">Créez-en un !</MsLink>
      </p>
      <p className="mt-3 text-[13px]">
        <MsLink href="#">Votre compte n&apos;est pas accessible ?</MsLink>
      </p>

      <div className="mt-10 flex flex-wrap justify-end gap-3">
        <MsButton variant="secondary" type="button" onClick={onBack}>
          Retour
        </MsButton>
        <MsButton variant="primary" type="button" onClick={handleNext}>
          Suivant
        </MsButton>
      </div>
    </section>
  )
}
