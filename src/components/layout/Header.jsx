import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  { to: "/#services", label: "خدمات" },
  { to: "/#stylists", label: "استایلیست‌ها" },
  { to: "/#gallery", label: "گالری" },
  { to: "/#contact", label: "تماس" },
];

export default function Header() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isBookingPage = pathname === "/booking";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
        <div className="font-display text-2xl font-bold text-charcoal">
          روژان
        </div>

        <nav className="hidden md:flex gap-9 text-sm">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-rose-deep transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/my-appointments"
              className="hover:text-rose-deep transition-colors"
            >
              نوبت‌های من
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isBookingPage ? (
            <Link
              to="/"
              className="hidden md:inline-block bg-cream text-charcoal px-6 py-2.5 text-sm border border-charcoal/20 hover:border-charcoal/40 transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          ) : (
            <Link
              to="/booking"
              className="hidden md:inline-block bg-charcoal text-cream px-6 py-2.5 text-sm border border-charcoal hover:bg-transparent hover:text-charcoal transition-colors"
            >
              رزرو نوبت
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="باز کردن منو"
            className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[999] bg-charcoal/50 md:hidden"
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-y-0 left-0 w-[80%] max-w-xs bg-cream p-8 flex flex-col"
                style={{ backgroundColor: "#FBF7F2" }}
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="font-display text-xl">روژان</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="بستن منو"
                    className="w-9 h-9 flex items-center justify-center text-charcoal"
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
                </div>

                <nav className="flex flex-col gap-1">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="py-3.5 border-b border-charcoal/10 text-[15px] hover:text-rose-deep transition-colors"
                  >
                    بازگشت به صفحه اصلی
                  </Link>

                  {navLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setMenuOpen(false)}
                      className="py-3.5 border-b border-charcoal/10 text-[15px] hover:text-rose-deep transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}

                  {user && (
                    <Link
                      to="/my-appointments"
                      onClick={() => setMenuOpen(false)}
                      className="py-3.5 border-b border-charcoal/10 text-[15px] hover:text-rose-deep transition-colors"
                    >
                      نوبت‌های من
                    </Link>
                  )}
                </nav>

                {!isBookingPage && (
                  <Link
                    to="/booking"
                    onClick={() => setMenuOpen(false)}
                    className="mt-auto bg-charcoal text-cream text-center py-3.5 text-sm hover:bg-rose-deep transition-colors"
                  >
                    رزرو نوبت
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
