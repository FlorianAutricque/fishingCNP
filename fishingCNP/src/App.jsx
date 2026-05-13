import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/ms-login'
import { DashboardPage } from './dashboard/DashboardPage.jsx'
import { AwarenessScreen } from './components/ms-login/AwarenessScreen.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sensibilisation" element={<AwarenessScreen />} />
    </Routes>
  )
}