import type { ChatMessage, QuickAction } from "./conceptData";

export interface ConceptScene {
  id: string;
  narration: {
    time: string;
    title: string;
    subtitle: string;
  };
  messages: ChatMessage[];
  quickActions?: QuickAction[];
}

export const conceptScenes: ConceptScene[] = [
  {
    id: "morning",
    narration: {
      time: "7:00 AM",
      title: "Tuesday Morning",
      subtitle: "You wake up. One notification.",
    },
    messages: [
      {
        id: "m1",
        sender: "pulse",
        text: "Good morning, Himanshu ☀️",
        time: "7:00 AM",
        delay: 800,
      },
      {
        id: "m2",
        sender: "pulse",
        text: `Here's your overnight briefing:

🟢 9 of 11 clients healthy
🔴 Bloom Skincare — ROAS crashed to 1.2x (was 3.8x). Creative fatigue detected.
🟡 FreshCart — budget pacing 3 days ahead. Recommend -15% daily.
🟢 UrbanFit retargeting at 6.2x — room to scale +₹1,200/day

✅ Auto-paused 2 low-CTR ad sets on PetTreats at 3am. ₹0 wasted.
✅ Reduced Bloom bids 15% at 4am to slow the bleeding.

Total portfolio: ₹15.4L weekly spend, 3.4x blended ROAS.`,
        time: "7:00 AM",
        delay: 2200,
        isFormatted: true,
      },
    ],
    quickActions: [
      {
        label: "APPROVE ALL",
        response: {
          id: "mr1",
          sender: "pulse",
          text: `Done ✅

• Bloom "Summer Sale" — paused
• FreshCart daily budget — reduced 15%
• UrbanFit retargeting — scaled +₹1,200/day

All changes applied. Your portfolio is stabilized.

Go have breakfast with your daughter. I'll watch everything. 💛`,
          time: "7:01 AM",
          delay: 1800,
          isFormatted: true,
        },
      },
      {
        label: "Details on Bloom",
        response: {
          id: "mr2",
          sender: "pulse",
          text: `📊 Bloom Skincare — Deep Dive

ROAS: 1.2x ⚠️ (target: 3.0x)
CPA: ₹700 (target: ₹420) 🔴

🔍 Root cause: Creative fatigue
• "Glow Serum UGC" CTR dropped 1.8% → 0.6%
• Frequency hit 4.2 on Lookalike audiences

💡 Recommendation: Pause prospecting, refresh creatives, scale retargeting.`,
          time: "7:01 AM",
          delay: 2000,
          isFormatted: true,
        },
      },
      {
        label: "Skip for now",
        response: {
          id: "mr3",
          sender: "pulse",
          text: `No worries. I'll keep watching everything.

I'll ping you at 9am if anything needs attention. Have a good morning! ☕`,
          time: "7:01 AM",
          delay: 1200,
          isFormatted: true,
        },
      },
    ],
  },
  {
    id: "client-update",
    narration: {
      time: "9:15 AM",
      title: "Client Asks for Update",
      subtitle: 'Priya messages: "How are campaigns doing?"',
    },
    messages: [
      {
        id: "c1",
        sender: "user",
        text: "update for Bloom Skincare",
        time: "9:15 AM",
        status: "read",
        delay: 600,
      },
      {
        id: "c2",
        sender: "pulse",
        text: `📊 Bloom Skincare — This Week

Spend: ₹2.7L / ₹3.75L budget (72%)
ROAS: 1.2x ⚠️ (target: 3.0x)
Conversions: 386 → 212 (-45%)

🔍 Root cause: Creative fatigue on top audiences
💡 Pause prospecting, refresh creatives, scale retargeting.

Want me to draft a message for Priya?`,
        time: "9:15 AM",
        delay: 2000,
        isFormatted: true,
      },
      {
        id: "c3",
        sender: "user",
        text: "draft message for Priya",
        time: "9:16 AM",
        status: "read",
        delay: 1200,
      },
      {
        id: "c4",
        sender: "pulse",
        text: `Here's a draft for Priya:

"Hi Priya! Quick update —

The Summer Sale campaign has served its audience well, and we're seeing natural creative fatigue. I've paused underperformers and shifted budget to retargeting, which is still strong.

To get ROAS back to 3x+, we need the new creative batch. Can you approve those today? Everything's ready to go live.

Good news — retargeting is at 2.1x ROAS, room to scale once fresh creatives are in."`,
        time: "9:16 AM",
        delay: 2500,
        isFormatted: true,
      },
    ],
    quickActions: [
      {
        label: "Send to Priya",
        response: {
          id: "cr1",
          sender: "pulse",
          text: `Sent ✅ Message delivered to Priya (WhatsApp).

That took 45 seconds instead of 12 minutes. No Ads Manager, no Sheets, no copy-pasting. 🎯`,
          time: "9:17 AM",
          delay: 1500,
          isFormatted: true,
        },
      },
      {
        label: "Edit first",
        response: {
          id: "cr2",
          sender: "pulse",
          text: `Draft saved. Edit and say "send to Priya" when ready.`,
          time: "9:17 AM",
          delay: 1000,
          isFormatted: true,
        },
      },
    ],
  },
  {
    id: "crisis",
    narration: {
      time: "Saturday, 4:30 PM",
      title: "Your Cousin's Wedding",
      subtitle: "You're on the dance floor. Your phone buzzes once.",
    },
    messages: [
      {
        id: "e1",
        sender: "pulse",
        text: `🚨 CRITICAL: FreshCart

Checkout page returning 500 errors. Conversion rate dropped to 0% in the last 18 minutes.

All campaigns still running — spending ₹2,300/hour on traffic to a broken checkout.

⚡ I've automatically paused all FreshCart campaigns.

₹0 wasted since detection.

I've also notified their dev team.`,
        time: "4:30 PM",
        delay: 1500,
        isFormatted: true,
      },
    ],
    quickActions: [
      {
        label: "Got it, thanks",
        response: {
          id: "er1",
          sender: "pulse",
          text: `All good. Go enjoy the wedding 🎉

I'll keep monitoring. The moment checkout is back, I'll confirm before resuming any campaigns.

No client money wasted. No angry phone calls. You didn't even leave the dance floor.`,
          time: "4:31 PM",
          delay: 1500,
          isFormatted: true,
        },
      },
      {
        label: "Alert the client",
        response: {
          id: "er2",
          sender: "pulse",
          text: `✅ Alert sent to Rahul (FreshCart):

"Hi Rahul, we detected checkout errors on your site. All campaigns paused to protect your budget. No ad spend wasted. Will update once resolved."

He'll know you're on it. Back to the wedding! 💃`,
          time: "4:31 PM",
          delay: 1800,
          isFormatted: true,
        },
      },
    ],
  },
  {
    id: "friday",
    narration: {
      time: "Friday, 4:55 PM",
      title: "End of Week",
      subtitle: "Usually you'd still be building reports. Not anymore.",
    },
    messages: [
      {
        id: "f1",
        sender: "user",
        text: "send all weekly reports",
        time: "4:55 PM",
        status: "read",
        delay: 600,
      },
      {
        id: "f2",
        sender: "pulse",
        text: `Generating reports for 4 clients...

✅ Bloom Skincare — sent to Priya
✅ FreshCart — sent to Rahul & team
✅ TechLoom — sent to dev@techloom.com
✅ NovaHealth — sent to marketing@novahealth.in

Each report includes:
• Performance summary with AI commentary
• Top & bottom creatives
• Budget utilization & pacing
• Recommendations for next week
• Branded PDF with their logo

All 4 reports generated in 34 seconds.
That used to take you 3 hours.`,
        time: "4:56 PM",
        delay: 2500,
        isFormatted: true,
      },
      {
        id: "f3",
        sender: "pulse",
        text: `It's 4:56 PM on a Friday.

Your reports are sent. Your clients are updated. Your campaigns are optimized.

Go home, Himanshu. Your weekend just started. 🌅`,
        time: "4:56 PM",
        delay: 2000,
        isFormatted: true,
      },
    ],
  },
];
