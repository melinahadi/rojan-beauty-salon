import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useDayAvailability(stylistId, daysCount, slotsPerDay) {
    const [result, setResult] = useState({ stylistId: null, bookedCounts: {} });

    useEffect(() => {
        if (!stylistId) return;

        let ignore = false;
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + daysCount - 1);

        supabase
            .from("appointments")
            .select("appointment_date")
            .eq("stylist_id", stylistId)
            .gte("appointment_date", today.toISOString().slice(0, 10))
            .lte("appointment_date", endDate.toISOString().slice(0, 10))
            .then(({ data }) => {
                if (ignore) return;

                const counts = {};
                (data || []).forEach((row) => {
                    counts[row.appointment_date] =
                        (counts[row.appointment_date] || 0) + 1;
                });

                setResult({ stylistId, bookedCounts: counts });
            });

        return () => {
            ignore = true;
        };
    }, [stylistId, daysCount]);

    const loading = result.stylistId !== stylistId;
    const isDayFull = (iso) => (result.bookedCounts[iso] || 0) >= slotsPerDay;

    return { isDayFull, loading };
}