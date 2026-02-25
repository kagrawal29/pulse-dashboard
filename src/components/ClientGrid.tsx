"use client";

import { motion } from "framer-motion";
import { clients } from "@/lib/data";

function MiniChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.5;

  return (
    <div className="flex items-end gap-[2px] h-7">
      {values.map((v, i) => {
        const h = ((v - min) / (max - min)) * 24 + 4;
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: h }}
            transition={{ delay: 0.8 + i * 0.06, duration: 0.4, ease: "easeOut" }}
            className="w-[3px] rounded-[1.5px]"
            style={{
              background: color,
              opacity: 0.35 + (i / values.length) * 0.65,
            }}
          />
        );
      })}
    </div>
  );
}

const healthColor = {
  green: "bg-green",
  yellow: "bg-yellow",
  red: "bg-red",
};

const roasColor = (roas: number) => {
  if (roas >= 3) return "text-green";
  if (roas >= 2) return "text-text";
  return "text-red";
};

const chartColor = (health: string) => {
  if (health === "red") return "var(--color-red)";
  if (health === "yellow") return "var(--color-yellow)";
  return "var(--color-green)";
};

export default function ClientGrid() {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3"
      >
        All Clients
      </motion.div>

      <div className="grid grid-cols-6 gap-2.5 flex-1">
        {clients.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
            whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            className="bg-surface border border-border-light rounded-[10px] p-3.5 cursor-pointer flex flex-col transition-shadow"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div
                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[11px] font-bold"
                style={{ background: client.colorBg, color: client.color }}
              >
                {client.initials}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.07, type: "spring" }}
                className={`w-2 h-2 rounded-full ${healthColor[client.health]}`}
              />
            </div>

            <div className="text-xs font-semibold mb-0.5 truncate">{client.name}</div>
            <div className="text-[10px] text-text-muted mb-3">
              {client.platform} · {client.campaigns}
            </div>

            <div className="flex justify-between items-end mt-auto">
              <div>
                <div className={`text-xl font-bold tracking-tight leading-none ${roasColor(client.roas)}`}>
                  {client.roas}x
                </div>
                <div className="text-[9px] text-text-muted uppercase tracking-wider">ROAS</div>
              </div>
              <MiniChart values={client.roasHistory} color={chartColor(client.health)} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
