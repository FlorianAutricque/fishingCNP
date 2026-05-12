import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchDashboardSnapshot,
  resetDashboardData,
} from '../services/dashboardApi.js'
import { DashboardStatCard } from './DashboardStatCard.jsx'
import { ParticipantsTable } from './ParticipantsTable.jsx'
import { ConfirmDialog } from './ConfirmDialog.jsx'
import { formatCompletionRate, formatFrDateTime } from './formatters.js'

function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"
      />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3Zm-1 17.93c-3.95-.49-7-4.17-7-8.84V6.39l7-2.61 7 2.61v4.7c0 4.67-3.05 8.35-7 8.84Z"
      />
    </svg>
  )
}

function IconTimeline() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z"
      />
    </svg>
  )
}

export function DashboardPage() {
  const [loadingData, setLoadingData] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [snapshot, setSnapshot] = useState(null)
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)
  const [resetBusy, setResetBusy] = useState(false)

  const load = useCallback(async ({ refresh = false } = {}) => {
    if (refresh) setLoadingData(true)
    setLoadError(null)
    try {
      const data = await fetchDashboardSnapshot()
      setSnapshot(data)
    } catch {
      setLoadError(
        'Impossible de charger les données. Vérifiez que le serveur Vite est démarré.',
      )
    } finally {
      setLoadingData(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void load()
    })
  }, [load])

  const stats = snapshot?.stats
  const participants = snapshot?.participants ?? []

  const completionLabel = useMemo(() => {
    if (!stats) return '—'
    return formatCompletionRate(stats.completedFlows ?? 0, stats.nextClicks ?? 0)
  }, [stats])

  const handleReset = async () => {
    setResetBusy(true)
    try {
      await resetDashboardData()
      setConfirmResetOpen(false)
      await load({ refresh: true })
    } catch {
      setLoadError('La réinitialisation a échoué.')
    } finally {
      setResetBusy(false)
    }
  }

  if (loadingData && !snapshot) {
    return (
      <div className="dark flex min-h-dvh min-h-[100svh] items-center justify-center bg-slate-950 font-ms text-slate-400">
        <p className="text-[14px]">Chargement du tableau de bord…</p>
      </div>
    )
  }

  return (
    <div className="dark min-h-dvh min-h-[100svh] bg-slate-950 font-ms text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(ellipse_70%_55%_at_90%_40%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-12">
        <header className="dash-header-enter flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-sky-300">
              Pilotage exercice
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[34px]">
              Tableau de bord phishing
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Vue consolidée des interactions avec le flux simulé. Les mots de passe ne sont ni collectés ni stockés.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void load({ refresh: true })}
              disabled={loadingData}
              className="rounded-xl border border-white/12 bg-slate-950/40 px-4 py-2.5 text-[14px] font-medium text-slate-100 outline-none transition-colors hover:bg-white/[0.06] disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-sky-400/20"
            >
              {loadingData ? 'Actualisation…' : 'Actualiser'}
            </button>
            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-[14px] font-semibold text-rose-100 outline-none transition-colors hover:bg-rose-500/15 focus-visible:ring-4 focus-visible:ring-rose-400/25"
            >
              Réinitialiser les données
            </button>
          </div>
        </header>

        {loadError ? (
          <p className="mt-6 rounded-xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-[14px] text-amber-100">
            {loadError}
          </p>
        ) : null}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            label="Visiteurs uniques"
            value={stats?.totalVisitors ?? 0}
            hint="Sessions distinctes sur la page de connexion."
            icon={<IconUsers />}
          />
          <DashboardStatCard
            label="Clics « Suivant »"
            value={stats?.nextClicks ?? 0}
            hint="Passages confirmés après saisie de l’identifiant."
            icon={<IconArrowRight />}
          />
          <DashboardStatCard
            label="Clics « Se connecter »"
            value={stats?.signInClicks ?? 0}
            hint="Tentatives de validation du mot de passe (sans stockage du secret)."
            icon={<IconShield />}
          />
          <DashboardStatCard
            label="Taux de complétion"
            value={completionLabel}
            hint="Exercices terminés / clics « Suivant »."
            icon={<IconTimeline />}
          />
        </section>

        <div className="dash-meta-enter mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-4 text-[13px] text-slate-300 ring-1 ring-white/[0.04]">
          <span className="font-semibold text-white">Dernière interaction</span>
          <time dateTime={stats?.lastInteractionAt ?? undefined}>
            {formatFrDateTime(stats?.lastInteractionAt)}
          </time>
        </div>

        <section className="mt-10 flex-1 pb-10">
          <ParticipantsTable participants={participants} />
        </section>
      </div>

      <ConfirmDialog
        open={confirmResetOpen}
        title="Réinitialiser toutes les données ?"
        description="Cette action supprime définitivement les statistiques et les adresses e-mail collectées dans data/tracking.json. Elle est irréversible."
        confirmLabel={resetBusy ? 'Suppression…' : 'Supprimer tout'}
        cancelLabel="Annuler"
        destructive
        onCancel={() => (!resetBusy ? setConfirmResetOpen(false) : null)}
        onConfirm={() => {
          if (!resetBusy) void handleReset()
        }}
      />
    </div>
  )
}
