/**
 * Fond sobre pour l’écran de sensibilisation — ambiance sérieuse, lisible.
 */
export function AwarenessBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#0f172a_0%,#1e293b_42%,#172554_78%,#0c1222_100%)]" />
      <div className="ms-bg-drift absolute -left-[20%] top-[-25%] h-[75vmin] w-[75vmin] rounded-[45%] bg-[#3b82f6]/14 blur-[100px]" />
      <div className="ms-bg-drift-slow absolute -right-[15%] bottom-[-18%] h-[65vmin] w-[65vmin] rounded-[48%] bg-[#6366f1]/12 blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,transparent_0%,rgba(15,23,42,0.65)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_100%)]" />
    </div>
  )
}
