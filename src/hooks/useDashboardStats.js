import { useEffect, useState } from "react";

import { supabase } from "../lib/supabaseClient";

function todayIso() {
    return new Date().toISOString().slice(0, 10);
}

function weekStartIso() {
    const d = new Date();
    const day = d.getDay(); // 0 = یکشنبه در JS
    d.setDate(d.getDate() - day);

    return d.toISOString().slice(0, 10);
}

export function useDashboardStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        supabase
            .from("appointments")
            .select(
                "id, appointment_date, status, user_id, services ( price ), profiles ( full_name, phone )"
            )
            .neq("status", "cancelled")
            .then(({ data: rows }) => {
                if (ignore) return;

                setData(rows || []);
                setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    if (loading || !data) {
        return {
            loading: true,
            todayRevenue: 0,
            weekRevenue: 0,
            statusCounts: {
                pending: 0,
                confirmed: 0,
                completed: 0,
            },
            topCustomers: [],
        };
    }

    const today = todayIso();
    const weekStart = weekStartIso();

    const todayRevenue = data
        .filter((a) => a.appointment_date === today)
        .reduce(
            (sum, a) => sum + ((a.services && a.services.price) || 0),
            0
        );

    const weekRevenue = data
        .filter((a) => a.appointment_date >= weekStart)
        .reduce(
            (sum, a) => sum + ((a.services && a.services.price) || 0),
            0
        );

    const statusCounts = {
        pending: data.filter((a) => a.status === "pending").length,
        confirmed: data.filter((a) => a.status === "confirmed").length,
        completed: data.filter((a) => a.status === "completed").length,
    };

    const byCustomer = {};

    data.forEach((a) => {
        if (!a.user_id) return;

        if (!byCustomer[a.user_id]) {
            byCustomer[a.user_id] = {
                name: (a.profiles && a.profiles.full_name) || "بدون نام",
                phone: (a.profiles && a.profiles.phone) || "—",
                count: 0,
            };
        }

        byCustomer[a.user_id].count += 1;
    });

    const topCustomers = Object.values(byCustomer)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
        loading: false,
        todayRevenue,
        weekRevenue,
        statusCounts,
        topCustomers,
    };
};