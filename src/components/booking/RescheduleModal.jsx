import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import DateTimeStep from "./DateTimeStep";

export default function RescheduleModal({ appointment, onClose, onDone }) {
  const [date, setDate] = useState(appointment.appointment_date);
  const [time, setTime] = useState(appointment.appointment_time?.slice(0, 5));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSubmitting(true);
    setError("");

    const { error } = await supabase
      .from("appointments")
      .update({ appointment_date: date, appointment_time: time })
      .eq("id", appointment.id);

    setSubmitting(false);

    if (error) {
      setError(
        error.code === "23505"
          ? "این ساعت قبلاً توسط شخص دیگری رزرو شده."
          : "مشکلی پیش اومد، دوباره تلاش کن."
      );
      return;
    }

    onDone();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-charcoal/60 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-sm p-6 md:p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl">تغییر زمان نوبت</h2>
          <button
            onClick={onClose}
            className="text-charcoal-2 hover:text-charcoal"
          >
            ✕
          </button>
        </div>

        <DateTimeStep
          stylistId={appointment.stylist_id}
          durationMinutes={appointment.services?.duration_minutes}
          date={date}
          time={time}
          onSelectDate={(d) => {
            setDate(d);
            setTime(null);
          }}
          onSelectTime={setTime}
        />

        {error && (
          <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded-sm px-3 py-2 mt-4">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm text-charcoal-2 hover:text-charcoal transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            disabled={!date || !time || submitting}
            className="bg-rose-deep text-cream px-8 py-2.5 text-sm hover:bg-[#7f4448] transition-colors disabled:opacity-50"
          >
            {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
