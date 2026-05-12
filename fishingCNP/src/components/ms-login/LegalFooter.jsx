import { MsLink } from './MsLink.jsx'

const items = [
  { label: 'Confidentialité', href: '#' },
  { label: "Conditions d'utilisation", href: '#' },
  { label: 'Aide', href: '#' },
]

export function LegalFooter() {
  return (
    <footer className="pointer-events-auto fixed bottom-0 right-0 z-20 max-w-[100vw] px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
      <nav
        aria-label="Liens légaux"
        className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-right text-[11px] leading-tight text-[#737373] sm:text-xs"
      >
        {items.map(({ label, href }) => (
          <MsLink
            key={label}
            href={href}
            className="text-[#737373] hover:text-ms-blue"
          >
            {label}
          </MsLink>
        ))}
      </nav>
    </footer>
  )
}
