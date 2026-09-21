import Reveal from "../ui/Reveal";
import { Link } from "react-router-dom";

export default function CtaBand() {
  return (
    <section id="book" className="bg-charcoal text-cream py-24 text-center">
      <Reveal>
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display text-3xl md:text-4xl mb-4.5">
            نوبتت رو همین حالا رزرو کن
          </h2>
          <p className="text-cream/75 max-w-lg mx-auto mb-8 text-[15.5px]">
            انتخاب سرویس، استایلیست و ساعت دلخواه، فقط در چند ثانیه — بدون تماس
            تلفنی.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-rose-deep text-cream px-9 py-3.5 text-sm hover:bg-[#7f4448] transition-colors"
          >
            رفتن به صفحه رزرو
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
