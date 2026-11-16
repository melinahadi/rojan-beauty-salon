import Reveal from "../ui/Reveal";
import { Link } from "react-router-dom";

export default function CtaBand() {
  return (
    <section
      id="book"
      className="relative bg-charcoal text-cream py-28 text-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-gold/10 blur-3xl" />
      <Reveal>
        <div className="relative max-w-6xl mx-auto px-6 md:px-8">
          <div className="eyebrow text-gold-soft justify-center mb-5">
            رزرو آنلاین
          </div>
          <h2 className="font-display text-3xl md:text-4xl mb-5 leading-snug">
            نوبتت رو همین حالا رزرو کن
          </h2>
          <div className="gold-rule mx-auto mb-6" />
          <p className="text-cream/75 max-w-lg mx-auto mb-10 text-[15.5px] leading-loose">
            انتخاب سرویس، استایلیست و ساعت دلخواه، فقط در چند ثانیه — بدون تماس
            تلفنی.
          </p>
          <Link
            to="/booking"
            className="btn-luxe inline-block bg-rose-deep text-cream px-10 py-4 text-sm hover:bg-[#7f4448] hover:shadow-[0_10px_30px_-10px_rgba(156,90,94,0.9)]"
          >
            رفتن به صفحه رزرو
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
