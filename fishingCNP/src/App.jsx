import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/ms-login'
import { DashboardPage } from './dashboard/DashboardPage.jsx'
import { AwarenessScreenV2 } from './components/ms-login/AwarenessScreenV2.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sensibilisation" element={<AwarenessScreenV2 />} />
    </Routes>
  )
}