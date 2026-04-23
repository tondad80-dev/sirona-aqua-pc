import type { Metadata } from "next";
import "./globals.css";
import MQTTInitializer from "../components/MQTTInitializer";

export const metadata: Metadata = {
  title: "Sirona Aqua | v1.1",
  description: "IIoT Hydroponic Control System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {/* Inicializace MQTT klienta na pozadí */}
        <MQTTInitializer />
        {children}
      </body>
    </html>
  );
}