"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto"
      style={{ width: 375, height: 720 }}
    >
      {/* Phone body */}
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[50px] shadow-2xl border border-[#333] overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-b-[18px] z-20" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-[54px] z-10 flex items-end justify-between px-8 pb-1">
          <span className="text-white text-[12px] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
              <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="0.6" />
              <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
              <rect x="13" y="0" width="3" height="12" rx="0.5" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="white">
              <rect x="0" y="1" width="22" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
              <rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="white" />
              <rect x="23" y="4" width="2" height="4" rx="0.5" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-[4px] rounded-[46px] overflow-hidden bg-[#0b141a]">
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full" />
    </motion.div>
  );
}
