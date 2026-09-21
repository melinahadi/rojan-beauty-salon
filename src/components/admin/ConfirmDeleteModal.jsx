import { motion } from "framer-motion";

export default function ConfirmDeleteModal({ title, onClose, onConfirm }) {
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
        <h2 className="font-display text-lg mb-2">حذف بشه؟</h2>
        <p className="text-charcoal-2 text-sm mb-6">
          «{title}» برای همیشه حذف می‌شه.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-charcoal-2 hover:text-charcoal"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2.5 text-sm hover:bg-red-700 transition-colors"
          >
            حذف کن
          </button>
        </div>
      </motion.div>
    </div>
  );
}
