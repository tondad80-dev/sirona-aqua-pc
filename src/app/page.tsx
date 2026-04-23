"use client";
import TelemetryGrid from '@/components/dashboard/TelemetryGrid';
import HistoryChart from '@/components/dashboard/HistoryChart';

export default function DashboardPage() {
  return (
    <div className="bg-black min-h-screen text-white font-mono antialiased p-8 selection:bg-cyan-900">
      
      <header className="mb-12 border-b border-white/5 pb-6">
        <h1 className="text-3xl font-black tracking-tighter text-white">SIRONA_AQUA_v1.1</h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Engine: Restricted Mode</p>
      </header>

      <main className="max-w-4xl space-y-12">
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-1">OPERATIONAL_OVERVIEW</h2>
          <p className="text-slate-600 text-xs uppercase tracking-widest">Real-time data stream z Unified Namespace.</p>
        </section>

        <TelemetryGrid />

        {/* Nový graf trendů */}
        <HistoryChart />
        
        <footer className="pt-10">
          <div className="h-px bg-white/5 w-full mb-4"></div>
          <p className="text-slate-800 text-[9px] uppercase tracking-widest font-bold text-center">
            Sirona Aqua Systems © 2026 // D:\SironaAqua_Dev
          </p>
        </footer>
      </main>
    </div>
  );
}