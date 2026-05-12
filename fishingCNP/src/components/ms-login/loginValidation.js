/**
 * Validation identifiants — alignée sur un flux type Microsoft (e-mail, téléphone, Skype).
 */
export function validateIdentifier(raw) {
  const value = raw.trim()
  if (!value) {
    return 'Entrez votre adresse e-mail, votre numéro de téléphone ou votre identifiant Skype.'
  }
  if (value.includes('@')) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    if (!ok) {
      return 'Ce format d’adresse e-mail ne semble pas correct.'
    }
  }
  return null
}

export function validatePassword(raw) {
  const value = raw.trim()
  if (!value) {
    return 'Entrez votre mot de passe.'
  }
  return null
}
