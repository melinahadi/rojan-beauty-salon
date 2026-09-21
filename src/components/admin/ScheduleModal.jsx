import { useState } from "react";
import { motion } from "framer-motion";
import { DatePicker } from "@jalali-js/react";
import "@jalali-js/react/date-picker.css";
import { supabase } from "../../lib/supabaseClient";
import { useStylistSchedule } from "../../hooks/useStylistSchedule";

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

export default function ScheduleModal({ stylist, onClose }) {
  const { workingHours, timeOff, loading, refetch } = useStylistSchedule(
    stylist.id
  );
  const [hours, setHours] = useState(null);
  const [newOffDate, setNewOffDate] = useState("");
  const [offList, setOffList] = useState(null);
  const [saving, setSaving] = useState(false);

  const [syncedKey, setSyncedKey] = useState(null);
  const dataKey = `${workingHours?.length ?? 0}-${
    timeOff?.length ?? 0
  }-${loading}`;

  if (dataKey !== syncedKey) {
    setSyncedKey(dataKey);
    setHours(null);
    setOffList(null);
  }

  const currentHours = hours || workingHours;
  const currentOff = offList || timeOff;
  const updateDay = (weekday, field, value) => {
    const next = currentHours.map((h) =>
      h.weekday === weekday ? { ...h, [field]: value } : h
    );
    setHours(next);
  };

const handleSaveHours = async () => {
  setSaving(true);
  for (const h of currentHours) {
    await supabase
      .from("stylist_working_hours")
      .update({
        start_time: h.start_time,
        end_time: h.end_time,
        is_off: h.is_off,
      })
      .eq("id", h.id);
  }
  await refetch();
  setSaving(false);
};

const addOffDate = async () => {
  if (!newOffDate) return;
  const { data } = await supabase
    .from("stylist_time_off")
    .insert({ stylist_id: stylist.id, date: newOffDate })
    .select()
    .single();
  if (data) setOffList([...currentOff, data]);
  setNewOffDate("");
  await refetch();
};

const removeOffDate = async (id) => {
  await supabase.from("stylist_time_off").delete().eq("id", id);
  setOffList(currentOff.filter((o) => o.id !== id));
  await refetch();
};

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-charcoal/50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-sm p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto space-y-6"
      >
        <h2 className="font-display text-xl">برنامه کاری {stylist.name}</h2>

        {loading ? (
          <p className="text-charcoal-2 text-sm">در حال بارگذاری...</p>
        ) : (
          <>
            <div>
              <h3 className="text-sm text-charcoal-2 mb-3">ساعت کاری هفتگی</h3>
              <div className="space-y-2">
                {currentHours
                  .slice()
                  .sort((a, b) => a.weekday - b.weekday)
                  .map((h) => (
                    <div
                      key={h.weekday}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-20 shrink-0">
                        {weekDays[h.weekday]}
                      </span>
                      <label className="flex items-center gap-1.5 text-[13px] text-charcoal-2">
                        <input
                          type="checkbox"
                          checked={!h.is_off}
                          onChange={(e) =>
                            updateDay(h.weekday, "is_off", !e.target.checked)
                          }
                          className="accent-rose-deep"
                        />
                        باز
                      </label>
                      {!h.is_off && (
                        <>
                          <input
                            type="time"
                            value={h.start_time.slice(0, 5)}
                            onChange={(e) =>
                              updateDay(h.weekday, "start_time", e.target.value)
                            }
                            className="border border-charcoal/20 rounded-sm px-2 py-1 text-sm bg-transparent"
                          />
                          <span className="text-charcoal-2">تا</span>
                          <input
                            type="time"
                            value={h.end_time.slice(0, 5)}
                            onChange={(e) =>
                              updateDay(h.weekday, "end_time", e.target.value)
                            }
                            className="border border-charcoal/20 rounded-sm px-2 py-1 text-sm bg-transparent"
                          />
                        </>
                      )}
                    </div>
                  ))}
              </div>
              <button
                onClick={handleSaveHours}
                disabled={saving}
                className="mt-4 bg-charcoal text-cream px-6 py-2.5 text-sm hover:bg-rose-deep transition-colors disabled:opacity-60"
              >
                {saving ? "در حال ذخیره..." : "ذخیره ساعت کاری"}
              </button>
            </div>

            <div className="pt-4 border-t border-charcoal/10">
              <h3 className="text-sm text-charcoal-2 mb-3">
                تعطیلی/مرخصی روزهای خاص
              </h3>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <DatePicker
                  system="jalali"
                  locale="fa"
                  valueFormat="gregorian-iso"
                  placeholder="انتخاب تاریخ"
                  onChange={(value) => setNewOffDate(value || "")}
                  className="admin-datepicker"
                />
                <button
                  onClick={addOffDate}
                  className="px-4 py-2 text-[13px] border border-charcoal/20 rounded-sm hover:border-charcoal/40 transition-colors"
                >
                  + افزودن
                </button>
              </div>
              {currentOff.length === 0 ? (
                <p className="text-[13px] text-charcoal-2">
                  تعطیلی خاصی ثبت نشده.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {currentOff.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between text-sm bg-cream-2 rounded-sm px-3 py-2"
                    >
                      <span>
                        {new Date(o.date).toLocaleDateString("fa-IR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() => removeOffDate(o.id)}
                        className="text-red-700 text-[13px] hover:text-red-800"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm text-charcoal-2 hover:text-charcoal"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </div>
  );
}
