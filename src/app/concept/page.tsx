"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/concept/PhoneMockup";
import WhatsAppChat from "@/components/concept/WhatsAppChat";
import DashboardPreview from "@/components/concept/DashboardPreview";
import { conceptScenes } from "@/lib/conceptScenes";

type Phase = "hero" | "scenes" | "dashboard" | "finale";

export default function ConceptPage() {
  const [phase, setPhase] = useState<Phase>("hero");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const [chatDone, setChatDone] = useState(false);
  const totalSteps = conceptScenes.length + 2; // hero + scenes + dashboard + finale
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = conceptScenes[sceneIndex];

  const currentStep =
    phase === "hero"
      ? 0
      : phase === "scenes"
      ? sceneIndex + 1
      : phase === "dashboard"
      ? conceptScenes.length + 1
      : totalSteps;

  const goNext = useCallback(() => {
    if (phase === "hero") {
      setPhase("scenes");
      setSceneIndex(0);
      setSceneKey((k) => k + 1);
      setChatDone(false);
    } else if (phase === "scenes") {
      if (sceneIndex < conceptScenes.length - 1) {
        setSceneIndex((i) => i + 1);
        setSceneKey((k) => k + 1);
        setChatDone(false);
      } else {
        setPhase("dashboard");
      }
    } else if (phase === "dashboard") {
      setPhase("finale");
    }
  }, [phase, sceneIndex]);

  const goPrev = useCallback(() => {
    if (phase === "scenes" && sceneIndex > 0) {
      setSceneIndex((i) => i - 1);
      setSceneKey((k) => k + 1);
      setChatDone(false);
    } else if (phase === "scenes" && sceneIndex === 0) {
      setPhase("hero");
    } else if (phase === "dashboard") {
      setPhase("scenes");
      setSceneIndex(conceptScenes.length - 1);
      setSceneKey((k) => k + 1);
      setChatDone(false);
    } else if (phase === "finale") {
      setPhase("dashboard");
    }
  }, [phase, sceneIndex]);

  const handleRestart = useCallback(() => {
    setPhase("hero");
    setSceneIndex(0);
    setSceneKey(0);
    setChatDone(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{ background: "#F5F3EF" }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,107,53,0.04), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-8">
        <AnimatePresence mode="wait">
          {/* ───────── HERO ───────── */}
          {phase === "hero" && (
            <motion.div
              key="hero"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #8B5CF6)",
                }}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <span className="text-white text-2xl font-bold">P</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3"
                style={{ color: "#A09A93" }}
              >
                Introducing
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-5xl font-bold tracking-tight mb-4"
                style={{ color: "#1A1A1A" }}
              >
                Pulse
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-lg max-w-md leading-relaxed mb-2"
                style={{ color: "#6B6560" }}
              >
                Your AI performance marketing agent.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-lg max-w-md leading-relaxed mb-10"
                style={{ color: "#6B6560" }}
              >
                Lives in WhatsApp. Works while you sleep.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                className="flex items-center gap-2 rounded-full px-8 py-3.5 text-white font-medium text-sm cursor-pointer border-none"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #E55A28)",
                  boxShadow: "0 8px 30px rgba(255, 107, 53, 0.3)",
                }}
              >
                See a day with Pulse
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-16 text-xs"
                style={{ color: "#A09A93" }}
              >
                Built for performance marketers who want their mornings back
              </motion.div>
            </motion.div>
          )}

          {/* ───────── WHATSAPP SCENES ───────── */}
          {phase === "scenes" && (
            <motion.div
              key={`scene-${sceneIndex}-${sceneKey}`}
              className="flex items-center gap-12 w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left narration */}
              <div className="flex flex-col items-start max-w-xs shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-[11px] font-medium tracking-[0.15em] uppercase mb-4"
                  style={{ color: "#A09A93" }}
                >
                  Scene {sceneIndex + 1} of {conceptScenes.length}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                  style={{ background: "#FF6B3512", color: "#FF6B35" }}
                >
                  <span className="text-xs font-bold">
                    {scene.narration.time}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl font-semibold tracking-tight mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  {scene.narration.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#6B6560" }}
                >
                  {scene.narration.subtitle}
                </motion.p>

                <AnimatePresence>
                  {chatDone && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={goNext}
                      className="flex items-center gap-2 rounded-full px-6 py-2.5 text-white font-medium text-sm cursor-pointer border-none"
                      style={{
                        background:
                          sceneIndex === conceptScenes.length - 1
                            ? "linear-gradient(135deg, #22A06B, #1B8A59)"
                            : "linear-gradient(135deg, #FF6B35, #E55A28)",
                        boxShadow:
                          sceneIndex === conceptScenes.length - 1
                            ? "0 6px 24px rgba(34, 160, 107, 0.3)"
                            : "0 6px 24px rgba(255, 107, 53, 0.25)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {sceneIndex === conceptScenes.length - 1
                        ? "See the dashboard"
                        : "Next scene"}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone mockup — scaled to fit viewport */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 0.82 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="shrink-0 origin-center"
              >
                <PhoneMockup>
                  <WhatsAppChat
                    key={`chat-${sceneIndex}-${sceneKey}`}
                    messages={scene.messages}
                    quickActions={scene.quickActions}
                    onComplete={() => setChatDone(true)}
                    autoStart={true}
                    headerName="Pulse AI"
                    headerStatus="online"
                  />
                </PhoneMockup>
              </motion.div>
            </motion.div>
          )}

          {/* ───────── DASHBOARD ───────── */}
          {phase === "dashboard" && (
            <motion.div
              key="dashboard"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6"
              >
                <div
                  className="text-[11px] font-medium tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#A09A93" }}
                >
                  When you want to go deep
                </div>
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  The Dashboard
                </h2>
              </motion.div>
              <DashboardPreview />
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={goNext}
                className="mt-6 flex items-center gap-2 rounded-full px-6 py-2.5 text-white font-medium text-sm cursor-pointer border-none"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #E55A28)",
                  boxShadow: "0 6px 24px rgba(255, 107, 53, 0.25)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                The result
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* ───────── FINALE ───────── */}
          {phase === "finale" && (
            <motion.div
              key="finale"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-5xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                🌅
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold tracking-tight mb-6"
                style={{ color: "#1A1A1A" }}
              >
                That was Pulse.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-2 mb-8"
              >
                {[
                  "No more 6:45 AM alarms.",
                  "No more spreadsheets.",
                  "No more missed alerts at weddings.",
                  "No more Friday report marathons.",
                ].map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    className="text-lg"
                    style={{ color: "#6B6560" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="flex flex-col items-center gap-2 mb-8"
              >
                {[
                  "2+ hours saved every morning",
                  "₹42,000/mo in tools replaced",
                  "3-4 more clients without burning out",
                  "Weekends actually free",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.15 }}
                  >
                    <span style={{ color: "#22A06B" }}>✓</span>
                    <span style={{ color: "#1A1A1A" }}>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
                className="flex gap-3"
              >
                <motion.button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full text-white font-medium text-sm cursor-pointer border-none"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #E55A28)",
                    boxShadow: "0 6px 24px rgba(255, 107, 53, 0.3)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Watch again
                </motion.button>
                <motion.a
                  href="/dashboard"
                  className="px-6 py-3 rounded-full font-medium text-sm cursor-pointer no-underline"
                  style={{
                    background: "transparent",
                    color: "#1A1A1A",
                    border: "1px solid #E8E5DF",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See the dashboard →
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="mt-12 text-[11px] font-medium tracking-[0.15em] uppercase"
                style={{ color: "#A09A93" }}
              >
                Built by Seed Forth
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───────── PROGRESS DOTS ───────── */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-20">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: currentStep === i ? 24 : 8,
              height: 8,
              background: currentStep === i ? "#FF6B35" : "#D1CDC7",
            }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>

      {/* ───────── ARROW NAVIGATION ───────── */}
      <AnimatePresence>
        {phase !== "hero" && (
          <motion.button
            key="prev"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none z-20"
            style={{
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 4L6 9L11 14"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase !== "hero" && phase !== "finale" && (
          <motion.button
            key="next"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none z-20"
            style={{
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 4L12 9L7 14"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      {phase !== "hero" && phase !== "finale" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-2 right-6 text-[10px] z-20"
          style={{ color: "#A09A93" }}
        >
          ← → to navigate
        </motion.div>
      )}
    </div>
  );
}
