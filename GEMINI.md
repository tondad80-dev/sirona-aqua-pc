# 📑 SIRONA_AQUA_v1.1 | PROJECT_COMPLETE

**Date:** 11.04.2026
**Architecture:** Next.js 15 (Turbo) + MQTT over WSS + Recharts.
**Hardware:** Reactive Edge Simulator (v1.3).

---

## 🎯 AKTIVNÍ FUNKCE
1. **Limp Mode (P-5):** Automatická detekce výpadku dat (10s timeout).
2. **Power Analytics (P-6):** Agregace výkonu ze všech silových prvků.
3. **Live Graphs (P-7):** Neonové trendy pH a EC (Recharts).
4. **Active Control (P-8):** Obousměrné ovládání (SHUTDOWN/ACTIVATE).

## 📁 SOUBOROVÁ STRUKTURA
- `src/lib/mqtt/SironaMQTTClient.ts`: Jádro komunikace s metodou `sendCommand`.
- `src/hooks/useTelemetry.ts`: Správa stavu, historie a hlídacího psa.
- `src/components/dashboard/TelemetryGrid.tsx`: Hlavní UI s ovládacími tlačítky.
- `src/components/dashboard/HistoryChart.tsx`: Vykreslování grafů.
- `src/scripts/simulator.ts`: Reaktivní simulátor reagující na CMD topiky.

## 🛠️ RUN_COMMANDS
- Window 1 (Web): `npm run dev`
- Window 2 (Edge): `npx ts-node src/scripts/simulator.ts`

---
**END_OF_SESSION_LOG | Sirona Aqua Systems v1.1**