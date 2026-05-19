/**
 * Tracking public — aucune donnée de mot de passe n’est jamais envoyée ni journalisée.
 */
import { getVisitorId } from './visitorId.js'

async function postTrack(payload) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    /* réseau indisponible : ne pas bloquer le flux utilisateur */
  }
}

export function trackVisit(scenario) {
  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  return postTrack({ type: 'visit', visitorId, userAgent, scenario })
}

// export function trackNext(email) {
//   const visitorId = getVisitorId()
//   const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
//   return postTrack({ type: 'next', email, visitorId, userAgent })
// }

export function trackNext(email, scenario) {
  const safeEmail = email?.trim()

  if (!safeEmail) return

  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''

  return postTrack({
    type: 'next',
    email: safeEmail,
    visitorId,
    userAgent,
    scenario,
  })
}

export function trackSignIn(email, scenario) {
  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  return postTrack({ type: 'signin', email, visitorId, userAgent, scenario })
}

export function trackExerciseCompleted(email, scenario) {
  const visitorId = getVisitorId()
  return postTrack({ type: 'complete', email, visitorId, scenario })
}
