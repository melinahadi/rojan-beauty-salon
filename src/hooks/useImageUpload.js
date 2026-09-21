import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useImageUpload(bucket) {
    const [uploading, setUploading] = useState(false);


    const uploadImage = async(file) => {
        setUploading(true);

        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("Storage upload error:", error);
        }

        setUploading(false);

        if (error) return { url: null, error };

        setUploading(false);

        if (error) return { url: null, error };

        const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
        return { url: data.publicUrl, error: null };
    };

    return { uploadImage, uploading };
}