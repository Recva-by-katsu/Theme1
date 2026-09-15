import { useState } from "react";
import { Button, Input, Toggle, Spinner } from "../ui/components";
import { Icon } from "../ui/icons";
import { Wordmark } from "../ui/Logo";
import { useRouter } from "../app/router";
import { useTheme } from "../ui/theme";
import { IconButton } from "../ui/components";

export function Login() {
  const { go } = useRouter();
  const { theme, toggle } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("alex@arena.gg");
  const [pw, setPw] = useState("demo1234");
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !pw) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === "login") setStep("2fa");
      else go({ name: "dashboard" });
    }, 1100);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-[#07080e]">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-500/20" />
      <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-candy-400/20 blur-3xl dark:bg-candy-500/15" />
      <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-mint-400/15 blur-3xl" />

      <div className="absolute right-4 top-4 z-10">
        <IconButton onClick={toggle}>{theme === "dark" ? <Icon.Sun className="h-5 w-5" /> : <Icon.Moon className="h-5 w-5" />}</IconButton>
      </div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.4)] backdrop-blur-xl dark:border-white/8 dark:bg-slate-900/70 lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <Wordmark size={40} />
          <div className="relative">
            <span className="mb-4 inline-block animate-[float_6s_ease-in-out_infinite] text-7xl" style={{ imageRendering: "pixelated" }}>🕹️</span>
            <h2 className="text-3xl font-extrabold leading-tight">Your game infrastructure,<br />reimagined.</h2>
            <p className="mt-3 max-w-sm text-white/80">Deploy, monitor and manage every server from one playful, premium control panel.</p>
          </div>
          <div className="relative flex items-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Icon.Shield className="h-4 w-4" /> Secure</span>
            <span className="flex items-center gap-1.5"><Icon.Rocket className="h-4 w-4" /> Fast</span>
            <span className="flex items-center gap-1.5"><Icon.Check className="h-4 w-4" /> Reliable</span>
          </div>
        </div>

        {/* Right form */}
        <div className="p-8 sm:p-10">
          <div className="mb-8 lg:hidden"><Wordmark /></div>

          {step === "login" ? (
            <>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back 👋</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to continue to your dashboard.</p>
              <form onSubmit={submit} className="mt-7 space-y-4">
                <Input label="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" />
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pr-11"
                  />
                  <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-[34px] text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
                    {showPw ? <Icon.EyeOff className="h-5 w-5" /> : <Icon.Eye className="h-5 w-5" />}
                  </button>
                </div>
                {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 dark:bg-rose-500/10">{error}</p>}
                <div className="flex items-center justify-between">
                  <Toggle checked={remember} onChange={setRemember} label="Remember me" />
                  <button type="button" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">Forgot password?</button>
                </div>
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </form>
              <p className="mt-6 text-center text-xs text-slate-400">Protected by ArenaPanel · Playful Premium Theme</p>
            </>
          ) : (
            <TwoFactor loading={loading} onSubmit={submit} onBack={() => setStep("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

function TwoFactor({ loading, onSubmit, onBack }: { loading: boolean; onSubmit: (e: React.FormEvent) => void; onBack: () => void }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const update = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code]; next[i] = v; setCode(next);
    if (v && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };
  return (
    <>
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
        <Icon.Chevron className="h-4 w-4 rotate-180" /> Back
      </button>
      <div className="mb-2 grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/15">
        <Icon.Shield className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Two-factor auth</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter the 6-digit code from your authenticator app.</p>
      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        <div className="flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              value={c}
              onChange={(e) => update(i, e.target.value)}
              maxLength={1}
              inputMode="numeric"
              className="h-14 w-full rounded-xl border border-slate-200 bg-white text-center text-xl font-bold text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          ))}
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {loading ? <Spinner className="h-4 w-4" /> : "Verify & sign in"}
        </Button>
        <button type="button" className="w-full text-center text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
          Use a recovery code instead
        </button>
      </form>
    </>
  );
}
