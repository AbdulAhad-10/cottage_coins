import { Sparkles, Leaf, Flame } from "lucide-react";

export function DashboardWelcomeBanner({ userName }) {
  const displayName = userName?.trim() || "there";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/80 p-6 shadow-sm dark:from-amber-950/40 dark:via-orange-950/30 dark:to-rose-950/30">
      <svg
        className="pointer-events-none absolute inset-0 z-1 h-full w-full text-foreground"
        aria-hidden
      >
        <defs>
          <pattern
            id="dashWelcomeGrain"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-12)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.045"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dashWelcomeGrain)" />
      </svg>
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back, {displayName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{today}</p>
          <p className="mt-2 text-sm text-foreground/80">
            Here&apos;s your financial snapshot
          </p>
        </div>
        <div
          className="flex shrink-0 items-center justify-center gap-3 rounded-lg border border-amber-200/60 bg-white/60 px-5 py-4 dark:border-amber-800/50 dark:bg-black/20"
          aria-hidden
        >
          <Sparkles className="size-8 text-amber-600 dark:text-amber-400" />
          <Leaf className="size-7 text-emerald-600 dark:text-emerald-400" />
          <Flame className="size-8 text-orange-600 dark:text-orange-400" />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-amber-200/30 blur-2xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute -bottom-6 left-1/3 size-24 rounded-full bg-rose-200/25 blur-2xl dark:bg-rose-500/10" />
    </div>
  );
}
