import { stageLabel } from './stageLabels.js'

const variants = {
  email_entered:
    'bg-sky-500/15 text-sky-100 ring-sky-400/25 hover:bg-sky-500/20',
  signin_attempted:
    'bg-amber-500/15 text-amber-100 ring-amber-400/25 hover:bg-amber-500/20',
  completed:
    'bg-emerald-500/15 text-emerald-100 ring-emerald-400/25 hover:bg-emerald-500/20',
}

export function StageBadge({ stage }) {
  const cls = variants[stage] ?? 'bg-slate-700 text-slate-100 ring-slate-500/25'
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset transition-colors ${cls}`}
    >
      {stageLabel(stage)}
    </span>
  )
}
