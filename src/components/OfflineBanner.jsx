import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 inset-x-0 z-[200] bg-amber-600 text-white text-center text-[13px] py-2.5"
        >
          اتصال اینترنت قطعه — تا وصل نشه، اطلاعات جدید بارگذاری نمی‌شن.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
