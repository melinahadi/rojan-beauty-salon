import { useState } from "react";
import { Link } from "react-router-dom";
import { isValidIranPhone } from "../lib/phoneAuth";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isValidIranPhone(phone)) {
      setError("شماره موبایل معتبر نیست.");
      return;
    }

    setSent(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-cream">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl mb-1">بازیابی رمز عبور</h1>
        <p className="text-charcoal-2 text-sm mb-8">
          شماره موبایلت رو وارد کن تا کد تأیید برات پیامک بشه.
        </p>

        {sent ? (
          <div className="border border-rose-deep/25 bg-rose-deep/5 rounded-sm p-5 text-center">
            <p className="text-sm text-charcoal mb-2">
              این قابلیت به‌زودی فعال می‌شود
            </p>
            <p className="text-[13px] text-charcoal-2">
              فعلاً امکان ارسال پیامک روی این سایت وجود ندارد. برای بازیابی رمز
              عبور، لطفاً با پشتیبانی تماس بگیرید.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              placeholder="شماره موبایل (09xxxxxxxxx)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-charcoal/20 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-rose-deep transition-colors"
              dir="ltr"
            />

            {error && (
              <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-charcoal text-cream py-3.5 text-sm hover:bg-rose-deep transition-colors"
            >
              ارسال کد تأیید
            </button>
          </form>
        )}

        <Link
          to="/login"
          className="block text-center text-sm text-charcoal-2 hover:text-charcoal mt-6 transition-colors"
        >
          بازگشت به ورود
        </Link>
      </div>
    </section>
  );
}
