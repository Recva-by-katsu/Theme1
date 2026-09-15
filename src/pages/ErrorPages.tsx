import { Button } from "../ui/components";
import { Icon } from "../ui/icons";
import { useRouter } from "../app/router";

export function ErrorPage({ code }: { code: "404" | "500" }) {
  const { go } = useRouter();
  const cfg = code === "404"
    ? { emoji: "🛸", title: "Lost in space", msg: "The page you're looking for drifted off into the void." }
    : { emoji: "💥", title: "Something broke", msg: "Our servers hit an unexpected error. We're on it!" };

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative">
        <p className="font-pixel select-none text-[80px] font-black leading-none text-brand-500 sm:text-[120px]" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em", imageRendering: "pixelated" }}>
          {code}
        </p>
        <span className="mb-4 block animate-[float_6s_ease-in-out_infinite] text-6xl" style={{ imageRendering: "pixelated" }}>{cfg.emoji}</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{cfg.title}</h1>
        <p className="mt-2 max-w-sm text-slate-500 dark:text-slate-400">{cfg.msg}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => go({ name: "dashboard" })}><Icon.Home className="h-4 w-4" /> Dashboard</Button>
          <Button onClick={() => go({ name: "dashboard" })}><Icon.Refresh className="h-4 w-4" /> Try again</Button>
        </div>
      </div>
    </div>
  );
}
