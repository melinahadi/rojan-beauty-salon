import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-charcoal text-cream/75 pt-16 pb-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-10">
          <div>
            <div className="font-display text-2xl font-bold text-cream mb-3.5">
              روژان
            </div>
            <p className="text-sm max-w-[34ch]">
              آرایشگاه زنانه در تهران، خیابان ولیعصر، نبش کوچه بهار. از شنبه تا
              پنجشنبه، ۹ صبح تا ۸ شب.
            </p>
          </div>

          <div>
            <h4 className="text-cream text-[14.5px] font-medium mb-4">
              دسترسی سریع
            </h4>
            <Link
              to="/#services"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              خدمات
            </Link>
            <Link
              to="/#stylists"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              استایلیست‌ها
            </Link>
            <Link
              to="/#gallery"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              گالری
            </Link>
          </div>

          <div>
            <h4 className="text-cream text-[14.5px] font-medium mb-4">تماس</h4>
            <a
              href="tel:+982188889999"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              ۰۲۱-۸۸۸۸۹۹۹۹
            </a>
            <a
              href="mailto:hello@rojan-salon.ir"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              hello@rojan-salon.ir
            </a>
          </div>

          <div>
            <h4 className="text-cream text-[14.5px] font-medium mb-4">
              شبکه‌های اجتماعی
            </h4>
            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              اینستاگرام
            </a>
            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-cream transition-colors"
            >
              تلگرام
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-[13px] text-cream/50">
          <span>© ۱۴۰۴ روژان. تمامی حقوق محفوظ است.</span>
          <span>طراحی دمو برای پروژه پورتفولیو</span>
        </div>
      </div>
    </footer>
  );
}
