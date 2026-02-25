"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { focusItems } from "@/lib/data";

const typeStyles = {
  urgent: {
    border: "border-l-red",
    iconBg: "bg-red/8",
    btnBg: "bg-red hover:bg-red/90",
    icon: "⚠",
  },
  warning: {
    border: "border-l-yellow",
    iconBg: "bg-yellow/8",
    btnBg: "bg-yellow hover:bg-yellow/90",
    icon: "⏱",
  },
  opportunity: {
    border: "border-l-green",
    iconBg: "bg-green/8",
    btnBg: "bg-green hover:bg-green/90",
    icon: "▲",
  },
};

export default function FocusPanel() {
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const handleAction = (id: string) => {
    setResolved((prev) => new Set(prev).add(id));
  };

  return (
    <div className="flex flex-col gap-2.5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1"
      >
        Needs Your Eye
      </motion.div>

      <AnimatePresence mode="popLayout">
        {focusItems.map((item, i) => {
          const styles = typeStyles[item.type];
          const isResolved = resolved.has(item.id) || item.autoResolved;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isResolved ? 0.35 : 1,
                x: 0,
                scale: isResolved ? 0.98 : 1,
              }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                x: { delay: 0.2 + i * 0.08, duration: 0.4 },
              }}
              whileHover={isResolved ? {} : { x: 4, transition: { duration: 0.15 } }}
              className={`flex items-center gap-3.5 px-4 py-3.5 bg-surface border border-border-light rounded-[10px] cursor-pointer relative overflow-hidden border-l-[3px] ${styles.border}`}
            >
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-base shrink-0 ${styles.iconBg}`}
              >
                {item.autoResolved ? "✓" : styles.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-medium leading-tight mb-0.5 ${
                    isResolved ? "line-through text-text-muted" : ""
                  }`}
                >
                  {item.client} — {item.title}
                </div>
                <div className="text-[11px] text-text-muted">{item.subtitle}</div>
              </div>

              {item.autoResolved ? (
                <span className="text-[10px] text-text-muted font-medium">AUTO</span>
              ) : isResolved ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green text-sm font-bold"
                >
                  ✓
                </motion.span>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-white border-none cursor-pointer shrink-0 ${styles.btnBg}`}
                >
                  {item.action}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
