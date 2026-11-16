import {
  Wallet,
  TrendingUp,
  CalendarDays,
  Users,
  Crown,
  ArrowUpLeft,
  Sparkles,
} from "lucide-react";

import { useDashboardStats } from "../../hooks/useDashboardStats";
import StatusPieChart from "../../components/admin/StatusPieChart";
import { formatPrice } from "../../lib/formatPrice";

function getTotalAppointments(counts) {
  const values = Array.isArray(counts)
    ? counts.map((item) => item.count ?? item.value ?? 0)
    : Object.values(counts || {});

  return values.reduce((total, value) => {
    const count =
      typeof value === "object" ? value.count ?? value.value ?? 0 : value;

    return total + (Number(count) || 0);
  }, 0);
}

function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  description,
  accent = "rose",
}) {
  const accentStyles = {
    rose: {
      icon: "bg-rose-100 text-rose-700",
      decoration: "bg-rose-100/60",
    },
    gold: {
      icon: "bg-amber-100 text-amber-700",
      decoration: "bg-amber-100/60",
    },
    dark: {
      icon: "bg-stone-200 text-stone-700",
      decoration: "bg-stone-100",
    },
  };

  const style = accentStyles[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-deep/5">
      <div
        className={`absolute -left-8 -top-8 h-28 w-28 rounded-full blur-2xl ${style.decoration}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-charcoal-2">{title}</p>

          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-3xl font-medium text-charcoal sm:text-4xl">
              {formatPrice(value)}
            </span>

            {unit && <span className="text-sm text-charcoal-2">{unit}</span>}
          </div>

          {description && (
            <p className="mt-3 text-xs text-charcoal-2">{description}</p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={23} strokeWidth={1.7} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { loading, todayRevenue, weekRevenue, statusCounts, topCustomers } =
    useDashboardStats();

  const totalAppointments = getTotalAppointments(statusCounts);
  const customers = Array.isArray(topCustomers) ? topCustomers : [];

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-lg bg-stone-200" />
          <div className="h-4 w-64 rounded bg-stone-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-36 rounded-2xl bg-stone-100" />
          ))}
        </div>

        <div className="h-72 rounded-2xl bg-stone-100" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-rose-deep">
            <Sparkles size={17} />
            <span className="text-xs font-medium tracking-wide">
              ROJAN BEAUTY SALON
            </span>
          </div>

          <h1 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
            داشبورد مدیریت
          </h1>

          <p className="mt-2 text-sm text-charcoal-2">
            نمای کلی عملکرد و وضعیت سالن زیبایی روژان
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal-2 shadow-sm">
          <CalendarDays size={17} className="text-rose-deep" />
          <span>نمای کلی آمار</span>
        </div>
      </div>

      {/* Statistics */}

      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-rose-deep" />
          <h2 className="text-sm font-semibold text-charcoal">خلاصه عملکرد</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="درآمد امروز"
            value={todayRevenue}
            unit="تومان"
            icon={Wallet}
            description="مجموع درآمد ثبت‌شده امروز"
            accent="rose"
          />

          <StatCard
            title="درآمد این هفته"
            value={weekRevenue}
            unit="تومان"
            icon={TrendingUp}
            description="مجموع درآمد ثبت‌شده این هفته"
            accent="gold"
          />

          <StatCard
            title="کل نوبت‌ها"
            value={totalAppointments}
            unit="نوبت"
            icon={CalendarDays}
            description="مجموع نوبت‌های ثبت‌شده در آمار"
            accent="dark"
          />
        </div>
      </section>

      {/* Appointment Chart */}

      <section className="overflow-hidden rounded-2xl border border-charcoal/10 bg-cream shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 px-5 py-5 sm:px-7">
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal">
              وضعیت نوبت‌ها
            </h2>

            <p className="mt-1 text-xs text-charcoal-2">
              بررسی تعداد و توزیع وضعیت نوبت‌های مشتریان
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-deep">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <StatusPieChart counts={statusCounts} />
        </div>
      </section>

      {/* Top Customers */}

      <section className="overflow-hidden rounded-2xl border border-charcoal/10 bg-cream shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 px-5 py-5 sm:px-7">
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal">
              مشتریان پرتکرار
            </h2>

            <p className="mt-1 text-xs text-charcoal-2">
              مشتریانی که بیشترین نوبت را ثبت کرده‌اند
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Crown size={21} />
          </div>
        </div>

        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <Users size={25} />
            </div>

            <p className="text-sm font-medium text-charcoal">
              هنوز اطلاعاتی برای نمایش وجود ندارد
            </p>

            <p className="mt-2 text-xs text-charcoal-2">
              با ثبت نوبت توسط مشتریان، این قسمت تکمیل می‌شود.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-charcoal/10">
            {customers.map((customer, index) => (
              <div
                key={customer.phone || customer.id || index}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/60 sm:px-7"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 font-display text-lg font-semibold text-rose-deep">
                    {String(customer.name || "?").charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {customer.name}
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-left text-xs text-charcoal-2"
                    >
                      {customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-deep">
                    {formatPrice(customer.count)} نوبت
                  </span>

                  <ArrowUpLeft
                    size={16}
                    className="hidden text-charcoal-2 sm:block"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
