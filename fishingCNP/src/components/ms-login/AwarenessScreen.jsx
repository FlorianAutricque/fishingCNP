import { AwarenessBackground } from './AwarenessBackground.jsx'
import { SecurityRevealIcon } from './SecurityRevealIcon.jsx'
import { AntiPhishingTips } from './AntiPhishingTips.jsx'

const contacts = ['Manu', 'Florian', 'Loane', 'Oceane', 'Luciolle']

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
                  Bravo, tu t&apos;es fait avoir&nbsp;!
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

            <AntiPhishingTips className="awareness-tips-enter mt-10" />
          </article>
        </main>
      </div>
    </div>
  )
}
