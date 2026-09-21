import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./useAuth";

export function useProfile() {
    const { user } = useAuth();
    const [result, setResult] = useState({ userId: null, profile: null });

    useEffect(() => {
        if (!user) return;

        supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()
            .then(({ data }) => {
                setResult({ userId: user.id, profile: data });
            });
    }, [user]);

    const loading = user && result.userId !== user.id;
    return { profile: result.profile, loading };
}