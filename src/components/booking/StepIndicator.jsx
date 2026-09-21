const steps = ["سرویس", "استایلیست", "تاریخ و ساعت", "تأیید"];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors ${
                i < current
                  ? "bg-rose-deep text-cream"
                  : i === current
                  ? "bg-charcoal text-cream"
                  : "bg-cream-2 text-charcoal-2 border border-charcoal/15"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-[13px] hidden md:inline ${
                i === current ? "text-charcoal" : "text-charcoal-2"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px flex-1 transition-colors ${
                i < current ? "bg-rose-deep" : "bg-charcoal/15"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
