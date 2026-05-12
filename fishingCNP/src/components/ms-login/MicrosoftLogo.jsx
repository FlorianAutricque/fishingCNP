/**
 * Logo Microsoft (carrés couleur + libellé), aligné comme sur la page officielle.
 */
export function MicrosoftLogo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        role="img"
        aria-label="Microsoft"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        className="shrink-0"
      >
        <rect fill="#f25022" x="0" y="0" width="10" height="10" />
        <rect fill="#7fba00" x="11" y="0" width="10" height="10" />
        <rect fill="#00a4ef" x="0" y="11" width="10" height="10" />
        <rect fill="#ffb900" x="11" y="11" width="10" height="10" />
      </svg>
      <span className="text-[17px] leading-none tracking-tight text-[#737373]">
        Microsoft
      </span>
    </div>
  )
}
