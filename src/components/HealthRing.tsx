"use client";

import { motion } from "framer-motion";

interface RingProps {
  radius: number;
  strokeWidth: number;
  progress: number;
  color: string;
  delay: number;
}

function AnimatedRing({ radius, strokeWidth, progress, color, delay }: RingProps) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <>
      <circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke="#F0EDE8"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </>
  );
}

export default function HealthRing() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-[180px] h-[180px]">
        <svg
          viewBox="0 0 180 180"
          className="w-[180px] h-[180px]"
          style={{ transform: "rotate(-90deg)" }}
        >
          <AnimatedRing radius={78} strokeWidth={10} progress={0.82} color="#22A06B" delay={0.4} />
          <AnimatedRing radius={62} strokeWidth={8} progress={0.80} color="#388BFF" delay={0.6} />
          <AnimatedRing radius={48} strokeWidth={6} progress={0.85} color="#22A06B" delay={0.8} />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[40px] font-extrabold tracking-tighter leading-none text-green"
          >
            82
          </motion.span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
            Health
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="flex gap-4 mt-4"
      >
        {[
          { color: "bg-green", label: "ROAS" },
          { color: "bg-blue", label: "Budget" },
          { color: "bg-green", label: "Conv." },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
