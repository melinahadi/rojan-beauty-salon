export function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

export function minutesToTime(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * محاسبه اسلات‌های خالی یه روز خاص برای یه استایلیست
 * workingHour: { start_time, end_time, is_off } برای همون روز هفته
 * timeOffDates: آرایه‌ای از تاریخ‌های (YYYY-MM-DD) تعطیل این استایلیست
 * bookedIntervals: آرایه‌ای از { start, end } به‌دقیقه (فقط برای همون تاریخ)
 * durationMinutes: مدت‌زمان سرویس موردنظر
 */
export function computeAvailableSlots({
    dateIso,
    workingHour,
    timeOffDates,
    bookedIntervals,
    durationMinutes,
    slotInterval = 30,
}) {
    if (!workingHour || workingHour.is_off) return [];
    if (timeOffDates.includes(dateIso)) return [];

    const start = timeToMinutes(workingHour.start_time.slice(0, 5));
    const end = timeToMinutes(workingHour.end_time.slice(0, 5));

    const slots = [];
    for (let t = start; t + durationMinutes <= end; t += slotInterval) {
        const slotEnd = t + durationMinutes;
        const overlaps = bookedIntervals.some(
            (b) => t < b.end && slotEnd > b.start
        );
        if (!overlaps) slots.push(minutesToTime(t));
    }
    return slots;
}
