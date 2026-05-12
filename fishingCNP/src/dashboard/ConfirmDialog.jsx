export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Annuler',
  onConfirm,
  onCancel,
  destructive,
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-label="Fermer la boîte de dialogue"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="relative z-[101] w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.06]"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-white">
          {title}
        </h2>
        <p id="confirm-desc" className="mt-3 text-[14px] leading-relaxed text-slate-400">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/12 bg-transparent px-4 py-2.5 text-[14px] font-medium text-slate-200 outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-4 focus-visible:ring-sky-400/20"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2.5 text-[14px] font-semibold text-white outline-none transition-[filter,transform] focus-visible:ring-4 active:scale-[0.99] ${
              destructive
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_16px_55px_-26px_rgba(244,63,94,0.85)] hover:brightness-110 focus-visible:ring-rose-400/25'
                : 'bg-gradient-to-r from-sky-500 to-indigo-500 shadow-[0_16px_55px_-26px_rgba(56,189,248,0.75)] hover:brightness-110 focus-visible:ring-sky-400/25'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
