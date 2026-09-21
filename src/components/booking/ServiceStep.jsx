import { useServices } from "../../hooks/useServices";

export default function ServiceStep({ selected, onSelect }) {
  const { services, loading } = useServices();

  if (loading) {
    return <p className="text-charcoal-2 text-sm">در حال بارگذاری خدمات...</p>;
  }

  return (
    <div>
      <h2 className="font-display text-2xl mb-2">
        سرویس مورد نظرت رو انتخاب کن
      </h2>
      <p className="text-charcoal-2 text-sm mb-8">
        می‌تونی فقط یکی رو برای این نوبت انتخاب کنی.
      </p>

      <div className="space-y-3">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`w-full text-right p-5 rounded-sm border transition-colors flex justify-between items-center gap-4 cursor-pointer ${
              selected?.id === s.id
                ? "border-rose-deep bg-rose-deep/5"
                : "border-charcoal/15 hover:border-charcoal/35"
            }`}
          >
            <div>
              <h3 className="text-[17px] mb-1">{s.title}</h3>
              <p className="text-[13.5px] text-charcoal-2">{s.description}</p>
              <span className="text-[12.5px] text-charcoal-2/80">
                حدود {s.duration_minutes} دقیقه
              </span>
            </div>
            <div className="font-display text-rose-deep whitespace-nowrap text-[17px]">
              {s.price.toLocaleString("fa-IR", { useGrouping: false })} ت{" "}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
