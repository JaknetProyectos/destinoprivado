"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner"
import { LocaleProvider } from "@/context/LangContext";


export function ClientBody({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>



      <CartProvider>
        {children}
      </CartProvider>
      <Toaster />

    </LocaleProvider >
  );
}
