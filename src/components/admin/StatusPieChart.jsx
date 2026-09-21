const colors = {
  pending: "#D97706",
  confirmed: "#059669",
  completed: "#2A2521",
};

const labels = {
  pending: "در انتظار تأیید",
  confirmed: "تأییدشده",
  completed: "انجام‌شده",
};

export default function StatusPieChart({ counts }) {
  const total = counts.pending + counts.confirmed + counts.completed;

  if (total === 0) {
    return (
      <p className="text-charcoal-2 text-sm">هنوز داده‌ای برای نمایش نیست.</p>
    );
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offsetAccum = 0;

  const segments = Object.entries(counts).map(([key, value]) => {
    const fraction = value / total;
    const length = fraction * circumference;
    const segment = {
      key,
      length,
      offset: offsetAccum,
      color: colors[key],
    };
    offsetAccum += length;
    return segment;
  });

  return (
    <div className="flex items-center gap-8 flex-wrap">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="-rotate-90 shrink-0"
      >
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="#F1E6DF"
          strokeWidth="18"
        />
        {segments.map(
          (s) =>
            s.length > 0 && (
              <circle
                key={s.key}
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke={s.color}
                strokeWidth="18"
                strokeDasharray={`${s.length} ${circumference - s.length}`}
                strokeDashoffset={-s.offset}
                strokeLinecap="butt"
              />
            )
        )}
      </svg>

      <div className="space-y-2.5">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2.5 text-sm">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: colors[key] }}
            />
            <span className="text-charcoal-2">{labels[key]}</span>
            <span className="text-charcoal">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
