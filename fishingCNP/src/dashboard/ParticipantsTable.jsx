import { StageBadge } from './StageBadge.jsx'
import { formatFrDateTime } from './formatters.js'

export function ParticipantsTable({ participants }) {
  const rows = [...participants].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )

  return (
    <div className="dash-table-enter overflow-hidden rounded-2xl border border-white/10 bg-slate-900/45 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-white">Participants</h2>
          <p className="mt-1 text-[13px] text-slate-400">
            Adresses saisies dans le flux simulé — aucun mot de passe conservé.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-[14px]">
          <thead className="bg-slate-950/55 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <tr>
              <th className="px-5 py-3 sm:px-6">E-mail</th>
              <th className="px-5 py-3 sm:px-6">Étape</th>
              <th className="px-5 py-3 sm:px-6">Dernière mise à jour</th>
              <th className="px-5 py-3 sm:px-6">Appareil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-slate-400 sm:px-6"
                  colSpan={4}
                >
                  Aucune interaction enregistrée pour le moment.
                </td>
              </tr>
            ) : (
              rows.map((p) => (
                <tr
                  key={p.id}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="max-w-[280px] px-5 py-4 font-medium text-slate-100 sm:px-6">
                    <span className="block truncate">{p.email}</span>
                  </td>
                  <td className="px-5 py-4 align-middle sm:px-6">
                    <StageBadge stage={p.stage} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300 sm:px-6">
                    {formatFrDateTime(p.updatedAt)}
                  </td>
                  <td className="max-w-[320px] px-5 py-4 text-slate-300 sm:px-6">
                    <span className="line-clamp-2">{p.deviceHint ?? '—'}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
