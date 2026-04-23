"use client";
import { useState, useEffect } from 'react';
import { sironaMQTT } from '@/lib/mqtt/SironaMQTTClient';

export interface TelemetryData {
  timestamp: string;
  ph: number;
  ec: number;
  power: number;
  par: number;
}

export const useTelemetry = () => {
  const [history, setHistory] = useState<TelemetryData[]>([]);
  const [incidents, setIncidents] = useState<{timestamp: string, type: string, details: string}[]>([]);
  const [ledState, setLedState] = useState('OFF');
  const [isReady, setIsReady] = useState(false);

  const CONFIG = {
    ph: { target: 6.7, epsilon: 0.5 },
    ec: { target: 1.75, epsilon: 0.75 },
    par_unit: "µmol/m²/s"
  };

  // Načtení logů z LocalStorage při startu
  useEffect(() => {
    const saved = localStorage.getItem('sirona_incidents');
    if (saved) setIncidents(JSON.parse(saved));
  }, []);

  // Uložení logů při každé změně
  useEffect(() => {
    localStorage.setItem('sirona_incidents', JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (type: string, details: string) => {
    const timestamp = new Date().toLocaleTimeString('cs-CZ', { hour12: false });
    setIncidents(prev => {
      if (prev.length > 0 && prev[0].details === details) return prev;
      return [{ timestamp, type, details }, ...prev].slice(0, 15);
    });
  };

  const getStatus = (val: number, target: number, epsilon: number) => {
    const delta = Math.abs(val - target);
    if (delta >= epsilon) return "ALARM";
    if (delta >= epsilon * 0.5) return "WARNING";
    return "STABLE";
  };

  const getTrend = (curr: number, old: number) => {
    if (!old || Math.abs(curr - old) < 0.01) return "STAGNANT";
    return curr > old ? "RISING" : "FALLING";
  };

  useEffect(() => {
    setIsReady(true);
    const topic = "sirona/aqua/telemetry";
    const controlTopic = "sirona/aqua/control";

    const handleMessage = (incomingTopic: string, message: string) => {
      try {
        const raw = JSON.parse(message);
        if (incomingTopic === topic) {
          const newPh = parseFloat(raw.ph) || 6.7;
          const newEc = parseFloat(raw.ec) || 1.75;
          const newEntry: TelemetryData = {
            timestamp: new Date().toLocaleTimeString(),
            ph: newPh, ec: newEc,
            power: parseFloat(raw.power) || 0,
            par: parseFloat(raw.par) || 0
          };
          setHistory(prev => [...prev, newEntry].slice(-50));

          const phStat = getStatus(newPh, CONFIG.ph.target, CONFIG.ph.epsilon);
          const ecStat = getStatus(newEc, CONFIG.ec.target, CONFIG.ec.epsilon);
          if (phStat !== "STABLE") addIncident(phStat, `pH Drift: ${newPh} (Target: ${CONFIG.ph.target})`);
          if (ecStat !== "STABLE") addIncident(ecStat, `EC Drift: ${newEc} (Target: ${CONFIG.ec.target})`);
        }
        if (incomingTopic === controlTopic) {
          if (raw.device === 'led_01') setLedState(raw.action);
          addIncident("COMMAND", `Manual override: ${raw.device} -> ${raw.action}`);
        }
      } catch (e) { console.error("S1_ERR", e); }
    };

    sironaMQTT.init();
    sironaMQTT.subscribe(topic);
    sironaMQTT.subscribe(controlTopic);
    sironaMQTT.onMessage(handleMessage);
  }, []);

  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const data = {
    metrics: {
      ph: { value: last?.ph || 6.7, unit: "pH", status: getStatus(last?.ph || 6.7, CONFIG.ph.target, CONFIG.ph.epsilon), trend: getTrend(last?.ph, prev?.ph) },
      ec: { value: last?.ec || 1.75, unit: "mS/cm", status: getStatus(last?.ec || 1.75, CONFIG.ec.target, CONFIG.ec.epsilon), trend: getTrend(last?.ec, prev?.ec) },
      par: { value: last?.par || 0, unit: CONFIG.par_unit }
    },
    actuators: {
      pump: { id: 'pump_01', label: 'Main Circulation', state: (last?.power || 0) > 0 ? 'ON' : 'OFF', currentPowerW: last?.power || 0 },
      led: { id: 'led_01', label: 'Full Spectrum LED Array', state: ledState, currentPowerW: ledState === 'ON' ? 320 : 0 }
    }
  };

  return { history, data, incidents, isReady };
};