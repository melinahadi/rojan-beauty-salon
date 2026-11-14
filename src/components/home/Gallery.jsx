import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../ui/Reveal";

import gallery1 from "../../assets/images/gallery/11.webp";
import gallery2 from "../../assets/images/gallery/21.webp";
import gallery3 from "../../assets/images/gallery/31.webp";
import gallery4 from "../../assets/images/gallery/41.webp";
import gallery5 from "../../assets/images/gallery/51.webp";
import gallery6 from "../../assets/images/gallery/61.webp";


const images = [
  {
    src: gallery1,
    mobileClass: "col-span-2 aspect-[16/9]",
    desktopClass: "md:col-span-2 md:row-span-3 md:aspect-auto",
  },
  {
    src: gallery2,
    mobileClass: "col-span-1 aspect-[4/5]",
    desktopClass: "md:col-span-2 md:row-span-2 md:aspect-auto",
  },
  {
    src: gallery3,
    mobileClass: "col-span-1 aspect-[4/5]",
    desktopClass: "md:col-span-1 md:row-span-2 md:aspect-auto",
  },
  
    {
  src: gallery4,
  mobileClass: "col-span-1 aspect-[4/5]",
  desktopClass: "md:col-span-1 md:row-span-2 md:aspect-auto",
},
  {
    src: gallery5,
    mobileClass: "col-span-1 aspect-[4/5]",
    desktopClass: "md:col-span-2 md:row-span-2 md:aspect-auto",
  },
  {
    src: gallery6,
    mobileClass: "col-span-2 aspect-[16/9]",
    desktopClass: "md:col-span-2 md:row-span-1 md:aspect-auto",
  },
];


export default function Gallery() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="gallery" className="bg-cream-2 py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="max-w-xl mb-9 md:mb-14">
            <div className="text-rose-deep text-sm mb-3">گالری</div>

            <h2 className="font-display text-3xl md:text-4xl">
              لحظاتی از فضای روژان
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[140px] gap-3 md:gap-4">
          {images.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 0.08}
              className={`${img.mobileClass} ${img.desktopClass} min-w-0 min-h-0`}
            >
              <button
                onClick={() => setSelected(img.src)}
                className="w-full h-full block overflow-hidden cursor-zoom-in"
                aria-label="بزرگ‌نمایی تصویر"
              >
                <img
                  src={img.src}
                  alt="گالری روژان"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-sm transition-transform duration-500 hover:scale-[1.04]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-4 md:p-6"
          >
            <motion.img
              key={selected}
              src={selected}
              alt="نمای بزرگ تصویر گالری"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
            />

            <button
              onClick={() => setSelected(null)}
              aria-label="بستن"
              className="absolute top-5 left-5 w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
