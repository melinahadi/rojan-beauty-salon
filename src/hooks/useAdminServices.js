import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAdminServices() {
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
    }, []);

    const addService = async(values) => {
        const { error } = await supabase.from("services").insert(values);
        if (!error) fetchServices();
        return error;
    };

    const updateService = async(id, values) => {
        const { error } = await supabase
            .from("services")
            .update(values)
            .eq("id", id);
        if (!error) fetchServices();
        return error;
    };

    const deleteService = async(id) => {
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (!error) fetchServices();
        return error;
    };

    return { services, loading, addService, updateService, deleteService };
}