import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useStylistSchedule } from "../../hooks/useStylistSchedule";
import { computeAvailableSlots } from "../../lib/scheduling";

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

function getNextDays(count) {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function DateTimeStep({
  stylistId,
  durationMinutes,
  date,
  time,
  onSelectDate,
  onSelectTime,
}) {
  const {
    workingHours,
    timeOff,
    loading: scheduleLoading,
  } = useStylistSchedule(stylistId);
  const [bookedByDate, setBookedByDate] = useState({});
  const [fetchedRange, setFetchedRange] = useState(null);

  const timeOffDates = timeOff.map((t) => t.date);
  const dayCount = 20;
  const allDays = getNextDays(dayCount);

  useEffect(() => {
    if (!stylistId) return;

    const today = allDays[0];
    const endDate = allDays[allDays.length - 1];
    const fromIso = today.toISOString().slice(0, 10);
    const toIso = endDate.toISOString().slice(0, 10);
    const key = `${stylistId}_${fromIso}_${toIso}`;
    if (fetchedRange === key) return;

    supabase
      .from("appointments")
      .select(
        "appointment_date, appointment_time, services ( duration_minutes )"
      )
      .eq("stylist_id", stylistId)
      .in("status", ["pending", "confirmed"])
      .gte("appointment_date", fromIso)
      .lte("appointment_date", toIso)
      .then(({ data }) => {
        const grouped = {};
        (data || []).forEach((row) => {
          const startMin =
            Number(row.appointment_time.slice(0, 2)) * 60 +
            Number(row.appointment_time.slice(3, 5));
          const dur = row.services?.duration_minutes || 60;
          if (!grouped[row.appointment_date])
            grouped[row.appointment_date] = [];
          grouped[row.appointment_date].push({
            start: startMin,
            end: startMin + dur,
          });
        });
        setBookedByDate(grouped);
        setFetchedRange(key);
      });
  }, [stylistId, fetchedRange]);

  const getSlotsForDate = (dateIso) => {
    const weekday = new Date(dateIso).getDay();
    const workingHour = workingHours.find((w) => w.weekday === weekday);
    return computeAvailableSlots({
      dateIso,
      workingHour,
      timeOffDates,
      bookedIntervals: bookedByDate[dateIso] || [],
      durationMinutes: durationMinutes || 60,
    });
  };

  const firstTen = allDays.slice(0, 10);
  const allFirstTenFull = firstTen.every(
    (d) => getSlotsForDate(d.toISOString().slice(0, 10)).length === 0
  );
  const daysToShow = allFirstTenFull ? allDays : firstTen;

  const loading = scheduleLoading || fetchedRange === null;

  return (
    <div>
      <h2 className="font-display text-2xl mb-2">چه روزی و چه ساعتی؟</h2>
      <p className="text-charcoal-2 text-sm mb-8">
        {allFirstTenFull
          ? "۱۰ روز نزدیک پر شده — این‌ها روزهای بعدی‌ان."
          : "یکی از روزهای نزدیک رو انتخاب کن."}
      </p>

      {loading ? (
        <p className="text-charcoal-2 text-sm mb-8">
          در حال بررسی روزهای خالی...
        </p>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5 mb-8">
          {daysToShow.map((d) => {
            const iso = d.toISOString().slice(0, 10);
            const full = getSlotsForDate(iso).length === 0;
            const isSelected = date === iso;
            return (
              <button
                key={iso}
                onClick={() => !full && onSelectDate(iso)}
                disabled={full}
                className={`py-3 rounded-sm border text-center transition-colors ${
                  full
                    ? "border-charcoal/10 text-charcoal-2/40 cursor-not-allowed"
                    : isSelected
                    ? "border-rose-deep bg-rose-deep text-cream"
                    : "border-charcoal/15 hover:border-charcoal/35"
                }`}
              >
                <div className="text-[11px] mb-1 opacity-80">
                  {weekDays[d.getDay()]}
                </div>
                <div className="font-display text-lg">
                  {d.toLocaleDateString("fa-IR", { day: "numeric" })}
                </div>
                <div className="text-[10px] opacity-70">
                  {d.toLocaleDateString("fa-IR", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {date && !loading && (
        <div>
          <h3 className="text-sm text-charcoal-2 mb-4">ساعت‌های خالی</h3>
          {(() => {
            const slots = getSlotsForDate(date);
            if (slots.length === 0) {
              return (
                <p className="text-charcoal-2 text-sm">
                  ساعت خالی‌ای برای این روز نیست.
                </p>
              );
            }
            return (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {slots.map((t) => (
                  <button
                    key={t}
                    onClick={() => onSelectTime(t)}
                    className={`py-3 rounded-sm border text-sm transition-colors ${
                      time === t
                        ? "border-rose-deep bg-rose-deep text-cream"
                        : "border-charcoal/15 hover:border-charcoal/35"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
