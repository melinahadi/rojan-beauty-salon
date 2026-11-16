import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero/61.webp";

export default function Hero() {
  return (
    <section
      style={{ fontFamily: "Vazirmatn, system-ui, sans-serif" }}
      className="relative h-[88vh] min-h-[560px] overflow-hidden"
    >
      <motion.img
        src={heroImage}
        alt="فضای داخلی آرایشگاه روژان"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover saturate-90 brightness-20"
        style={{ objectPosition: "15% center" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.18 }}
        transition={{ duration: 18, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />
      <div className="absolute inset-y-0 right-0 w-full md:w-3/4 bg-gradient-to-l from-charcoal/80 via-charcoal/40 to-transparent" />

      <div className="absolute bottom-16 right-6 md:right-8 max-w-xl z-10 text-cream">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="eyebrow font-extrabold text-3xl mt-7 text-gold-soft mb-5"
        >
          آرایشگاه زنانه · تهران
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl font-bold leading-tight"
        >
          هنر زیبایی، با آرامش یک رسم قدیمی
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="gold-rule w-20 mt-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-5 mb-7 text-cream/90 max-w-md leading-loose"
        >
          از رنگ و کوتاهی گرفته تا مراقبت پوست، هر سرویس در روژان با دست‌های
          استایلیست‌های باتجربه و در فضایی آرام طراحی شده.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex gap-4 flex-wrap"
        >
          <Link
            to="/booking"
            className="bg-rose-deep text-cream px-8 py-3.5 text-sm hover:bg-[#7f4448] transition-colors"
          >
            رزرو آنلاین نوبت
          </Link>

          <a
            href="#services"
            className="border border-cream/60 text-cream px-8 py-3.5 text-sm hover:bg-cream/10 hover:border-cream transition-colors"
          >
            مشاهده خدمات
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-cream/70 text-xs">
        <span className="w-px h-10 bg-gradient-to-b from-cream/0 via-gold-soft to-cream/0" />
      </div>
    </section>
  );
}
