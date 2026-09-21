import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAdminStylists() {
    const [stylists, setStylists] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStylists = () => {
        supabase
            .from("stylists")
            .select("*, stylist_services ( service_id )")
            .order("created_at")
            .then(({ data }) => {
                setStylists(data || []);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStylists();
    }, []);

    const addStylist = async(values, serviceIds) => {
        const { data, error } = await supabase
            .from("stylists")
            .insert(values)
            .select()
            .single();
        if (error) return error;

        if (serviceIds.length > 0) {
            await supabase
                .from("stylist_services")
                .insert(
                    serviceIds.map((service_id) => ({
                        stylist_id: data.id,
                        service_id,
                    }))
                );
        }

        const defaultHours = Array.from({ length: 7 }, (_, weekday) => ({
            stylist_id: data.id,
            weekday,
            start_time: "09:00",
            end_time: "20:00",
            is_off: false,
        }));
        await supabase.from("stylist_working_hours").insert(defaultHours);

        fetchStylists();
        return null;
    };

    const updateStylist = async(id, values, serviceIds) => {
        const { error } = await supabase
            .from("stylists")
            .update(values)
            .eq("id", id);
        if (error) return error;

        await supabase.from("stylist_services").delete().eq("stylist_id", id);
        if (serviceIds.length > 0) {
            await supabase
                .from("stylist_services")
                .insert(
                    serviceIds.map((service_id) => ({ stylist_id: id, service_id }))
                );
        }
        fetchStylists();
        return null;
    };

    const deleteStylist = async(id) => {
        const { error } = await supabase.from("stylists").delete().eq("id", id);
        if (!error) fetchStylists();
        return error;
    };

    return { stylists, loading, addStylist, updateStylist, deleteStylist };
}