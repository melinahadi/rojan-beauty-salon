import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminServices } from "../../hooks/useAdminServices";
import { useImageUpload } from "../../hooks/useImageUpload";

export default function StylistModal({ stylist, onClose, onSave }) {
  const { services } = useAdminServices();
  const [name, setName] = useState(stylist?.name || "");
  const [role, setRole] = useState(stylist?.role || "");
  const [photoUrl, setPhotoUrl] = useState(stylist?.photo_url || "");
  const { uploadImage, uploading } = useImageUpload("stylist-photos");
  const [preview, setPreview] = useState(stylist?.photo_url || null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setError("");

    const { url, error: uploadError } = await uploadImage(file);
    if (uploadError) {
      setError("آپلود عکس با مشکل مواجه شد.");
      return;
    }
    setPhotoUrl(url);
  };
  const [selectedServices, setSelectedServices] = useState(
    stylist?.stylist_services?.map((s) => s.service_id) || []
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !role.trim()) {
      setError("نام و تخصص الزامی‌ست.");
      return;
    }

    setSaving(true);
    const err = await onSave(
      {
        name: name.trim(),
        role: role.trim(),
        photo_url: photoUrl.trim() || null,
      },
      selectedServices
    );
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
        className="bg-cream rounded-sm p-6 w-full max-w-md space-y-4 max-h-[85vh] overflow-y-auto"
      >
        <h2 className="font-display text-xl mb-2">
          {stylist ? "ویرایش استایلیست" : "استایلیست جدید"}
        </h2>

        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
        />
        <input
          type="text"
          placeholder="تخصص (مثلاً متخصص رنگ و های‌لایت)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:border-rose-deep"
        />
        <div>
          <label className="block text-sm text-charcoal-2 mb-2">
            عکس استایلیست
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cream-2 overflow-hidden shrink-0 border border-charcoal/10">
              {preview && (
                <img
                  src={preview}
                  alt="پیش‌نمایش"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="border border-dashed border-charcoal/25 rounded-sm px-4 py-3 text-[13px] text-charcoal-2 text-center hover:border-charcoal/45 transition-colors">
                {uploading
                  ? "در حال آپلود..."
                  : "انتخاب عکس "}
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-charcoal-2 mb-2">
            خدماتی که ارائه می‌ده
          </label>
          <div className="border border-charcoal/15 rounded-sm p-3 space-y-2 max-h-40 overflow-y-auto">
            {services.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-2.5 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(s.id)}
                  onChange={() => toggleService(s.id)}
                  className="accent-rose-deep"
                />
                {s.title}
              </label>
            ))}
          </div>
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
            disabled={saving || uploading}
            className="bg-charcoal text-cream px-7 py-2.5 text-sm hover:bg-rose-deep transition-colors disabled:opacity-60"
          >
            {saving ? "در حال ذخیره..." : "ذخیره"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
