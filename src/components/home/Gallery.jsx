import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../ui/Reveal";

const images = [
  {
    src: "src/assets/images/gallery/1.webp",
    className: "col-span-2 row-span-3",
  },
  {
    src: "src/assets/images/gallery/2.webp",
    className: "col-span-2 row-span-2",
  },
  {
    src: "src/assets/images/gallery/3.webp",
    className: "col-span-1 row-span-2",
  },
  {
    src: "src/assets/images/gallery/4.webp",
    className: "col-span-1 row-span-1",
  },
  {
    src: "src/assets/images/gallery/5.webp",
    className: "col-span-2 row-span-2",
  },
  {
    src: "src/assets/images/gallery/6.webp",
    className: "col-span-2 row-span-1",
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
    <section id="gallery" className="bg-cream-2 py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-8">
        <Reveal>
          <div className="max-w-xl mb-14">
            <div className="text-rose-deep text-sm mb-3">گالری</div>
            <h2 className="font-display text-3xl md:text-4xl">
              لحظاتی از فضای روژان
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-4 auto-rows-[140px] gap-4">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.08} className={img.className}>
              <button
                onClick={() => setSelected(img.src)}
                className="w-full h-full block cursor-zoom-in"
                aria-label="بزرگ‌نمایی تصویر"
              >
                <img
                  src={img.src}
                  alt="گالری روژان"
                  className="w-full h-full object-cover rounded-sm transition-transform duration-300 hover:scale-[1.03]"
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
            className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-6"
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
              className="max-w-full max-h-[88vh] object-contain rounded-sm"
            />

            <button
              onClick={() => setSelected(null)}
              aria-label="بستن"
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
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
