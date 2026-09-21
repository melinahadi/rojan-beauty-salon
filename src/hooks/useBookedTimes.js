import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useBookedTimes(stylistId, date) {
    const [result, setResult] = useState({ key: null, times: [] });

    useEffect(() => {
        if (!stylistId || !date) return;

        let ignore = false;
        const key = `${stylistId}_${date}`;

        supabase
            .from("appointments")
            .select("appointment_time")
            .eq("stylist_id", stylistId)
            .eq("appointment_date", date)
            .then(({ data }) => {
                if (ignore) return;
                setResult({
                    key,
                    times: (data || []).map((r) => r.appointment_time.slice(0, 5)),
                });
            });

        return () => {
            ignore = true;
        };
    }, [stylistId, date]);

    const currentKey = stylistId && date ? `${stylistId}_${date}` : null;
    const loading = result.key !== currentKey;
    const isTimeBooked = (t) => result.times.includes(t);

    return { isTimeBooked, loading };
}