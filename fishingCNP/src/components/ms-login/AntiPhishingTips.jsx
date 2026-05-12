const tips = [
  'Vérifier l’expéditeur avant d’agir.',
  'Ne jamais saisir ses identifiants sans vérifier l’URL.',
  'Être vigilant face aux liens suspects.',
  'Signaler les e-mails douteux au bon canal interne.',
]

export function AntiPhishingTips({ className = '' }) {
  return (
    <section
      className={`rounded-xl border border-slate-200/80 bg-slate-50/90 px-5 py-5 sm:px-6 ${className}`}
      aria-labelledby="tips-heading"
    >
      <h2
        id="tips-heading"
        className="text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-500"
      >
        Quelques réflexes utiles
      </h2>
      <ul className="mt-4 grid gap-3 text-[15px] leading-snug text-slate-700 sm:gap-3.5">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-3">
            <span
              className="mt-[6px] inline-block size-1.5 shrink-0 rounded-full bg-ms-blue"
              aria-hidden
            />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
