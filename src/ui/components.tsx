import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";
import { Icon } from "./icons";

/* ============================================================ BUTTON */
type Variant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.6)] hover:from-brand-400 hover:to-brand-500 active:scale-[0.97]",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.97] dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15",
  ghost:
    "text-slate-600 hover:bg-slate-100 active:scale-[0.97] dark:text-slate-300 dark:hover:bg-white/10",
  outline:
    "border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.97] dark:border-white/12 dark:text-slate-200 dark:hover:bg-white/5",
  danger:
    "bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-[0_8px_20px_-8px_rgba(244,63,94,0.6)] hover:from-rose-400 hover:to-rose-500 active:scale-[0.97]",
  success:
    "bg-gradient-to-b from-mint-500 to-mint-600 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] hover:from-mint-400 hover:to-mint-500 active:scale-[0.97]",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-[10px]",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[15px] gap-2.5 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 select-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function IconButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 active:scale-90 dark:text-slate-300 dark:hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ============================================================ CARD */
export function Card({ className, children, hover, ...rest }: { className?: string; children: ReactNode; hover?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white shadow-soft dark:border-white/8 dark:bg-slate-900/60 dark:backdrop-blur",
        hover && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-18px_rgba(79,70,229,0.35)] hover:border-brand-200 dark:hover:border-brand-500/40",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ============================================================ BADGE */
type BadgeTone = "brand" | "green" | "red" | "amber" | "slate" | "pink";
const badgeTones: Record<BadgeTone, string> = {
  brand: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  red: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  slate: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
};
export function Badge({ tone = "slate", children, className, dot }: { tone?: BadgeTone; children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", badgeTones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/* ============================================================ INPUT */
export function Input({ className, label, hint, error, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>}
      <input
        {...rest}
        className={cn(
          "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-500/15",
          className,
        )}
      />
      {hint && !error && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
}

export function Textarea({ className, label, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>}
      <textarea
        {...rest}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
          className,
        )}
      />
    </label>
  );
}

export function Select({ className, label, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>}
      <div className="relative">
        <select
          {...rest}
          className={cn(
            "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-9 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
            className,
          )}
        >
          {children}
        </select>
        <Icon.ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  );
}

/* ============================================================ TOGGLE */
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-300",
          checked ? "bg-brand-500" : "bg-slate-300 dark:bg-white/15",
        )}
      >
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300", checked ? "left-[22px]" : "left-0.5")} />
      </button>
      {label && <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>}
    </label>
  );
}

/* ============================================================ SPINNER / SKELETON */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn("animate-spin", className)} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-20" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

/* ============================================================ PROGRESS */
export function Progress({ value, tone = "brand" }: { value: number; tone?: "brand" | "green" | "amber" | "red" }) {
  const colors = {
    brand: "from-brand-400 to-brand-600",
    green: "from-mint-400 to-mint-600",
    amber: "from-amber-400 to-amber-500",
    red: "from-rose-400 to-rose-600",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/8">
      <div
        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out", colors[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ============================================================ MODAL */
export function Modal({ open, onClose, title, children, footer, size = "md" }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; footer?: ReactNode; size?: "sm" | "md" | "lg" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const w = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" }[size];
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-[fade-in_0.2s_ease]" onClick={onClose} />
      <div className={cn("relative w-full rounded-t-2xl bg-white shadow-2xl animate-[slide-up_0.3s_cubic-bezier(0.22,1,0.36,1)] dark:bg-slate-900 dark:border dark:border-white/10 sm:rounded-2xl", w)}>
        {title && (
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-white/8">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h3>
            <IconButton onClick={onClose} className="h-8 w-8"><Icon.Close className="h-4 w-4" /></IconButton>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4 dark:border-white/8">{footer}</div>}
      </div>
    </div>
  );
}

/* ============================================================ CONFIRM DIALOG */
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = "Confirm", danger }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmText?: string; danger?: boolean }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={cn("mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl", danger ? "bg-rose-100 text-rose-600 dark:bg-rose-500/15" : "bg-amber-100 text-amber-600 dark:bg-amber-500/15")}>
          <Icon.Warning className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <div className="mt-6 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant={danger ? "danger" : "primary"} className="flex-1" onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================ DROPDOWN */
export function Dropdown({ trigger, items }: { trigger: ReactNode; items: { label: string; icon?: ReactNode; onClick?: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-[pop_0.18s_ease] dark:border-white/10 dark:bg-slate-800">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => { it.onClick?.(); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                it.danger ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/8",
              )}
            >
              {it.icon}{it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================ TABS */
export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; icon?: ReactNode }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 no-scrollbar dark:bg-white/5">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-200",
            active === t.id
              ? "bg-white text-brand-600 shadow-soft dark:bg-slate-800 dark:text-brand-300"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
          )}
        >
          {t.icon}{t.label}
        </button>
      ))}
    </div>
  );
}

/* ============================================================ ALERT */
export function Alert({ tone = "info", title, children }: { tone?: "info" | "warning" | "success" | "danger"; title?: string; children: ReactNode }) {
  const map = {
    info: { c: "bg-brand-50 border-brand-200 text-brand-800 dark:bg-brand-500/10 dark:border-brand-500/25 dark:text-brand-200", i: <Icon.Info className="h-5 w-5" /> },
    warning: { c: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-200", i: <Icon.Warning className="h-5 w-5" /> },
    success: { c: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-200", i: <Icon.Check className="h-5 w-5" /> },
    danger: { c: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-500/10 dark:border-rose-500/25 dark:text-rose-200", i: <Icon.Warning className="h-5 w-5" /> },
  }[tone];
  return (
    <div className={cn("flex gap-3 rounded-xl border p-3.5 text-sm", map.c)}>
      <span className="shrink-0">{map.i}</span>
      <div>
        {title && <p className="font-bold">{title}</p>}
        <div className={cn(title && "mt-0.5", "opacity-90")}>{children}</div>
      </div>
    </div>
  );
}

/* ============================================================ EMPTY STATE */
export function EmptyState({ icon = "📦", title, description, action }: { icon?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-14 text-center dark:border-white/10">
      <div className="mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-slate-100 text-4xl animate-[float_6s_ease-in-out_infinite] dark:bg-white/5" style={{ imageRendering: "pixelated" }}>{icon}</div>
      <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-sm text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ============================================================ TOAST */
type Toast = { id: number; title: string; tone: "info" | "success" | "danger"; };
const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3200);
  };
  const tones = {
    info: "border-brand-200 dark:border-brand-500/30",
    success: "border-emerald-200 dark:border-emerald-500/30",
    danger: "border-rose-200 dark:border-rose-500/30",
  };
  const icons = { info: <Icon.Info className="h-5 w-5 text-brand-500" />, success: <Icon.Check className="h-5 w-5 text-emerald-500" />, danger: <Icon.Warning className="h-5 w-5 text-rose-500" /> };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={cn("pointer-events-auto flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-xl animate-[slide-up_0.3s_cubic-bezier(0.22,1,0.36,1)] dark:bg-slate-800", tones[t.tone])}>
            {icons[t.tone]}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-100">{t.title}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ============================================================ STAT / RESOURCE */
export function ResourceBar({ icon, label, value, max, unit, tone }: { icon: ReactNode; label: string; value: number; max: number; unit: string; tone?: "brand" | "green" | "amber" | "red" }) {
  const pct = Math.round((value / max) * 100);
  const t = tone ?? (pct > 85 ? "red" : pct > 65 ? "amber" : "green");
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{icon}{label}</span>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{value}{unit} <span className="font-normal text-slate-400">/ {max}{unit}</span></span>
      </div>
      <Progress value={pct} tone={t} />
    </div>
  );
}
