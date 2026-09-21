import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = () => {
        supabase
            .from("services")
            .select("*")
            .order("created_at")
            .then(({ data }) => {
                setServices(data || []);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchServices();

        const channel = supabase
            .channel("public-services-changes")
            .on(
                "postgres_changes", { event: "*", schema: "public", table: "services" },
                fetchServices
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { services, loading };
}