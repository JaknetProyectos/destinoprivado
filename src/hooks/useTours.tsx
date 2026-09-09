"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/client";

import { Tour } from "@/interfaces/Tour";

interface UseToursOptions {
  limit?: number;
  page?: number;

  sortBy?:
    | "created_at"
    | "price"
    | "title";

  order?: "asc" | "desc";

  categorySlug?: string;

  destination?: string;

  activeOnly?: boolean;
}

export function useTours(
  options: UseToursOptions = {}
) {
  const {
    limit,
    page = 1,

    sortBy = "created_at",
    order = "desc",

    categorySlug,
    destination,

    activeOnly = true,
  } = options;

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<unknown>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from("gobeyond_tours")
          .select("*", {
            count: "exact",
          });

        if (activeOnly) {
          query = query.eq("is_active", true);
        }

        if (categorySlug) {
          query = query.eq(
            "category_slug",
            categorySlug
          );
        }

        if (destination) {
          query = query.eq(
            "destination",
            destination
          );
        }

        query = query.order(sortBy, {
          ascending: order === "asc",
        });

        if (limit) {
          const from = (page - 1) * limit;
          const to = from + limit - 1;

          query = query.range(from, to);
        }

        const { data, error, count } =
          await query;

        if (error) {
          throw error;
        }

        setTours(data || []);
        setCount(count || 0);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [
    limit,
    page,

    sortBy,
    order,

    categorySlug,
    destination,

    activeOnly,
  ]);

  return {
    tours,
    loading,
    error,

    count,

    totalPages: limit
      ? Math.ceil(count / limit)
      : 1,
  };
}