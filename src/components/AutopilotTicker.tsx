"use client";

import { motion } from "framer-motion";
import { autopilotEntries } from "@/lib/data";

const dotColor = {
  auto: "bg-blue",
  done: "bg-green",
  alert: "bg-yellow",
};

function TickerContent() {
  return (
    <>
      {autopilotEntries.map((entry) => (
        <div key={entry.id} className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-text-secondary">
          <div className={`w-[5px] h-[5px] rounded-full shrink-0 ${dotColor[entry.type]}`} />
          <span className="text-text-muted text-[10px]">{entry.time}</span>
          <span>{entry.text}</span>
          <strong className="font-semibold text-text">{entry.highlight}</strong>
        </div>
      ))}
    </>
  );
}

export default function AutopilotTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="flex items-center gap-2 bg-surface border border-border-light rounded-[10px] px-4 py-2 overflow-hidden"
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="relative w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-accent">
          Autopilot
        </span>
      </div>

      <div className="w-[1px] h-4 bg-border shrink-0" />

      <div className="overflow-hidden flex-1">
        <div className="flex gap-6 animate-ticker">
          <TickerContent />
          {/* Duplicate for seamless loop */}
          <TickerContent />
        </div>
      </div>
    </motion.div>
  );
}
