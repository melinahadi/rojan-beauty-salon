import Reveal from "../ui/Reveal";

import stylist1 from "../../assets/images/stylists/1.webp";
import stylist2 from "../../assets/images/stylists/2.webp";
import stylist3 from "../../assets/images/stylists/3.webp";

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
      <div className="max-w-6xl mx-auto px-8">
        <div className="max-w-xl mb-14">
          <div className="text-rose-deep text-sm mb-3">تیم ما</div>

          <h2 className="font-display text-3xl md:text-4xl">
            استایلیست‌هایی که می‌شناسینشون
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stylists.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className="group">
                <div className="overflow-hidden rounded-sm mb-4.5 aspect-[4/5]">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <h3 className="text-xl mb-1">{s.name}</h3>

                <span className="text-[13.5px] text-rose-deep">{s.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
