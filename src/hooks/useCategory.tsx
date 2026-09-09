"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Category } from "@/interfaces/Category";
import { isUuid } from "@/lib/uuid";

export function useCategory(slugOrId?: string) {
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!slugOrId) {
            setLoading(false);
            return;
        }

        const fetchCategory = async () => {
            try {
                setLoading(true);

                const query = supabase
                    .from("gobeyond_categories")
                    .select("*")
                    .limit(1);

                const { data, error } = isUuid(slugOrId)
                    ? await query.eq("id", slugOrId).single()
                    : await query.eq("slug", slugOrId).single();

                if (error) throw error;

                setCategory(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slugOrId]);

    return {
        category,
        loading,
        error,
    };
}