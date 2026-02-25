"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <motion.div
      className="relative mx-auto origin-top"
      style={{ width: 290, height: 590 }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[40px] overflow-hidden"
        style={{
          width: 290,
          height: 590,
          background: "#1A1A1A",
          padding: "2px",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Inner bezel */}
        <div
          className="relative w-full h-full rounded-[38px] overflow-hidden"
          style={{ background: "#000" }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
            style={{
              width: 96,
              height: 28,
              background: "#000",
              borderRadius: "0 0 16px 16px",
            }}
          />

          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 130, width: 3, height: 24, background: "#2A2A2A" }}
      />
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 165, width: 3, height: 42, background: "#2A2A2A" }}
      />
      <div
        className="absolute -left-[3px] rounded-l-sm"
        style={{ top: 218, width: 3, height: 42, background: "#2A2A2A" }}
      />
      <div
        className="absolute -right-[3px] rounded-r-sm"
        style={{ top: 185, width: 3, height: 54, background: "#2A2A2A" }}
      />
    </motion.div>
  );
}
