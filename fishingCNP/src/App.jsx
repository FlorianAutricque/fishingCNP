import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/ms-login'
import { DashboardPage } from './dashboard/DashboardPage.jsx'
import { AwarenessScreen } from './components/awareness/AwarenessScreen.jsx'
import { NotFound } from './components/awareness/NotFound.jsx'
import { VALID_SCENARIOS } from './components/awareness/scenarioContent.js'

/**
 * Aiguillage des 3 scénarios de sensibilisation via le paramètre d'URL `?s=`.
 *  - ?s=nxlvl → LoginPage Microsoft, puis AwarenessScreen scenario="nxlvl"
 *  - ?s=rgpd  → LoginPage Microsoft, puis AwarenessScreen scenario="rgpd"
 *  - ?s=cv    → AwarenessScreen scenario="cv" directement (simple clic)
 *  - sinon    → page neutre 404
 */
function ExerciseRouter() {
  const scenario = new URLSearchParams(window.location.search).get('s')

  if (!VALID_SCENARIOS.includes(scenario)) return <NotFound />
  if (scenario === 'cv') return <AwarenessScreen scenario="cv" />
  return <LoginPage scenario={scenario} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ExerciseRouter />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
