import Reveal from "../ui/Reveal";

import stylist1 from "../../assets/images/stylists/11.webp";
import stylist2 from "../../assets/images/stylists/21.webp";
import stylist3 from "../../assets/images/stylists/31.webp";

const stylists = [
  {
    name: "نگار احمدی",
    role: "متخصص رنگ و بالیاژ",
    img: stylist1,
  },
  {
    name: "سارا مرادی",
    role: "متخصص کوتاهی و فرم",
    img: stylist2,
  },
  {
    name: "مریم کریمی",
    role: "متخصص شینیون و عروس",
    img: stylist3,
  },
];

export default function StylistGrid() {
  return (
    <section id="stylists" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-xl mb-14">
          <div className="eyebrow mb-4">تیم ما</div>

          <h2 className="font-display text-3xl md:text-4xl leading-snug">
            استایلیست‌هایی که می‌شناسینشون
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {stylists.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className="group">
                <div className="relative overflow-hidden rounded-sm mb-5 aspect-[4/5]">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                </div>

                <h3 className="font-display text-xl mb-1.5">{s.name}</h3>

                <span className="text-[13.5px] text-gold tracking-wide">
                  {s.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
