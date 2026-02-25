"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AiPanel() {
  const [applied, setApplied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col bg-surface border border-border-light rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Gradient top line */}
      <div className="h-[1px] bg-gradient-to-r from-accent via-purple to-accent opacity-60" />

      <div className="px-[18px] pt-[18px]">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="w-6 h-6 rounded-[7px] bg-gradient-to-br from-accent to-purple flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Pulse AI
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="px-[18px] text-[13px] leading-relaxed text-text-secondary flex-1"
      >
        <p className="mb-3">
          Portfolio blended ROAS is{" "}
          <strong className="text-green font-semibold">3.4x</strong> on{" "}
          <strong className="text-text font-semibold">$18,420</strong> weekly spend.
        </p>
        <p className="mb-3">
          <strong className="text-red font-semibold">Bloom Skincare</strong> needs a creative
          refresh — frequency hit 4.2 and CTR dropped 35% in 3 days. Classic fatigue.
        </p>
        <p className="mb-3">
          <strong className="text-yellow font-semibold">FreshCart</strong> is wasting 60% of
          budget on branded search that converts organically. Shift $800 to non-brand → ~$2,400
          incremental revenue.
        </p>
        <p>
          <strong className="text-green font-semibold">UrbanFit</strong> and{" "}
          <strong className="text-green font-semibold">PetTreats</strong> are your best
          performers. Both have scaling headroom.
        </p>
      </motion.div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="p-[18px] border-t border-border-light flex flex-col gap-1.5"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setApplied(true)}
          className={`w-full py-2.5 rounded-[10px] text-xs font-semibold border-none cursor-pointer transition-colors ${
            applied
              ? "bg-green text-white"
              : "bg-accent text-white hover:bg-accent-hover"
          }`}
        >
          {applied ? "✓ 2 Recommendations Applied" : "Apply All Recommendations"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-[10px] text-xs font-semibold bg-transparent text-text-secondary border border-border cursor-pointer hover:border-text-muted transition-colors"
        >
          Generate Client Reports
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
