/**
 * Page neutre affichée sans paramètre `?s=` valide.
 * Volontairement sobre : ne révèle pas l'existence de l'exercice.
 */
export function NotFound() {
  return (
    <div className="flex min-h-dvh min-h-[100svh] flex-col items-center justify-center bg-slate-50 px-6 text-center font-ms antialiased">
      <p className="text-[64px] font-semibold leading-none text-slate-300">
        404
      </p>
      <h1 className="mt-4 text-[20px] font-semibold text-slate-800">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-[420px] text-[15px] leading-relaxed text-slate-500">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
    </div>
  )
}
