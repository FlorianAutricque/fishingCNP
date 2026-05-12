export function formatFrDateTime(iso) {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date(iso))
  } catch {
    return '—'
  }
}

export function formatCompletionRate(completedFlows, nextClicks) {
  if (!nextClicks) return '—'
  const pct = (completedFlows / nextClicks) * 100
  const rounded = Math.round(pct * 10) / 10
  return `${rounded.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })} %`
}
