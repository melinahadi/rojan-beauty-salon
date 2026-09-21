import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-8 text-center">
      <div>
        <div className="font-display text-7xl text-rose-deep mb-4">404</div>
        <h1 className="font-display text-2xl mb-3">این صفحه پیدا نشد</h1>
        <p className="text-charcoal-2 mb-8 max-w-sm">
          ممکنه آدرس اشتباه باشه یا این صفحه دیگه وجود نداشته باشه.
        </p>
        <Link
          to="/"
          className="inline-block bg-charcoal text-cream px-8 py-3 text-sm hover:bg-rose-deep transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
