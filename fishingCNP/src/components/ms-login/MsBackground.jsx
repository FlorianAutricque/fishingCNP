/**
 * Fond abstrait type Microsoft — formes douces, léger voile « glass ».
 */
export function MsBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#f8fbff_0%,#eef6ff_35%,#fafdff_70%,#fff9f3_100%)]" />
      <div className="ms-bg-drift absolute -left-[18%] top-[-22%] h-[72vmin] w-[72vmin] rounded-[42%] bg-white/55 blur-3xl" />
      <div className="ms-bg-drift-slow absolute -right-[12%] top-[8%] h-[58vmin] w-[58vmin] rounded-[48%] bg-[#dbeafe]/55 blur-3xl" />
      <div className="ms-bg-drift absolute bottom-[-20%] left-[12%] h-[64vmin] w-[64vmin] rounded-[45%] bg-[#fef3c7]/35 blur-[80px]" />
      <div className="ms-bg-drift-slow absolute bottom-[12%] right-[8%] h-[42vmin] w-[42vmin] rounded-[50%] bg-[#e0f2fe]/45 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_20%,rgba(255,255,255,0.45)_100%)]" />
    </div>
  )
}
