import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-charcoal text-cream/75 pt-20 pb-8 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-10">
          <div>
            <div className="font-display text-2xl font-bold text-cream mb-2">
              روژان
            </div>
            <span className="gold-rule w-10 block mb-5" />
            <p className="text-sm max-w-[34ch]">
              آرایشگاه زنانه در تهران، خیابان ولیعصر، نبش کوچه بهار. از شنبه تا
              پنجشنبه، ۹ صبح تا ۸ شب.
            </p>
          </div>

          <div>
            <h4 className="text-gold-soft text-[13px] tracking-wide font-medium mb-5">
              دسترسی سریع
            </h4>
            <Link
              to="/#services"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              خدمات
            </Link>
            <Link
              to="/#stylists"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              استایلیست‌ها
            </Link>
            <Link
              to="/#gallery"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              گالری
            </Link>
          </div>

          <div>
            <h4 className="text-gold-soft text-[13px] tracking-wide font-medium mb-5">
              تماس
            </h4>
            <a
              href="tel:+982188889999"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              ۰۲۱-۸۸۸۸۹۹۹۹
            </a>
            <a
              href="mailto:hello@rojan-salon.ir"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              hello@rojan-salon.ir
            </a>
          </div>

          <div>
            <h4 className="text-gold-soft text-[13px] tracking-wide font-medium mb-5">
              شبکه‌های اجتماعی
            </h4>
            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              اینستاگرام
            </a>
            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-gold-soft transition-colors duration-300"
            >
              تلگرام
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-[13px] text-cream/50">
          <span>© ۱۴۰۵ روژان. تمامی حقوق محفوظ است.</span>
          <span>طراحی دمو برای پروژه پورتفولیو</span>
        </div>
      </div>
    </footer>
  );
}
