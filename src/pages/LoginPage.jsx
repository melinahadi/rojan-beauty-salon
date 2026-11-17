import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../hooks/useAuth";
import { isValidIranPhone } from "../lib/phoneAuth";
import SEO from "../components/SEO";

import loginImage from "../assets/images/login/21.webp";

export default function LoginPage() {
  const [mode, setMode] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  
  const redirectTo = location.state?.from?.pathname || "/booking";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("شماره موبایل و رمز عبور را وارد کنید.");
      return;
    }

    if (!isValidIranPhone(phone)) {
      setError("شماره موبایل معتبر نیست.");
      return;
    }

    if (mode === "signup" && !fullName.trim()) {
      setError("نام و نام خانوادگی را وارد کنید.");
      return;
    }

    setSubmitting(true);

    const { error } =
      mode === "login"
        ? await signIn(phone, password)
        : await signUp(phone, password, fullName);

    setSubmitting(false);

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "شماره یا رمز عبور اشتباه است."
          : mode === "signup"
          ? "خطا در ثبت‌نام. شاید این شماره قبلاً ثبت شده."
          : "خطایی رخ داد، دوباره تلاش کنید."
      );

      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="min-h-screen grid md:grid-cols-2">
      <SEO title="ورود / ثبت‌نام" />

      <div className="relative hidden md:block">
        <img
          src={loginImage}
          alt="روژان"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-charcoal/55" />

        <div className="absolute bottom-14 right-10 text-cream max-w-sm">
          <div className="font-display text-3xl mb-3">روژان</div>

          <p className="text-cream/80 text-sm leading-relaxed">
            برای رزرو نوبت، ابتدا وارد حساب کاربری‌تان شوید یا در چند ثانیه یک
            حساب جدید بسازید.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-16 bg-cream">
        <div className="w-full max-w-sm">
          <div className="flex gap-2 mb-10 bg-cream-2 p-1 rounded-full">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`flex-1 py-2.5 rounded-full text-sm transition-colors ${
                  mode === m
                    ? "bg-charcoal text-cream"
                    : "text-charcoal-2 hover:text-charcoal"
                }`}
              >
                {m === "login" ? "ورود" : "ثبت‌نام"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h1 className="font-display text-2xl mb-1">
                {mode === "login" ? "خوش برگشتی" : "بساز، تا شروع کنیم"}
              </h1>

              <p className="text-charcoal-2 text-sm mb-6">
                {mode === "login"
                  ? "برای مشاهده و ثبت نوبت وارد شوید."
                  : "چند ثانیه بیشتر طول نمی‌کشد."}
              </p>

              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-charcoal/20 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-rose-deep transition-colors"
                />
              )}

              <input
                type="tel"
                placeholder="شماره موبایل (09xxxxxxxxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-charcoal/20 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-rose-deep transition-colors"
                dir="rtl"
              />

              

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  className="w-full border border-charcoal/20 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-rose-deep transition-colors"
                  
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label={
                    showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded-sm px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-charcoal text-cream py-3.5 text-sm mt-2 hover:bg-rose-deep transition-colors disabled:opacity-60"
              >
                {submitting
                  ? "در حال ارسال..."
                  : mode === "login"
                  ? "ورود"
                  : "ساخت حساب"}
              </button>

              {mode === "login" && (
                <Link
                  to="/forgot-password"
                  className="block text-center text-[13px] text-charcoal-2 hover:text-rose-deep transition-colors"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              )}
            </motion.form>
          </AnimatePresence>

          <Link
            to="/"
            className="block text-center text-sm text-charcoal-2 hover:text-charcoal mt-8 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}