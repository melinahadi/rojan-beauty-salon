import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const tabs = [
  { to: "/admin", label: "داشبورد" },
  { to: "/admin/appointments", label: "نوبت‌ها" },
  { to: "/admin/services", label: "خدمات" },
  { to: "/admin/stylists", label: "استایلیست‌ها" },
];

export default function AdminLayout() {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen bg-cream-2"
      dir="rtl"
      style={{ fontFamily: "Vazirmatn, sans-serif" }}
    >
      <header className="bg-charcoal text-cream px-8 py-4 flex items-center justify-between">
        <Link to="/admin" className="font-display text-lg">
          پنل مدیریت روژان
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link
            to="/"
            className="text-cream/70 hover:text-cream transition-colors"
          >
            مشاهده سایت
          </Link>
          <button
            onClick={signOut}
            className="text-cream/70 hover:text-cream transition-colors"
          >
            خروج
          </button>
        </div>
      </header>

      <div className="border-b border-charcoal/10 bg-cream">
        <nav className="max-w-6xl mx-auto px-8 flex gap-1">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`px-4 py-3.5 text-sm border-b-2 transition-colors ${
                pathname === t.to
                  ? "border-rose-deep text-charcoal"
                  : "border-transparent text-charcoal-2 hover:text-charcoal"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}
