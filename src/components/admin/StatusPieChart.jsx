const STATUS_CONFIG = [
  {
    key: "pending",
    aliases: ["pending", "waiting", "در انتظار", "pending_review"],
    label: "در انتظار",
    color: "#D6A45F",
  },
  {
    key: "confirmed",
    aliases: [
      "confirmed",
      "approved",
      "accepted",
      "تایید شده",
      "تأیید شده",
      "تاییدشده",
    ],
    label: "تأیید شده",
    color: "#9C718D",
  },
  {
    key: "completed",
    aliases: [
      "completed",
      "complete",
      "done",
      "finished",
      "تکمیل شده",
      "انجام شده",
    ],
    label: "تکمیل شده",
    color: "#829A83",
  },
  {
    key: "cancelled",
    aliases: [
      "cancelled",
      "canceled",
      "rejected",
      "لغو شده",
      "لغوشده",
      "رد شده",
    ],
    label: "لغو شده",
    color: "#C98282",
  },
];

const EXTRA_COLORS = ["#8B91A8", "#B69A80", "#7A9C9A"];

const normalize = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "");

function getEntries(counts) {
  if (Array.isArray(counts)) {
    return counts.map((item) => [
      item.status ?? item.name ?? item.label ?? "نامشخص",
      item.count ?? item.value ?? 0,
    ]);
  }

  return Object.entries(counts || {});
}

function getChartData(counts) {
  const entries = getEntries(counts);
  const usedIndexes = new Set();

  const knownStatuses = STATUS_CONFIG.map((status) => {
    const index = entries.findIndex(([key], i) => {
      if (usedIndexes.has(i)) return false;

      return status.aliases.some(
        (alias) => normalize(alias) === normalize(key)
      );
    });

    if (index !== -1) usedIndexes.add(index);

    return {
      ...status,
      value: index === -1 ? 0 : Math.max(0, Number(entries[index][1]) || 0),
    };
  });

  const extraStatuses = entries
    .filter((_, index) => !usedIndexes.has(index))
    .map(([key, value], index) => ({
      key: String(key),
      label: String(key),
      value: Math.max(0, Number(value) || 0),
      color: EXTRA_COLORS[index % EXTRA_COLORS.length],
    }));

  return [...knownStatuses, ...extraStatuses];
}

const formatNumber = (value) => value.toLocaleString("fa-IR");

export default function StatusPieChart({ counts }) {
  const data = getChartData(counts);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[230px_1fr]">
      {/* Donut Chart */}

      <div className="relative mx-auto w-full max-w-[230px]">
        <svg
          viewBox="0 0 190 190"
          className="w-full overflow-visible"
          role="img"
          aria-label={`مجموع ${formatNumber(total)} نوبت`}
        >
          {/* Background Circle */}

          <circle
            cx="95"
            cy="95"
            r={radius}
            fill="none"
            stroke="#EAE2DC"
            strokeWidth="17"
          />

          {/* Chart Segments */}

          {total > 0 &&
            data.map((item) => {
              const length = (item.value / total) * circumference;

              const offset = currentOffset;
              currentOffset += length;

              return (
                <circle
                  key={item.key}
                  cx="95"
                  cy="95"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="17"
                  strokeLinecap="butt"
                  strokeDasharray={`${length} ${circumference}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 95 95)"
                  className="transition-all duration-700"
                />
              );
            })}
        </svg>

        {/* Center Content */}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-charcoal-2">مجموع نوبت‌ها</span>

          <strong className="mt-1 font-display text-4xl font-semibold text-charcoal">
            {formatNumber(total)}
          </strong>

          <span className="mt-1 text-xs text-charcoal-2">نوبت</span>
        </div>
      </div>

      {/* Legend */}

      <div className="w-full">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-charcoal">
            جزئیات وضعیت‌ها
          </h3>

          <span className="text-xs text-charcoal-2">
            {formatNumber(data.filter((item) => item.value > 0).length)} وضعیت
            فعال
          </span>
        </div>

        <div className="space-y-4">
          {data.map((item) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;

            return (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />

                    <span className="text-sm text-charcoal">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-charcoal-2">
                      {formatNumber(percentage.toFixed(1))}٪
                    </span>

                    <strong className="min-w-8 text-left text-sm font-semibold text-charcoal">
                      {formatNumber(item.value)}
                    </strong>
                  </div>
                </div>

                {/* Progress Bar */}

                <div className="h-1.5 overflow-hidden rounded-full bg-stone-200/70">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {total === 0 && (
          <p className="mt-5 rounded-xl bg-white/70 px-4 py-3 text-center text-xs text-charcoal-2">
            هنوز نوبتی برای نمایش نمودار ثبت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}
