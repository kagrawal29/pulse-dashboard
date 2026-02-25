"use client";

import { motion } from "framer-motion";
import NavRail from "@/components/NavRail";
import HealthRing from "@/components/HealthRing";
import FocusPanel from "@/components/FocusPanel";
import AiPanel from "@/components/AiPanel";
import ClientGrid from "@/components/ClientGrid";
import AutopilotTicker from "@/components/AutopilotTicker";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <NavRail />

      <main className="flex-1 p-5 pr-6 grid grid-cols-[1fr_1fr_310px] grid-rows-[auto_1fr_auto_auto] gap-3.5 overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-3 flex items-center justify-between"
        >
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Hey <span className="text-accent">Himanshu</span>, here&apos;s your morning.
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Tuesday, 25 Feb 2026 &nbsp;&middot;&nbsp; 11 clients &nbsp;&middot;&nbsp; 44
              campaigns running
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1.5 text-green bg-green/8 px-3 py-1.5 rounded-full text-[11px] font-medium"
          >
            <span className="w-1.5 h-1.5 bg-green rounded-full animate-blink" />
            Live
          </motion.div>
        </motion.div>

        {/* Portfolio Health Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-surface border border-border-light rounded-2xl p-[18px] shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
            Portfolio Pulse
          </div>
          <HealthRing />
        </motion.div>

        {/* Focus Panel */}
        <div className="overflow-hidden">
          <FocusPanel />
        </div>

        {/* AI Panel — spans 2 rows */}
        <div className="row-span-2">
          <AiPanel />
        </div>

        {/* Client Grid — spans 2 cols */}
        <div className="col-span-2">
          <ClientGrid />
        </div>

        {/* Autopilot Ticker — full width */}
        <div className="col-span-3">
          <AutopilotTicker />
        </div>
      </main>
    </div>
  );
}
