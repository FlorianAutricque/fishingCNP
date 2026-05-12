export const STAGE_LABEL_FR = {
  email_entered: 'Email saisi',
  signin_attempted: 'Tentative de connexion',
  completed: 'Exercice terminé',
}

export function stageLabel(stage) {
  return STAGE_LABEL_FR[stage] ?? stage ?? '—'
}
