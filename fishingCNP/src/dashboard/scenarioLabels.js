export const SCENARIO_LABEL_FR = {
  nxlvl: 'NXLVL',
  rgpd: 'RGPD',
  cv: 'CV',
  inconnu: 'Inconnu',
}

export function scenarioLabel(scenario) {
  return SCENARIO_LABEL_FR[scenario] ?? scenario ?? '—'
}

// Onglets de filtrage affichés dans le dashboard.
export const SCENARIO_FILTERS = [
  { key: 'all', label: 'Tous' },
  { key: 'nxlvl', label: 'NXLVL' },
  { key: 'rgpd', label: 'RGPD' },
  { key: 'cv', label: 'CV' },
]
