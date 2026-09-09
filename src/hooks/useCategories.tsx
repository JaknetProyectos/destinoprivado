"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Category } from "@/interfaces/Category";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from("gobeyond_categories")
                    .select("*")
                    .order("title", { ascending: true });

                if (error) throw error;

                setCategories(data || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
    };
}