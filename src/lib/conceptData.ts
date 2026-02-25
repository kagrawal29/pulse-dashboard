// Scene data for the Pulse concept experience

export interface ChatMessage {
  id: string;
  sender: "pulse" | "user";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  delay: number; // ms before this message appears
  isFormatted?: boolean; // rich text with line breaks
}

export interface QuickAction {
  label: string;
  response: ChatMessage;
}

// Scene 1: Morning Briefing
export const morningBriefing: ChatMessage[] = [
  {
    id: "m1",
    sender: "pulse",
    text: "Good morning, Himanshu. ☀️",
    time: "8:01 AM",
    delay: 800,
  },
  {
    id: "m2",
    sender: "pulse",
    text: `Here's your morning briefing across 11 clients:

📊 Portfolio Health: 82/100

✅ 8 clients green — running smooth
⚠️ 2 need attention:
   • Bloom Skincare — CPA spiked to ₹940 (+23%)
   • PetTreats Co — Budget 92% spent, 8 days left

🚀 1 opportunity:
   • FreshCart ROAS hit 4.2x — recommend scaling 20%

💰 Total spend today: ₹4.2L across 34 campaigns
📈 Avg ROAS: 3.1x (up from 2.8x last week)`,
    time: "8:01 AM",
    delay: 2000,
    isFormatted: true,
  },
  {
    id: "m3",
    sender: "pulse",
    text: `Quick actions:
→ Reply APPROVE ALL to apply my recommendations
→ Reply PAUSE BLOOM to pause Bloom campaigns
→ Reply SCALE FRESHCART to increase FreshCart budget`,
    time: "8:01 AM",
    delay: 1200,
    isFormatted: true,
  },
];

export const morningQuickActions: QuickAction[] = [
  {
    label: "APPROVE ALL",
    response: {
      id: "mr1",
      sender: "pulse",
      text: `Done. Here's what I did:

✅ Bloom Skincare — shifted ₹12K from low-performing ad sets to top 3 creatives
✅ PetTreats Co — reduced daily budget by 15% to last through month
✅ FreshCart — increased budget by 20%, scaling winning audiences

I'll monitor and alert you if anything shifts. You're all set. 👊`,
      time: "8:02 AM",
      delay: 1800,
      isFormatted: true,
    },
  },
  {
    label: "PAUSE BLOOM",
    response: {
      id: "mr2",
      sender: "pulse",
      text: `✅ Bloom Skincare — all 6 campaigns paused.

I'll send you a recovery plan in 30 mins with creative refresh options. Spend saved: ~₹8,400/day.`,
      time: "8:02 AM",
      delay: 1500,
      isFormatted: true,
    },
  },
  {
    label: "SCALE FRESHCART",
    response: {
      id: "mr3",
      sender: "pulse",
      text: `✅ FreshCart — budget increased by 20%.

New daily spend: ₹18,000 → ₹21,600
Projected ROAS at scale: 3.8x (conservative)
I'll watch CPA closely for the next 4 hours.`,
      time: "8:02 AM",
      delay: 1500,
      isFormatted: true,
    },
  },
];

// Scene 2: Quick Commands
export const quickCommandMessages: ChatMessage[] = [
  {
    id: "q1",
    sender: "user",
    text: "update for FreshCart",
    time: "10:30 AM",
    status: "read",
    delay: 600,
  },
  {
    id: "q2",
    sender: "pulse",
    text: `FreshCart — Live Update

📊 Health Score: 91/100
💰 Spend today: ₹14,200 of ₹18,000
📈 ROAS: 4.2x (target: 3.5x)
🛒 Conversions: 84 (₹169 CPA)

Top performer: "Summer Fresh" carousel — 5.1x ROAS
Weakest: "Quick Meals" video — 1.8x ROAS

Recommendation: Shift ₹3,000 from Quick Meals to Summer Fresh creative.`,
    time: "10:30 AM",
    delay: 2200,
    isFormatted: true,
  },
  {
    id: "q3",
    sender: "user",
    text: "send report to FreshCart",
    time: "10:31 AM",
    status: "read",
    delay: 1500,
  },
  {
    id: "q4",
    sender: "pulse",
    text: `✅ Weekly performance report generated and sent to Priya Sharma (FreshCart).

Report includes:
• 7-day performance summary
• Top & bottom creatives
• Budget utilization
• Next week's recommendations

Priya will receive it on WhatsApp and email. 📧`,
    time: "10:31 AM",
    delay: 2000,
    isFormatted: true,
  },
];

// Scene 3: Real-Time Alert
export const alertMessages: ChatMessage[] = [
  {
    id: "a1",
    sender: "pulse",
    text: `⚠️ ALERT — Bloom Skincare

CPA spiked to ₹1,240 (was ₹760)
Cause: Top audience segment saturated
Affected: 3 of 6 campaigns
Spend at risk: ₹6,800/hour

→ Reply PAUSE to pause affected campaigns
→ Reply FIX to let me reallocate automatically
→ Reply IGNORE to keep running`,
    time: "2:47 PM",
    delay: 1200,
    isFormatted: true,
  },
];

export const alertQuickActions: QuickAction[] = [
  {
    label: "PAUSE",
    response: {
      id: "ar1",
      sender: "pulse",
      text: `✅ 3 affected campaigns paused.

Remaining 3 campaigns still healthy (CPA ₹680).
Estimated daily savings: ₹16,300.

I'll prepare a fresh audience strategy and send it to you by 4 PM. 🎯`,
      time: "2:47 PM",
      delay: 1500,
      isFormatted: true,
    },
  },
  {
    label: "FIX",
    response: {
      id: "ar2",
      sender: "pulse",
      text: `✅ Auto-fix applied:

• Shifted budget from saturated audiences to 2 lookalike segments
• Reduced bid by 15% on affected ad sets
• Added exclusion for converted users (last 7 days)

Projected CPA after fix: ₹820. I'll update you in 2 hours.`,
      time: "2:47 PM",
      delay: 1800,
      isFormatted: true,
    },
  },
  {
    label: "IGNORE",
    response: {
      id: "ar3",
      sender: "pulse",
      text: `Got it. Keeping campaigns running as-is.

I'll keep monitoring — if CPA crosses ₹1,500 I'll alert you again. Current burn rate: ₹6,800/hr on affected campaigns.`,
      time: "2:48 PM",
      delay: 1200,
      isFormatted: true,
    },
  },
];
