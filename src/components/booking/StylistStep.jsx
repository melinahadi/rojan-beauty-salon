import { useStylists } from "../../hooks/useStylists";

export default function StylistStep({ serviceId, selected, onSelect }) {
  const { stylists, loading } = useStylists(serviceId);

  if (loading) {
    return (
      <p className="text-charcoal-2 text-sm">در حال بارگذاری استایلیست‌ها...</p>
    );
  }

  if (stylists.length === 0) {
    return (
      <p className="text-charcoal-2 text-sm">
        فعلاً استایلیستی برای این سرویس ثبت نشده.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl mb-2">
        با کدوم استایلیست راحت‌تری؟
      </h2>
      <p className="text-charcoal-2 text-sm mb-8">
        اگه فرقی برات نداره، هرکدوم رو انتخاب کن.
      </p>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5">
        {" "}
        {stylists.map((st) => (
          <button
            key={st.id}
            onClick={() => onSelect(st)}
            className={`p-5 rounded-sm border text-center transition-colors cursor-pointer ${
              selected?.id === st.id
                ? "border-rose-deep bg-rose-deep/5"
                : "border-charcoal/15 hover:border-charcoal/35"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-cream-2 mx-auto mb-3 overflow-hidden">
              {st.photo_url && (
                <img
                  src={st.photo_url}
                  alt={st.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-[15px] mb-1">{st.name}</h3>
            <span className="text-[12.5px] text-rose-deep">{st.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
