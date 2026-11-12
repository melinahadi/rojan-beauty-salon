import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchServices = async() => {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at");

            if (!isMounted) return;

            if (error) {
                console.error("Error fetching services:", error);
                setError(error);
                setServices([]);
            } else {
                setServices(data || []);
                setError(null);
            }

            setLoading(false);
        };

        fetchServices();

        return () => {
            isMounted = false;
        };
    }, []);

    return { services, loading, error };
}