"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChatMessage, QuickAction } from "@/lib/conceptData";

interface WhatsAppChatProps {
  messages: ChatMessage[];
  quickActions?: QuickAction[];
  onComplete?: () => void;
  autoStart?: boolean;
  headerName?: string;
  headerStatus?: string;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-end gap-1.5 px-3 mb-1.5"
    >
      <div
        className="rounded-full w-6 h-6 flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg, #FF6B35, #8B5CF6)" }}
      >
        <span className="text-white text-[9px] font-bold">P</span>
      </div>
      <div
        className="rounded-xl rounded-bl-sm px-3 py-2"
        style={{ background: "#FFFFFF" }}
      >
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#999" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MessageBubble({
  message,
  isNew,
}: {
  message: ChatMessage;
  isNew: boolean;
}) {
  const isPulse = message.sender === "pulse";

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 12, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-1.5 px-3 mb-1 ${
        isPulse ? "justify-start" : "justify-end"
      }`}
    >
      {isPulse && (
        <div
          className="rounded-full w-6 h-6 flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #FF6B35, #8B5CF6)" }}
        >
          <span className="text-white text-[9px] font-bold">P</span>
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-xl px-2.5 py-1.5 relative ${
          isPulse ? "rounded-bl-sm" : "rounded-br-sm"
        }`}
        style={{
          background: isPulse ? "#FFFFFF" : "#DCF8C6",
          boxShadow: "0 1px 1px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="text-[11px] leading-[1.4]"
          style={{
            color: "#111B21",
            whiteSpace: "pre-line",
          }}
        >
          {message.text}
        </div>
        <div className="flex items-center justify-end gap-0.5 mt-0.5">
          <span className="text-[8px]" style={{ color: "#667781" }}>
            {message.time}
          </span>
          {!isPulse && message.status && (
            <svg width="13" height="9" viewBox="0 0 16 11" fill="none">
              {message.status === "read" ? (
                <>
                  <path
                    d="M11.07 0.73L4.53 7.27L1.93 4.67L0.86 5.74L4.53 9.41L12.14 1.8L11.07 0.73Z"
                    fill="#53BDEB"
                  />
                  <path
                    d="M14.07 0.73L7.53 7.27L6.93 6.67L5.86 7.74L7.53 9.41L15.14 1.8L14.07 0.73Z"
                    fill="#53BDEB"
                  />
                </>
              ) : (
                <path
                  d="M11.07 0.73L4.53 7.27L1.93 4.67L0.86 5.74L4.53 9.41L12.14 1.8L11.07 0.73Z"
                  fill="#667781"
                />
              )}
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatsAppChat({
  messages,
  quickActions,
  onComplete,
  autoStart = true,
  headerName = "Pulse AI",
  headerStatus = "online",
}: WhatsAppChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userReplied, setUserReplied] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [actionResponse, setActionResponse] = useState<ChatMessage | null>(
    null
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping, actionResponse]);

  useEffect(() => {
    if (!autoStart) return;

    setVisibleMessages([]);
    setIsTyping(false);

    let totalDelay = 0;
    const timeouts: NodeJS.Timeout[] = [];

    messages.forEach((msg, index) => {
      totalDelay += msg.delay;

      if (msg.sender === "pulse") {
        const typingStart =
          index === 0
            ? totalDelay - msg.delay + 200
            : totalDelay - Math.min(msg.delay, 1200);
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
        }, typingStart);
        timeouts.push(typingTimeout);
      }

      const msgTimeout = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, msg]);
      }, totalDelay);
      timeouts.push(msgTimeout);
    });

    const completeTimeout = setTimeout(() => {
      if (!quickActions?.length && onComplete) {
        onComplete();
      }
    }, totalDelay + 800);
    timeouts.push(completeTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [autoStart, messages, quickActions, onComplete]);

  const handleQuickAction = (action: QuickAction) => {
    if (userReplied) return;
    setUserReplied(true);
    setSelectedAction(action.label);

    const userMsg: ChatMessage = {
      id: `user-reply-${action.label}`,
      sender: "user",
      text: action.label,
      time: action.response.time,
      status: "read",
      delay: 0,
    };
    setVisibleMessages((prev) => [...prev, userMsg]);

    setTimeout(() => setIsTyping(true), 600);
    setTimeout(() => {
      setIsTyping(false);
      setActionResponse(action.response);
      if (onComplete) {
        setTimeout(onComplete, 2000);
      }
    }, 600 + action.response.delay);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#EFEAE2" }}>
      {/* WhatsApp Header */}
      <div
        className="flex items-center gap-2 px-2.5 pt-10 pb-2 shrink-0"
        style={{ background: "#075E54" }}
      >
        <div className="flex items-center gap-2 flex-1">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M13 4L7 10L13 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            className="rounded-full w-8 h-8 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #8B5CF6)",
            }}
          >
            <span className="text-white text-[11px] font-bold">P</span>
          </div>
          <div>
            <div className="text-white text-[13px] font-medium">
              {headerName}
            </div>
            <div className="text-[10px]" style={{ color: "#A8D8CC" }}>
              {headerStatus}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M14.3 5.7a6 6 0 1 0-8.6 8.4L4 18l3.9-1.7a6 6 0 0 0 6.4-10.6z"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="4" r="1.5" fill="white" />
            <circle cx="10" cy="10" r="1.5" fill="white" />
            <circle cx="10" cy="16" r="1.5" fill="white" />
          </svg>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 overflow-y-auto py-2 relative"
        style={{
          background: `#ECE5DD url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4cfc6' fill-opacity='0.12'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='35' cy='25' r='0.8'/%3E%3Ccircle cx='15' cy='45' r='0.6'/%3E%3Ccircle cx='50' cy='50' r='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Date chip */}
        <div className="flex justify-center mb-2">
          <div
            className="rounded-md px-2.5 py-0.5 text-[9px]"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: "#667781",
              boxShadow: "0 1px 1px rgba(0,0,0,0.06)",
            }}
          >
            TODAY
          </div>
        </div>

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isNew={i === visibleMessages.length - 1}
            />
          ))}
        </AnimatePresence>

        {actionResponse && (
          <MessageBubble message={actionResponse} isNew={true} />
        )}

        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

        {/* Quick action buttons */}
        <AnimatePresence>
          {quickActions &&
            visibleMessages.length === messages.length &&
            !userReplied && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-1.5 px-3 mt-2"
              >
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickAction(action)}
                    className="rounded-full px-3 py-1.5 text-[10px] font-medium cursor-pointer border-none"
                    style={{
                      background:
                        selectedAction === action.label
                          ? "#075E54"
                          : "rgba(255,255,255,0.95)",
                      color:
                        selectedAction === action.label ? "#fff" : "#075E54",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 shrink-0"
        style={{ background: "#F0F0F0" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#8696A0" strokeWidth="1.5" />
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2"
            stroke="#8696A0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="9" cy="10" r="1" fill="#8696A0" />
          <circle cx="15" cy="10" r="1" fill="#8696A0" />
        </svg>
        <div
          className="flex-1 rounded-full px-3 py-1.5 text-[11px]"
          style={{ background: "#FFFFFF", color: "#8696A0" }}
        >
          Type a message
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
            stroke="#8696A0"
            strokeWidth="1.5"
          />
          <path
            d="M19 10v1a7 7 0 0 1-14 0v-1"
            stroke="#8696A0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
