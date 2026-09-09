"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Tour } from "@/interfaces/Tour";
import { isUuid } from "@/lib/uuid";

export function useTour(slugOrId?: string) {
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!slugOrId) {
            setLoading(false);
            return;
        }

        const fetchTour = async () => {
            try {
                setLoading(true);

                const query = supabase
                    .from("gobeyond_tours")
                    .select("*")
                    .limit(1);

                const { data, error } = isUuid(slugOrId)
                    ? await query.eq("id", slugOrId).single()
                    : await query.eq("slug", slugOrId).single();

                if (error) throw error;

                setTour(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [slugOrId]);

    return {
        tour,
        loading,
        error,
    };
}