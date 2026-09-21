import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const id = hash.replace("#", "");
        const delays = [50, 200, 400, 700, 1100];
        const timeouts = [];

        delays.forEach((delay) => {
            const t = setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [hash]);
}