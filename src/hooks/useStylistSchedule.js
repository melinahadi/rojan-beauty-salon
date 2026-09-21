import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useStylistSchedule(stylistId) {
    const [result, setResult] = useState({
        stylistId: null,
        workingHours: [],
        timeOff: [],
    });

    const fetchSchedule = () => {
        if (!stylistId) return;

        Promise.all([
            supabase
            .from("stylist_working_hours")
            .select("*")
            .eq("stylist_id", stylistId)
            .order("weekday"),
            supabase
            .from("stylist_time_off")
            .select("*")
            .eq("stylist_id", stylistId)
            .order("date"),
        ]).then(([hoursRes, offRes]) => {
            setResult({
                stylistId,
                workingHours: hoursRes.data || [],
                timeOff: offRes.data || [],
            });
        });
    };

    useEffect(() => {
        if (!stylistId) return;

        fetchSchedule();

        const channel = supabase
            .channel(`stylist-schedule-${stylistId}`)
            .on(
                "postgres_changes", {
                    event: "*",
                    schema: "public",
                    table: "stylist_working_hours",
                    filter: `stylist_id=eq.${stylistId}`,
                },
                fetchSchedule
            )
            .on(
                "postgres_changes", {
                    event: "*",
                    schema: "public",
                    table: "stylist_time_off",
                    filter: `stylist_id=eq.${stylistId}`,
                },
                fetchSchedule
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [stylistId]);

    const loading = result.stylistId !== stylistId;
    return {
        workingHours: result.workingHours,
        timeOff: result.timeOff,
        loading,
        refetch: fetchSchedule,
    };
}