"use client";

import { motion } from "framer-motion";

const navItems = [
  {
    id: "dashboard",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    active: true,
  },
  {
    id: "clients",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "analytics",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: "reports",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
  },
];

export default function NavRail() {
  return (
    <motion.nav
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-surface border-r border-border-light flex flex-col items-center py-4 gap-1 w-16 shrink-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="w-[34px] h-[34px] bg-accent rounded-[10px] flex items-center justify-center font-extrabold text-[15px] text-white mb-5"
      >
        P
      </motion.div>

      {navItems.map((item, i) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.05 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-[10px] flex items-center justify-center cursor-pointer transition-colors ${
            item.active
              ? "bg-accent/8 text-accent"
              : "text-text-muted hover:bg-bg hover:text-text-secondary"
          }`}
        >
          {item.icon}
        </motion.button>
      ))}

      <div className="flex-1" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-[#FF8F65] flex items-center justify-center text-xs font-semibold text-white cursor-pointer"
      >
        H
      </motion.div>
    </motion.nav>
  );
}
