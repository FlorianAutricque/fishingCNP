export function DashboardStatCard({ label, value, hint, icon }) {
  return (
    <div className="dash-stat-enter group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] backdrop-blur-md transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-30px_rgba(56,189,248,0.22)]">
      <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-sky-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative flex items-start gap-4">
        {icon ? (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-sky-200 ring-1 ring-white/10">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 truncate text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
          {hint ? (
            <p className="mt-2 text-[13px] leading-snug text-slate-400">{hint}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
