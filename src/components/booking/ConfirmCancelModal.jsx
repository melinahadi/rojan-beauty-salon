import { motion } from "framer-motion";

export default function ConfirmCancelModal({ onClose, onConfirm, cancelling }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-charcoal/50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-sm p-6 w-full max-w-sm text-center"
      >
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-xl">
          !
        </div>
        <h2 className="font-display text-lg mb-2">مطمئنی می‌خوای لغو کنی؟</h2>
        <p className="text-[13.5px] text-charcoal-2 mb-6 leading-relaxed">
          در صورت لغو، بیعانه پرداخت‌شده عودت داده نمی‌شود.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-charcoal-2 hover:text-charcoal transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            disabled={cancelling}
            className="bg-red-600 text-white px-7 py-2.5 text-sm hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {cancelling ? "در حال لغو..." : "بله، لغو کن"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
