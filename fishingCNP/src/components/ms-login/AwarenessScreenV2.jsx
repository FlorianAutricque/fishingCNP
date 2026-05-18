import { AwarenessBackground } from './AwarenessBackground.jsx'
import { SecurityRevealIcon } from './SecurityRevealIcon.jsx'
import { AntiPhishingTips } from './AntiPhishingTips.jsx'

const contacts = ['Manu', 'Florian', 'Loane', 'Oceane', 'Luciolle']

const mailSignals = [
  {
    label: 'Le domaine « partage-docs.fr »',
    detail:
      'Ce nom de domaine n’a aucun lien avec notre entreprise — un service légitime passe toujours par notre propre domaine.',
  },
  {
    label: 'Une URL qui se lit par la fin',
    detail:
      'On ne juge pas une adresse de gauche à droite : ce qui compte, c’est la fin du nom de domaine, juste avant la première « / ». Des mots rassurants placés au début (« microsoft », « connexion »…) ne prouvent rien — seule la fin, ici « partage-docs.fr », révèle le vrai propriétaire du site.',
  },
  {
    label: 'Une demande inhabituelle de validation de document',
    detail:
      'La sollicitation sortait du cadre habituel et jouait sur une urgence implicite pour pousser à agir vite.',
  },
]

export function AwarenessScreen() {
  return (
    <div className="relative min-h-dvh min-h-[100svh] font-ms text-slate-900 antialiased">
      <AwarenessBackground />

      <div className="relative z-10 flex min-h-dvh min-h-[100svh] flex-col justify-center px-5 py-12 sm:px-8 sm:py-16">
        <main className="mx-auto w-full max-w-[640px]">
          <article
            className="awareness-card-enter rounded-[20px] border border-white/60 bg-white/95 px-7 py-9 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.35),0_12px_28px_-16px_rgba(15,23,42,0.22)] backdrop-blur-md sm:px-10 sm:py-11"
            aria-labelledby="reveal-title"
          >
            <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <SecurityRevealIcon className="awareness-icon-enter sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ms-blue">
                  Exercice de sensibilisation
                </p>
                <h1
                  id="reveal-title"
                  className="awareness-title-enter mt-2 text-[26px] font-semibold leading-[1.2] tracking-tight text-slate-900 sm:text-[28px]"
                >
                  Tu viens de tomber dans un piège — pas grave, c&apos;est exactement le but
                </h1>
              </div>
            </header>

            <div className="awareness-body-enter mt-8 space-y-5 text-[15px] leading-relaxed text-slate-700 sm:text-[16px]">
              <p>
                Il s&apos;agissait d&apos;un exercice réalisé par l&apos;équipe{' '}
                <strong className="font-semibold text-slate-900">
                  Technologie de Conceptnation
                </strong>{' '}
                afin de tester la réactivité face aux tentatives de phishing.
              </p>
              <p className="rounded-lg border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-[15px] leading-snug text-slate-800">
                Merci de{' '}
                <strong className="font-semibold text-slate-900">
                  NE PAS informer tes collègues
                </strong>{' '}
                et de{' '}
                <strong className="font-semibold text-slate-900">
                  NE PAS publier de message sur Teams
                </strong>{' '}
                afin de ne pas compromettre le bon déroulement de l&apos;exercice.
              </p>
              <p>
                Si tu as besoin d&apos;explications ou de clarification, tu peux
                te rapprocher de&nbsp;:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                {contacts.map((name, i) => (
                  <li
                    key={name}
                    className="awareness-contact-enter flex items-center gap-2 text-[15px] font-medium text-slate-900 sm:text-[16px]"
                    style={{ animationDelay: `${220 + i * 55}ms` }}
                  >
                    <span
                      className="inline-flex size-2 shrink-0 rounded-full bg-ms-blue/75"
                      aria-hidden
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <section
              className="awareness-tips-enter mt-10 rounded-xl border border-ms-blue/20 bg-ms-blue/[0.06] px-5 py-5 sm:px-6"
              aria-labelledby="signals-heading"
            >
              <h2
                id="signals-heading"
                className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ms-blue"
              >
                Dans ce cas précis, les signaux étaient
              </h2>
              <ul className="mt-4 grid gap-3.5 text-[15px] leading-snug text-slate-700">
                {mailSignals.map((signal) => (
                  <li key={signal.label} className="flex gap-3">
                    <span
                      className="mt-[6px] inline-block size-1.5 shrink-0 rounded-full bg-ms-blue"
                      aria-hidden
                    />
                    <span>
                      <strong className="font-semibold text-slate-900">
                        {signal.label}
                      </strong>{' '}
                      — {signal.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <AntiPhishingTips className="awareness-tips-enter mt-6" />
          </article>
        </main>
      </div>
    </div>
  )
}
