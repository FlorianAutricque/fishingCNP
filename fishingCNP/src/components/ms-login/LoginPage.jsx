import { useEffect } from 'react'
import { trackNext, trackVisit } from '../../services/trackingClient.js'
import { MsBackground } from './MsBackground.jsx'
import { LoginCard } from './LoginCard.jsx'
import { PasswordCard } from './PasswordCard.jsx'
import { SignInOptionsBar } from './SignInOptionsBar.jsx'
import { LegalFooter } from './LegalFooter.jsx'
import { AwarenessScreen } from '../awareness/AwarenessScreen.jsx'
import { useMsLoginFlow } from './useMsLoginFlow.js'

const panelMotion =
  'transition-[opacity,transform] duration-[480ms] motion-reduce:transition-none motion-reduce:transform-none ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]'

const phaseMotion =
  'transition-[opacity] duration-[520ms] motion-reduce:transition-none ease-[cubic-bezier(0.16,1,0.3,1)] will-change-opacity'

export function LoginPage({ scenario = 'nxlvl' }) {
  const {
    step,
    identifier,
    identifierError,
    passwordCardKey,
    handleIdentifierChange,
    goToPassword,
    goToIdentifier,
    submitCredentials,
  } = useMsLoginFlow()

  const identifierActive = step === 'identifier'
  const passwordActive = step === 'password'
  const awarenessActive = step === 'awareness'
  const loginPhaseActive = step !== 'awareness'

  useEffect(() => {
    void trackVisit()
  }, [])

  const handleIdentifierNext = () => {
    const ok = goToPassword()
    if (ok) void trackNext(identifier.trim())
  }

  return (
    <div className="relative min-h-dvh min-h-[100svh] w-full font-ms antialiased">
      <div className="relative min-h-dvh min-h-[100svh] w-full">
        {/* Flux connexion (Microsoft) */}
        <div
          className={`absolute inset-0 min-h-dvh ${phaseMotion} ${
            loginPhaseActive
              ? 'z-10 opacity-100'
              : 'pointer-events-none z-0 opacity-0'
          }`}
          aria-hidden={awarenessActive}
          inert={awarenessActive ? true : undefined}
        >
          <div className="relative min-h-dvh text-black">
            <MsBackground />

            <div className="relative z-10 flex min-h-dvh min-h-[100svh] flex-col">
              <main className="flex flex-1 flex-col items-center justify-center px-5 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14">
                <div className="ms-enter relative w-full max-w-[440px]">
                  <div className="relative grid w-full grid-cols-1 [&>*]:col-start-1 [&>*]:row-start-1">
                    <div
                      className={`${panelMotion} ${
                        identifierActive
                          ? 'z-10 translate-x-0 opacity-100'
                          : 'pointer-events-none z-0 -translate-x-7 opacity-0 sm:-translate-x-10'
                      }`}
                      aria-hidden={!identifierActive}
                      inert={passwordActive ? true : undefined}
                    >
                      <LoginCard
                        identifier={identifier}
                        onIdentifierChange={handleIdentifierChange}
                        identifierError={identifierError}
                        onNext={handleIdentifierNext}
                        onBack={() => {}}
                      />
                      <div className="ms-enter-delay mt-2">
                        <SignInOptionsBar />
                      </div>
                    </div>

                    <div
                      className={`${panelMotion} ${
                        passwordActive
                          ? 'z-10 translate-x-0 opacity-100'
                          : 'pointer-events-none z-0 translate-x-7 opacity-0 sm:translate-x-10'
                      }`}
                      aria-hidden={!passwordActive}
                      inert={identifierActive ? true : undefined}
                    >
                      <PasswordCard
                        key={passwordCardKey}
                        active={passwordActive}
                        email={identifier.trim()}
                        onSignIn={submitCredentials}
                        onForgotPassword={() => {}}
                        onUseAnotherAccount={goToIdentifier}
                      />
                    </div>
                  </div>
                </div>
              </main>

              <LegalFooter />
            </div>
          </div>
        </div>

        {/* Sensibilisation plein écran */}
        <div
          className={`absolute inset-0 min-h-dvh ${phaseMotion} ${
            awarenessActive
              ? 'z-20 opacity-100'
              : 'pointer-events-none z-0 opacity-0'
          }`}
          aria-hidden={!awarenessActive}
          inert={!awarenessActive ? true : undefined}
        >
          <AwarenessScreen scenario={scenario} />
        </div>
      </div>
    </div>
  )
}
