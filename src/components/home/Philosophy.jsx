import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";

export default function Philosophy() {
  return ( 
    
    <section className="py-28 md:py-32">
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
        <img
          src="src/assets/images/philosophy/1.webp"
          alt="استایلیست در حال کار روی موی مشتری"
          className="w-full h-full object-cover rounded-sm"
        />
        <Reveal>
          <div>
            <div className="text-rose-deep text-sm mb-3.5">درباره روژان</div>
            <h2 className="font-display text-3xl md:text-4xl leading-snug mb-5">
              هر نوبت، یک وقفه‌ی کوتاه از شلوغی روزمره است
            </h2>
            <p className="text-charcoal-2 max-w-[52ch]">
              روژان از سال ۱۳۹۱ با یک هدف ساده شروع شد: جایی که مراقبت از مو و
              پوست، بدون عجله و با توجه واقعی به خواسته‌ی هر مشتری انجام شود.
              تیم ما ترکیبی از تجربه‌ی کلاسیک و تکنیک‌های روز دنیا رو با هم
              می‌آره.
            </p>

            <div className="flex gap-9 mt-9 pt-7 border-t border-charcoal/10">
              <div className="text-sm text-charcoal-2">
                <b className="block font-display text-2xl text-charcoal">
                  <CountUp to={2400} suffix="+" duration={0.9} />
                </b>
                مشتری همیشگی
              </div>
              <div className="text-sm text-charcoal-2">
                <b className="block font-display text-2xl text-charcoal">
                  <CountUp to={6} duration={0.7} />
                </b>
                نوع سرویس تخصصی
              </div>
              <div className="text-sm text-charcoal-2">
                <b className="block font-display text-2xl text-charcoal">
                  <CountUp to={7} duration={0.7} />
                </b>
                روز هفته باز
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
