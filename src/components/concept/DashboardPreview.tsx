"use client";
import { motion } from "framer-motion";

export default function DashboardPreview() {
  const clients = [
    { name: "Bloom Skincare", initials: "BS", color: "#E8D5F5", health: "#E34935", roas: "2.4x", bars: [3,5,4,6,5,3,2] },
    { name: "FreshCart", initials: "FC", color: "#D5ECD5", health: "#22A06B", roas: "4.2x", bars: [4,5,6,7,8,7,8] },
    { name: "UrbanFit", initials: "UF", color: "#D5E5F5", health: "#22A06B", roas: "3.8x", bars: [5,4,6,5,7,6,7] },
    { name: "PetTreats Co", initials: "PT", color: "#F5E5D5", health: "#CF9F02", roas: "2.9x", bars: [4,3,5,4,3,4,5] },
    { name: "NovaHealth", initials: "NH", color: "#F5D5D5", health: "#22A06B", roas: "3.5x", bars: [3,4,5,6,6,7,6] },
    { name: "ZenStudio", initials: "ZS", color: "#D5F5EE", health: "#22A06B", roas: "3.1x", bars: [5,6,5,6,5,6,5] },
  ];

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "#F5F3EF",
        width: "100%",
        maxWidth: 960,
        aspectRatio: "16/10",
        boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#E8E5DF" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#E34935" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#CF9F02" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#22A06B" }} />
        </div>
        <div
          className="flex-1 rounded-md px-3 py-1 text-[11px] text-center mx-8"
          style={{ background: "#F5F3EF", color: "#A09A93" }}
        >
          app.usepulse.ai/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div className="flex" style={{ height: "calc(100% - 36px)" }}>
        {/* Nav rail */}
        <div className="w-16 flex flex-col items-center py-4 gap-4 shrink-0" style={{ background: "#FFFFFF", borderRight: "1px solid #E8E5DF" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF6B35, #8B5CF6)" }}>
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: i === 0 ? "#F5F3EF" : "transparent" }}>
                <div className="w-4 h-4 rounded-sm" style={{ background: i === 0 ? "#FF6B35" : "#D1CDC7" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.div
                className="text-sm font-semibold"
                style={{ color: "#1A1A1A" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Good morning, Himanshu
              </motion.div>
              <div className="text-[10px]" style={{ color: "#A09A93" }}>
                11 clients • 34 active campaigns
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#22A06B" }} />
              <span className="text-[10px]" style={{ color: "#A09A93" }}>Live</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto" }}>
            {/* Health ring placeholder */}
            <motion.div
              className="rounded-xl p-4 flex flex-col items-center justify-center row-span-2"
              style={{ background: "#FFFFFF", border: "1px solid #E8E5DF" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F0EDE8" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="#22A06B" strokeWidth="6"
                  strokeDasharray="264" strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 * 0.18 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                />
                <circle cx="50" cy="50" r="34" fill="none" stroke="#F0EDE8" strokeWidth="5" />
                <motion.circle
                  cx="50" cy="50" r="34" fill="none" stroke="#388BFF" strokeWidth="5"
                  strokeDasharray="214" strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: 214 }}
                  animate={{ strokeDashoffset: 214 * 0.2 }}
                  transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>82</span>
                <div className="text-[9px] uppercase tracking-wider" style={{ color: "#A09A93" }}>Health Score</div>
              </div>
            </motion.div>

            {/* Focus items */}
            <motion.div
              className="rounded-xl p-3"
              style={{ background: "#FFFFFF", border: "1px solid #E8E5DF" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-[10px] font-semibold mb-2" style={{ color: "#6B6560" }}>Needs Your Eye</div>
              <div className="space-y-1.5">
                {[
                  { label: "Bloom CPA spike", color: "#E34935" },
                  { label: "PetTreats budget alert", color: "#CF9F02" },
                  { label: "FreshCart scaling opp.", color: "#22A06B" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5" style={{ background: "#FAF9F6" }}>
                    <div className="w-1 h-6 rounded-full" style={{ background: item.color }} />
                    <span className="text-[10px]" style={{ color: "#1A1A1A" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI panel */}
            <motion.div
              className="rounded-xl p-3 row-span-2 relative overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #E8E5DF" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #FF6B35, #8B5CF6, #FF6B35)" }} />
              <div className="flex items-center gap-1.5 mb-2">
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #8B5CF6)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-[10px] font-semibold" style={{ color: "#6B6560" }}>Pulse AI</span>
              </div>
              <div className="space-y-2">
                {[
                  "Bloom's CPA spike is from audience saturation. Recommend creative refresh.",
                  "FreshCart hitting 4.2x ROAS — safe to scale 20%.",
                  "PetTreats budget pacing fast. Auto-adjusted daily cap.",
                ].map((text, i) => (
                  <div key={i} className="text-[9px] leading-relaxed" style={{ color: "#6B6560" }}>
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Client mini grid */}
            <motion.div
              className="rounded-xl p-3"
              style={{ background: "#FFFFFF", border: "1px solid #E8E5DF" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="grid grid-cols-3 gap-1.5">
                {clients.map((c, i) => (
                  <div key={i} className="rounded-lg p-1.5 flex flex-col items-center" style={{ background: "#FAF9F6" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-semibold relative" style={{ background: c.color }}>
                      {c.initials}
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white" style={{ background: c.health }} />
                    </div>
                    <div className="text-[8px] mt-0.5 truncate w-full text-center" style={{ color: "#1A1A1A" }}>{c.name.split(" ")[0]}</div>
                    <div className="flex gap-px mt-0.5">
                      {c.bars.map((h, j) => (
                        <motion.div
                          key={j}
                          className="w-1 rounded-sm"
                          style={{ background: "#22A06B", height: 0 }}
                          animate={{ height: h * 2 }}
                          transition={{ delay: 1 + j * 0.05, duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
