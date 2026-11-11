import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KnowU para clientes · Tu idea, talento de diseño",
  description:
    "Conecta con estudiantes de diseño para darle forma a un proyecto puntual, personal o de tu negocio. Conoce el piloto de KnowU en Bogotá.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body className="antialiased">{children}</body>
    </html>
  );
}
