"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTelemetry } from '@/hooks/useTelemetry';

export default function HistoryChart() {
  const { history, isLimpMode } = useTelemetry();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pokud ještě není komponenta načtená nebo nemáme data, ukážeme stylový placeholder
  if (!isMounted || history.length < 2) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center border border-white/5 rounded-xl bg-slate-950/50 mt-10">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <span className="text-slate-600 text-[9px] uppercase font-black tracking-[0.5em]">
          Waiting_for_telemetry_history...
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full mt-12 transition-all duration-1000 ${isLimpMode ? 'grayscale opacity-20' : 'opacity-100'}`}>
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex justify-between">
        <span>Live_Trends (pH_EC)</span>
        <span className="text-cyan-500 animate-pulse">● LIVE_STREAM</span>
      </h3>
      
      {/* Vynucená výška rodičovského divu je klíčová pro ResponsiveContainer */}
      <div style={{ width: '100%', height: '200px', minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }}
              itemStyle={{ padding: '0px' }}
              cursor={{ stroke: '#1e293b' }}
            />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false}
              isAnimationActive={false} // Vypnutí animace zrychlí překreslování při streamu
            />
            <Line 
              type="monotone" 
              dataKey="ec" 
              stroke="#0ea5e9" 
              strokeWidth={3} 
              dot={false}
              isAnimationActive={false}
            />
            <YAxis hide={true} domain={['auto', 'auto']} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}