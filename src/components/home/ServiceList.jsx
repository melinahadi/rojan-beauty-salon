import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";
import { useServices } from "../../hooks/useServices";

export default function ServiceList() {
  const { services, loading } = useServices();

  return (
    <section id="services" className="bg-cream-2 py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-8">
        <Reveal>
          <div className="max-w-xl mb-14">
            <div className="text-rose-deep text-sm mb-3">خدمات</div>
            <h2 className="font-display text-3xl md:text-4xl">
              خدماتی که با دقت انتخاب شده‌اند
            </h2>
          </div>
        </Reveal>

        {loading ? (
          <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
        ) : (
          <div>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link
                  to={`/booking?service=${s.id}`}
                  className={`group flex justify-between items-baseline gap-6 py-7 border-b border-charcoal/10 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 group-hover:text-rose-deep transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[14.5px] text-charcoal-2 max-w-[60ch]">
                      {s.description}
                    </p>
                  </div>
                  <div className="font-display text-lg text-rose-deep whitespace-nowrap">
                    از {s.price.toLocaleString("fa-IR", { useGrouping: false })}{" "}
                    تومان
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
