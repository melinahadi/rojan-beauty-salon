import { useState } from "react";
import { motion } from "framer-motion";


export default function ServiceModal({ service, onClose, onSave }) {
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || "");
  const [duration, setDuration] = useState(service?.duration_minutes || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !price || !duration) {
      setError("عنوان، قیمت و مدت‌زمان الزامی‌ست.");
      return;
    }

    setSaving(true);
    const err = await onSave({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      duration_minutes: Number(duration),
    });
    setSaving(false);

    if (err) {
      setError("مشکلی پیش اومد، دوباره تلاش کن.");
      return;
    }
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-charcoal/50 flex items-center justify-center p-6"
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-cream rounded-sm p-6 w-full max-w-md space-y-4"
      >
        <h2 className="font-display text-xl mb-2">
          {service ? "ویرایش خدمت" : "خدمت جدید"}
        </h2>

        <input
          type="text"
          placeholder="عنوان خدمت"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
        />
        <textarea
          placeholder="توضیح کوتاه"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep resize-none"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="قیمت (تومان)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
          />
          <input
            type="number"
            placeholder="مدت‌زمان (دقیقه)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
          />
        </div>

        {error && (
          <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded-sm px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-charcoal-2 hover:text-charcoal"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-charcoal text-cream px-7 py-2.5 text-sm hover:bg-rose-deep transition-colors disabled:opacity-60"
          >
            {saving ? "در حال ذخیره..." : "ذخیره"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
