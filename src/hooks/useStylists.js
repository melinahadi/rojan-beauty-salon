import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useStylists(serviceId) {
    const [result, setResult] = useState({ serviceId: null, stylists: [] });

    const fetchStylists = () => {
        if (!serviceId) return;
        supabase
            .from("stylist_services")
            .select("stylists ( id, name, role, photo_url )")
            .eq("service_id", serviceId)
            .then(({ data }) => {
                setResult({
                    serviceId,
                    stylists: (data || []).map((row) => row.stylists),
                });
            });
    };

    useEffect(() => {
        if (!serviceId) return;

        fetchStylists();

        const channel = supabase
            .channel(`public-stylists-${serviceId}`)
            .on(
                "postgres_changes", { event: "*", schema: "public", table: "stylist_services" },
                fetchStylists
            )
            .on(
                "postgres_changes", { event: "*", schema: "public", table: "stylists" },
                fetchStylists
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [serviceId]);

    const loading = result.serviceId !== serviceId;
    return { stylists: result.stylists, loading };
}