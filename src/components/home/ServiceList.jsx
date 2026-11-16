import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";
import { useServices } from "../../hooks/useServices";
import { formatPrice } from "../../lib/formatPrice";

export default function ServiceList() {
  const { services, loading } = useServices();

  return (
    <section id="services" className="bg-cream-2 py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <Reveal>
          <div className="max-w-xl mb-14">
            <div className="eyebrow mb-4">خدمات</div>
            <h2 className="font-display text-3xl md:text-4xl leading-snug">
              خدماتی که با دقت انتخاب شده‌اند
            </h2>
          </div>
        </Reveal>

        {loading ? (
          <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
        ) : (
          <div>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <Link
                  to={`/booking?service=${s.id}`}
                  className={`group relative flex justify-between items-center gap-6 py-7 px-3 md:px-5 -mx-3 md:-mx-5 border-b border-charcoal/10 transition-colors duration-500 hover:bg-cream ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <span className="absolute inset-y-0 right-0 w-px bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                  <div className="flex-1">
                    <h3 className="text-xl mb-2 transition-colors duration-300 group-hover:text-rose-deep">
                      {s.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-charcoal-2 max-w-[60ch]">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                    <span className="font-display text-lg text-gold">
                      از {formatPrice(s.price)} تومان
                    </span>
                    <span className="text-xs text-charcoal-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      رزرو این خدمت ←
                    </span>
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
