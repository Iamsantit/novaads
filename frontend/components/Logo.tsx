type LogoProps = { className?: string; showWordmark?: boolean };

export default function Logo({ className = "h-8 w-auto", showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4edcff" />
            <stop offset="100%" stopColor="#00f5ff" />
          </linearGradient>
        </defs>
        <path d="M6 54 L20 10 L30 10 L22 34 L40 34 L36 54 Z" fill="url(#navGrad)" />
        <path d="M28 54 L42 10 L50 10 L58 54 L48 54 L44 40 L34 40 L30 54 Z" fill="url(#cyanGrad)" />
        {/* Shooting star */}
        <path
          d="M40 6 L42.5 11.5 L48 13 L43 15.5 L41.5 21 L40 15.5 L34 13 L39 11.5 Z"
          fill="#f472b6"
          opacity="0.9"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight">
          <span className="text-white">Nova</span>
          <span className="bg-gradient-to-r from-neon-cyan to-violet-400 bg-clip-text text-transparent">Ads</span>
        </span>
      )}
    </div>
  );
}
