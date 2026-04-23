"use client";
import { useTelemetry } from '@/hooks/useTelemetry';
import { sironaMQTT } from '@/lib/mqtt/SironaMQTTClient';
import { 
  Activity, Droplets, Sun, Zap, ShieldCheck, 
  AlertTriangle, AlertCircle, ArrowUpRight, ArrowDownRight, 
  Wifi, Cpu, Terminal, LayoutDashboard
} from 'lucide-react';

export default function TelemetryGrid() {
  const { data, incidents } = useTelemetry();

  const getStatusKit = (status: string) => {
    switch(status) {
      case 'ALARM': return { color: 'text-red-400', icon: <AlertCircle size={14} />, border: 'border-red-500/30 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]' };
      case 'WARNING': return { color: 'text-amber-400', icon: <AlertTriangle size={14} />, border: 'border-amber-500/30 bg-amber-500/5' };
      default: return { color: 'text-emerald-400', icon: <ShieldCheck size={14} />, border: 'border-white/5 bg-slate-900/40' };
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-6 font-sans">
      
      {/* 🛰️ OPERATOR HEADER */}
      <header className="flex flex-wrap items-center justify-between p-4 mb-8 bg-slate-900/80 border border-white/5 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400"><LayoutDashboard size={20} /></div>
          <div>
            <h1 className="text-sm font-black tracking-[0.4em] text-white uppercase italic">Sirona_Aqua <span className="text-slate-500 font-light">Dashboard // v1.4</span></h1>
            <div className="flex gap-4 mt-1">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-tighter"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/> Live Build</span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter"><Wifi size={10}/> MQTT Connected</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-[10px] font-mono text-slate-500 bg-black/40 px-5 py-2.5 rounded-xl border border-white/5">
           <span>pH Limits: 6.2 - 7.2</span>
           <span className="border-l border-white/10 pl-4">EC Limits: 1.0 - 2.5</span>
           <span className="border-l border-white/10 pl-4 text-emerald-500/50 italic tracking-tighter">Δ ≥ ε Active</span>
        </div>
      </header>

      {/* 📊 CORE MODULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { id: 'ph', label: 'pH Level', icon: <Droplets size={18}/>, m: data.metrics.ph },
          { id: 'ec', label: 'EC Conductivity', icon: <Activity size={18}/>, m: data.metrics.ec },
          { id: 'par', label: 'PAR Radiation', icon: <Sun size={18}/>, m: { ...data.metrics.par, status: 'STABLE', trend: 'STAGNANT' } }
        ].map((item) => (
          <div key={item.id} className={`p-8 rounded-3xl border backdrop-blur-2xl transition-all duration-1000 ${getStatusKit(item.m.status).border}`}>
            <div className="flex justify-between items-start mb-10 text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 font-bold">{item.icon} {item.label}</span>
              <div className="bg-black/50 p-2 rounded-xl border border-white/10 shadow-lg">
                {item.m.trend === 'RISING' ? <ArrowUpRight size={16} className="text-emerald-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className={`text-7xl font-black tracking-tighter transition-colors duration-700 ${getStatusKit(item.m.status).color}`}>{item.m.value.toFixed(2)}</span>
              <span className="text-slate-600 font-black text-[10px] uppercase italic">{item.m.unit}</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase border shadow-lg ${getStatusKit(item.m.status).color} bg-black/40`}>
              {getStatusKit(item.m.status).icon} {item.m.status}
            </div>
          </div>
        ))}
      </div>

      {/* 🛠️ LOG & CONTROL CENTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 bg-slate-900/60 border border-white/5 rounded-3xl p-8 h-[340px] relative overflow-hidden shadow-2xl">
          <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-5 flex items-center gap-3"><Cpu size={14} className="text-cyan-500"/> Incident_Log // Operator_Feed</h3>
          <div className="space-y-4 font-mono text-[11px] h-[200px] overflow-y-auto pr-4 custom-scrollbar">
            {incidents.length === 0 && <div className="text-slate-700 italic h-full flex items-center justify-center">System nominal. No events.</div>}
            {incidents.map((inc, i) => (
              <div key={i} className={`flex gap-6 border-l-2 pl-6 py-2 ${inc.type === 'ALARM' ? 'border-red-500 text-red-400 bg-red-500/5' : inc.type === 'WARNING' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-cyan-500 text-cyan-400 bg-cyan-500/5'}`}>
                <span className="text-slate-600 shrink-0">{inc.timestamp}</span>
                <span className="font-black shrink-0 w-20">[{inc.type}]</span>
                <span className="italic opacity-90">{inc.details}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-3 bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl group border-l-cyan-500/20">
           <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Lighting_Array</span>
              <div className={`p-3 rounded-2xl transition-all ${data.actuators.led.state === 'ON' ? 'bg-cyan-500 text-black shadow-[0_0_20px_#22d3ee]' : 'bg-slate-800 text-slate-500'}`}><Sun size={20} /></div>
           </div>
           <div className="mb-8">
              <div className="text-sm font-bold text-white mb-2 uppercase tracking-widest">{data.actuators.led.label}</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">Load: {data.actuators.led.currentPowerW}W</div>
           </div>
           <button onClick={() => sironaMQTT.sendCommand('sirona/aqua/control', { device: 'led_01', action: data.actuators.led.state === 'ON' ? 'OFF' : 'ON' })} className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.5em] transition-all rounded-2xl border ${data.actuators.led.state === 'ON' ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black' : 'border-white/10 text-slate-400 hover:bg-white hover:text-black'}`}>{data.actuators.led.state === 'ON' ? 'Deactivate' : 'Engage'}</button>
        </section>

        <section className="lg:col-span-3 bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl group">
           <div className="flex justify-between items-center mb-8"><span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Energy_Management</span><div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 shadow-inner animate-pulse"><Zap size={20} /></div></div>
           <div className="mb-10 text-center lg:text-left">
              <div className="text-7xl font-black text-white italic tracking-tighter drop-shadow-2xl">{data.actuators.pump.currentPowerW}<span className="text-xl ml-3 text-slate-700 font-black">W</span></div>
              <div className="text-slate-500 text-[9px] font-black uppercase mt-4 tracking-[0.5em]">Current_System_Load</div>
           </div>
           <button onClick={() => sironaMQTT.sendCommand('sirona/aqua/control', { device: 'pump_01', action: data.actuators.pump.state === 'ON' ? 'OFF' : 'ON' })} className="w-full py-5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-red-500 hover:text-black transition-all duration-300 rounded-2xl shadow-lg">Emergency Shutdown</button>
        </section>
      </div>

      <footer className="mt-12 text-center text-[9px] font-mono text-slate-700 tracking-[0.5em] uppercase border-t border-white/5 pt-8">
        Sirona Aqua Systems © 2026 // D:\SironaAqua_Dev // Restricted_Access
      </footer>
    </div>
  );
}