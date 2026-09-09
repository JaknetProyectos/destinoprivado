"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TourLike = {
  id: string;
  slug?: string;
  title: string;
  title_english?: string | null;
  description?: string;
  description_english?: string | null;
  price: number;
  image_url?: string | null;
  image?: string | null;
  destination: string;
  duration?: string | null;
};

export interface CartTour {
  id: string;
  slug: string;
  title: string;
  title_english: string | null;
  description: string | null;
  description_english: string | null;
  price: number;
  image_url: string | null;
  destination: string;
  duration: string | null;
}

export interface CartItem {
  tour: CartTour;
  adults: number;
  date?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (tour: TourLike, adults?: number, date?: string) => void;
  removeFromCart: (tourId: string) => void;
  updateQuantity: (tourId: string, adults: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * UNA SOLA KEY
 */
const STORAGE_KEY = "gobeyond-cart";

function normalizeTour(tour: TourLike): CartTour {
  return {
    id: String(tour.id),
    slug: tour.slug ?? String(tour.id),
    title: tour.title,
    title_english: tour.title_english ?? null,
    description: tour.description ?? null,
    description_english: tour.description_english ?? null,
    price: Number(tour.price ?? 0),
    image_url: tour.image_url ?? tour.image ?? null,
    destination: tour.destination,
    duration: tour.duration ?? null,
  };
}

function parseCart(value: string | null): CartItem[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item): CartItem | null => {
        if (!item?.tour?.id) return null;

        return {
          tour: {
            id: String(item.tour.id),
            slug: item.tour.slug ?? String(item.tour.id),
            title: item.tour.title ?? "",
            title_english: item.tour.title_english ?? null,
            description: item.tour.description ?? null,
            description_english: item.tour.description_english ?? null,
            price: Number(item.tour.price ?? 0),
            image_url: item.tour.image_url ?? item.tour.image ?? null,
            destination: item.tour.destination ?? "",
            duration: item.tour.duration ?? null,
          },
          adults: Number(item.adults ?? 1),
          date: item.date ?? undefined,
        };
      })
      .filter(Boolean) as CartItem[];
  } catch (error) {
    console.error("Error parsing cart:", error);
    return [];
  }
}

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  return parseCart(localStorage.getItem(STORAGE_KEY));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /**
   * CARGA INICIAL
   */
  useEffect(() => {
    const storedCart = getInitialCart();
    setItems(storedCart);
  }, []);

  /**
   * SYNC LOCALSTORAGE
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /**
   * SYNC ENTRE TABS
   */
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      setItems(parseCart(event.newValue));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addToCart = useCallback(
    (tour: TourLike, adults: number = 1, date?: string) => {
      if (!tour?.id) return;

      const quantity = Number(adults);

      if (quantity <= 0) return;

      const normalizedTour = normalizeTour(tour);

      setItems((currentItems) => {
        const existingIndex = currentItems.findIndex(
          (item) => item.tour.id === normalizedTour.id
        );

        /**
         * SI YA EXISTE -> SUMAR
         */
        if (existingIndex >= 0) {
          return currentItems.map((item, index) => {
            if (index !== existingIndex) return item;

            return {
              ...item,
              tour: normalizedTour,
              adults: item.adults + quantity,
              date: date ?? item.date,
            };
          });
        }

        /**
         * NUEVO ITEM
         */
        return [
          ...currentItems,
          {
            tour: normalizedTour,
            adults: quantity,
            date,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback((tourId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.tour.id !== tourId)
    );
  }, []);

  const updateQuantity = useCallback(
    (tourId: string, adults: number) => {
      const quantity = Number(adults);

      if (quantity <= 0) {
        removeFromCart(tourId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.tour.id === tourId
            ? {
                ...item,
                adults: quantity,
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.tour.price * item.adults,
      0
    );
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.adults, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}