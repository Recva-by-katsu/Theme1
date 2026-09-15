export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.7)]"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* pixel dino accent */}
        <path fill="currentColor" d="M9 3h6v2h2v2h2v6h-2v2h-2v2h2v2h-3v-2h-4v2H6v-2h2v-2H6v-2H4V7h2V5h2V3h1zm0 4h2v2H9V7z" />
      </svg>
    </div>
  );
}

export function Wordmark({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} />
      <div className="leading-none">
        <p className="text-[15px] font-extrabold tracking-tight text-slate-800 dark:text-white">
          Arena<span className="text-brand-500">Panel</span>
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Playful Premium</p>
      </div>
    </div>
  );
}
