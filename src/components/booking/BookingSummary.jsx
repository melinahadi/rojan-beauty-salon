export default function BookingSummary({ service, stylist, date, time }) {
  return (
    <div className="bg-cream-2 rounded-sm p-6 sticky top-24">
      <h3 className="font-display text-lg mb-5">خلاصه نوبت</h3>

      <div className="space-y-3.5 text-sm">
        <SummaryRow label="سرویس" value={service?.title} />
        <SummaryRow label="استایلیست" value={stylist?.name} />
        <SummaryRow
          label="تاریخ"
          value={
            date &&
            new Date(date).toLocaleDateString("fa-IR", {
              day: "numeric",
              month: "long",
            })
          }
        />
        <SummaryRow label="ساعت" value={time} />
      </div>

      {service && (
        <div className="flex justify-between items-baseline pt-4 mt-4 border-t border-charcoal/10">
          <span className="text-charcoal-2 text-sm">مجموع</span>
          <span className="font-display text-rose-deep text-lg">
            {service.price.toLocaleString("fa-IR", { useGrouping: false })} ت{" "}
          </span>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-charcoal-2">{label}</span>
      <span className={value ? "text-charcoal" : "text-charcoal-2/50"}>
        {value || "—"}
      </span>
    </div>
  );
}
