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

export function trackVisit() {
  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  return postTrack({ type: 'visit', visitorId, userAgent })
}

export function trackNext(email) {
  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  return postTrack({ type: 'next', email, visitorId, userAgent })
}

export function trackSignIn(email) {
  const visitorId = getVisitorId()
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  return postTrack({ type: 'signin', email, visitorId, userAgent })
}

export function trackExerciseCompleted(email) {
  const visitorId = getVisitorId()
  return postTrack({ type: 'complete', email, visitorId })
}
