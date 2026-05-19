import { useCallback, useMemo, useState } from 'react'
import {
  trackExerciseCompleted,
  trackSignIn,
} from '../../services/trackingClient.js'
import { validateIdentifier } from './loginValidation.js'

export function useMsLoginFlow(scenario) {
  const [step, setStep] = useState('identifier')
  const [identifier, setIdentifier] = useState('')
  const [identifierError, setIdentifierError] = useState(null)
  const [passwordNonce, setPasswordNonce] = useState(0)

  const passwordCardKey = useMemo(
    () => `${identifier.trim()}-${passwordNonce}`,
    [identifier, passwordNonce],
  )

  const handleIdentifierChange = useCallback((value) => {
    setIdentifier(value)
    setIdentifierError(null)
  }, [])

  const goToPassword = useCallback(() => {
    const err = validateIdentifier(identifier)
    setIdentifierError(err)
    if (err) return false
    setPasswordNonce((n) => n + 1)
    setStep('password')
    return true
  }, [identifier])

  const goToIdentifier = useCallback(() => {
    setStep('identifier')
    setIdentifierError(null)
  }, [])

  const submitCredentials = useCallback(
    ({ email }) => {
      setStep('awareness')
      void Promise.resolve()
        .then(() => trackSignIn(email, scenario))
        .then(() => trackExerciseCompleted(email, scenario))
    },
    [scenario],
  )

  return {
    step,
    identifier,
    identifierError,
    passwordCardKey,
    handleIdentifierChange,
    goToPassword,
    goToIdentifier,
    submitCredentials,
  }
}
