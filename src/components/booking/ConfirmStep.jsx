export default function ConfirmStep({
  service,
  stylist,
  date,
  time,
  notes,
  onNotesChange,
}) {
  const dateObj = new Date(date);

  return (
    <div>
      <h2 className="font-display text-2xl mb-2">همه‌چیز درسته؟</h2>
      <p className="text-charcoal-2 text-sm mb-8">
        قبل از ثبت نهایی، یه بار مرور کن.
      </p>

      <div className="border border-charcoal/15 rounded-sm p-6 space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-2">سرویس</span>
          <span>{service?.title}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-2">استایلیست</span>
          <span>{stylist?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-2">تاریخ</span>
          <span>
            {dateObj.toLocaleDateString("fa-IR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-2">ساعت</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between text-sm pt-4 border-t border-charcoal/10">
          <span className="text-charcoal-2">هزینه تقریبی</span>
          <span className="font-display text-rose-deep text-lg">
            {service?.price.toLocaleString("fa-IR", { useGrouping: false })}{" "}
            تومان{" "}
          </span>
        </div>
      </div>

      <label className="block text-sm text-charcoal-2 mb-2">
        توضیح اضافه (اختیاری)
      </label>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={3}
        placeholder="مثلاً حساسیت خاص یا درخواست ویژه..."
        className="w-full border border-charcoal/20 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-rose-deep transition-colors resize-none"
      />
    </div>
  );
}
