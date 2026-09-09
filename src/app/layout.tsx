import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Destino Privado | Viajes y Tours en México",
  icons: "icon.png",
  description: "Bienvenido a Destino Privado, donde la comodidad se fusiona con la aventura. El servicio personalizado y la atención al detalle garantizan una experiencia excepcional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No definimos lang aquí porque lo hará el layout dinámico
    <html suppressHydrationWarning>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}