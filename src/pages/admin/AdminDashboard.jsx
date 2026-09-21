import { useDashboardStats } from "../../hooks/useDashboardStats";
import StatusPieChart from "../../components/admin/StatusPieChart";

export default function AdminDashboard() {
  const { loading, todayRevenue, weekRevenue, statusCounts, topCustomers } =
    useDashboardStats();

  return (
    <div>
      <h1 className="font-display text-2xl mb-8">داشبورد</h1>

      {loading ? (
        <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
      ) : (
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-cream border border-charcoal/10 rounded-sm p-6">
              <div className="text-[13px] text-charcoal-2 mb-2">
                درآمد امروز
              </div>
              <div className="font-display text-3xl text-rose-deep">
                {todayRevenue.toLocaleString("fa-IR", { useGrouping: false })}
                <span className="text-base text-charcoal-2 mr-1.5">تومان</span>
              </div>
            </div>

            <div className="bg-cream border border-charcoal/10 rounded-sm p-6">
              <div className="text-[13px] text-charcoal-2 mb-2">
                درآمد این هفته
              </div>
              <div className="font-display text-3xl text-rose-deep">
                {weekRevenue.toLocaleString("fa-IR", { useGrouping: false })}
                <span className="text-base text-charcoal-2 mr-1.5">تومان</span>
              </div>
            </div>
          </div>

          <div className="bg-cream border border-charcoal/10 rounded-sm p-6">
            <h2 className="text-sm text-charcoal-2 mb-5">وضعیت نوبت‌ها</h2>
            <StatusPieChart counts={statusCounts} />
          </div>

          <div className="bg-cream border border-charcoal/10 rounded-sm p-6">
            <h2 className="text-sm text-charcoal-2 mb-5">مشتریان پرتکرار</h2>
            {topCustomers.length === 0 ? (
              <p className="text-charcoal-2 text-sm">
                هنوز داده‌ای برای نمایش نیست.
              </p>
            ) : (
              <div className="space-y-3">
                {topCustomers.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-charcoal/8 last:border-0"
                  >
                    <div>
                      <span className="text-[15px]">{c.name}</span>
                      <span
                        className="text-[13px] text-charcoal-2 mr-3"
                        dir="ltr"
                      >
                        {c.phone}
                      </span>
                    </div>
                    <span className="font-display text-rose-deep">
                      {c.count} نوبت
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
