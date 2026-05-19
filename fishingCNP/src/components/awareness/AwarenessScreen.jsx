import { useEffect } from 'react'
import { trackVisit } from '../../services/trackingClient.js'
import { AwarenessBackground } from './AwarenessBackground.jsx'
import { SecurityRevealIcon } from './SecurityRevealIcon.jsx'
import { scenarios } from './scenarioContent.js'

const contacts = ['Manu', 'Florian', 'Loane', 'Luciolle', 'Océane']

function Bullet() {
  return (
    <span
      className="mt-[6px] inline-block size-1.5 shrink-0 rounded-full bg-ms-blue"
      aria-hidden
    />
  )
}

function SignalsSection({ items }) {
  return (
    <div className="mt-4 space-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[15px] font-semibold text-slate-900 sm:text-[16px]">
            {item.label}
          </p>
          <ul className="mt-2 grid gap-2 text-[15px] leading-snug text-slate-700">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3">
                <Bullet />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function BiasesSection({ items }) {
  return (
    <ol className="mt-4 grid gap-3.5 text-[15px] leading-snug text-slate-700">
      {items.map((item, i) => (
        <li key={item.label} className="flex gap-3">
          <span className="mt-[1px] inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-ms-blue text-[11px] font-semibold text-white">
            {i + 1}
          </span>
          <span>
            <strong className="font-semibold text-slate-900">
              {item.label}
            </strong>
            {' — '}
            {item.detail}
          </span>
        </li>
      ))}
    </ol>
  )
}

function ListSection({ items }) {
  return (
    <ul className="mt-4 grid gap-3 text-[15px] leading-snug text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Bullet />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ section }) {
  return (
    <section
      className="awareness-tips-enter mt-8 rounded-xl border border-slate-200/80 bg-slate-50/90 px-5 py-5 sm:px-6"
      aria-label={section.title}
    >
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ms-blue">
        {section.title}
      </h2>

      {section.variant === 'signals' && <SignalsSection items={section.items} />}
      {section.variant === 'biases' && <BiasesSection items={section.items} />}
      {section.variant === 'list' && <ListSection items={section.items} />}

      {section.footer && (
        <p className="mt-4 text-[14px] italic leading-snug text-slate-500">
          {section.footer}
        </p>
      )}
    </section>
  )
}

/**
 * Landing page de sensibilisation.
 * @param {{ scenario: 'nxlvl' | 'rgpd' | 'cv' }} props
 */
export function AwarenessScreen({ scenario }) {
  const content = scenarios[scenario]

  useEffect(() => {
    // Les scénarios nxlvl/rgpd passent par LoginPage, qui track déjà la visite.
    // Le scénario cv affiche cet écran directement : on track ici.
    if (scenario === 'cv') void trackVisit()
  }, [scenario])

  if (!content) return null

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
                  Vous avez participé à un exercice de sensibilisation
                </h1>
              </div>
            </header>

            <div className="awareness-body-enter mt-8 space-y-5 text-[15px] leading-relaxed text-slate-700 sm:text-[16px]">
              <p>
                Il s&apos;agissait d&apos;un exercice réalisé par l&apos;équipe{' '}
                <strong className="font-semibold text-slate-900">
                  Tech de Concept Nation
                </strong>{' '}
                afin de tester la réactivité face aux tentatives de phishing.
              </p>

              <p className="rounded-lg border border-ms-blue/25 bg-ms-blue/[0.06] px-4 py-3 text-[15px] leading-snug text-slate-800">
                {content.context}
              </p>

              <p className="rounded-lg border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-[15px] leading-snug text-slate-800">
                Merci de{' '}
                <strong className="font-semibold text-slate-900">
                  NE PAS informer vos collègues
                </strong>{' '}
                et de{' '}
                <strong className="font-semibold text-slate-900">
                  NE PAS publier de message sur Teams
                </strong>{' '}
                afin de ne pas compromettre l&apos;exercice.
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

            {content.sections.map((section) => (
              <Section key={section.title} section={section} />
            ))}
          </article>
        </main>
      </div>
    </div>
  )
}
