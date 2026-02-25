"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Message, Scene } from "@/lib/conversations";

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-center gap-1 bg-[#202c33] rounded-lg px-3 py-2 w-fit ml-2 mb-1"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[7px] h-[7px] bg-[#8696a0] rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  );
}

function ChatBubble({ message, onButtonClick }: { message: Message; onButtonClick?: (text: string) => void }) {
  const isPulse = message.sender === "pulse";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isPulse ? "justify-start" : "justify-end"} mb-1 px-2`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 relative ${
          isPulse
            ? "bg-[#202c33] text-[#e9edef]"
            : "bg-[#005c4b] text-[#e9edef]"
        }`}
      >
        {isPulse && (
          <div className="text-[11px] text-[#25d366] font-medium mb-0.5">
            Pulse AI ✦
          </div>
        )}
        <div className="text-[13px] leading-[1.5] whitespace-pre-line">{message.text}</div>

        {message.buttons && (
          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#ffffff10]">
            {message.buttons.map((btn) => (
              <motion.button
                key={btn}
                whileTap={{ scale: 0.97 }}
                onClick={() => onButtonClick?.(btn)}
                className="text-[#53bdeb] text-[13px] font-medium text-left hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                {btn}
              </motion.button>
            ))}
          </div>
        )}

        <div className={`text-[10px] text-[#8696a0] mt-1 ${isPulse ? "text-left" : "text-right"}`}>
          {message.time}
          {!isPulse && (
            <span className="ml-1 text-[#53bdeb]">✓✓</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatsAppChat({
  scene,
  isActive,
  onComplete,
}: {
  scene: Scene;
  isActive: boolean;
  onComplete?: () => void;
}) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Reset
    setVisibleMessages([]);
    setIsTyping(false);
    setCompleted(false);
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];

    let cumulativeDelay = 500;

    scene.messages.forEach((msg, i) => {
      const isPulse = msg.sender === "pulse";

      if (isPulse) {
        // Show typing indicator before pulse messages
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
        }, cumulativeDelay);
        timeoutRef.current.push(typingTimeout);

        cumulativeDelay += msg.delay;

        const msgTimeout = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg]);
        }, cumulativeDelay);
        timeoutRef.current.push(msgTimeout);
      } else {
        cumulativeDelay += msg.delay;

        const msgTimeout = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg]);
        }, cumulativeDelay);
        timeoutRef.current.push(msgTimeout);
      }

      cumulativeDelay += 400;
    });

    // Mark complete
    const completeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, cumulativeDelay + 1500);
    timeoutRef.current.push(completeTimeout);

    return () => {
      timeoutRef.current.forEach(clearTimeout);
    };
  }, [isActive, scene, onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp header */}
      <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3 pt-[58px]">
        <div className="w-4 h-4 flex items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#aebac1">
            <path d="M11 6L1 1v10l10-5z" transform="rotate(180 6 6)" />
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] flex items-center justify-center">
          <span className="text-white text-[13px] font-bold">P</span>
        </div>
        <div className="flex-1">
          <div className="text-[#e9edef] text-[15px] font-medium">Pulse AI</div>
          <div className="text-[#8696a0] text-[11px]">
            {isTyping ? "typing..." : "online"}
          </div>
        </div>
        <div className="flex gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#aebac1">
            <path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#aebac1">
            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
          </svg>
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: "#0b141a",
        }}
      >
        {/* Date chip */}
        <div className="flex justify-center my-2">
          <div className="bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-md shadow-sm">
            TODAY
          </div>
        </div>

        <AnimatePresence>
          {visibleMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="bg-[#202c33] px-2 py-2 flex items-center gap-2">
        <div className="flex items-center gap-2 text-[#8696a0]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.298 1.011 0 6.31 0 12.813s5.298 11.803 11.804 11.803 11.804-5.298 11.804-11.803S18.31 1.011 11.804 1.011z" />
          </svg>
        </div>
        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-[14px] text-[#8696a0]">
          Type a message
        </div>
        <div className="text-[#8696a0]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
