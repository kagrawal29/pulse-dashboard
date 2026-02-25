"use client";
import { motion, AnimatePresence } from "framer-motion";

interface SceneNarrationProps {
  title: string;
  subtitle: string;
  visible: boolean;
  position?: "top" | "left";
}

export default function SceneNarration({
  title,
  subtitle,
  visible,
  position = "top",
}: SceneNarrationProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? -20 : 0, x: position === "left" ? -20 : 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: position === "top" ? -10 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            position === "top"
              ? "text-center mb-8"
              : "text-left max-w-xs"
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: "#A09A93" }}
          >
            {subtitle}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "#1A1A1A" }}
          >
            {title}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
