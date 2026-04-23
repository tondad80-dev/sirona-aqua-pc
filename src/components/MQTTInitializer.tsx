"use client";
import { useEffect } from "react";
import { sironaMQTT } from "../lib/mqtt/SironaMQTTClient";

export default function MQTTInitializer() {
  useEffect(() => {
    // Toto se spustí pouze jednou při načtení webu
    console.log("[SIRONA_SYSTEM]: Initializing MQTT Bridge...");
    sironaMQTT.init();
  }, []);

  return null; // Tato komponenta nic nevykresluje, jen pracuje na pozadí
}