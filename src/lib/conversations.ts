export interface Message {
  id: string;
  sender: "pulse" | "user";
  text: string;
  time: string;
  delay: number; // ms before this message appears
  buttons?: string[];
  isEmoji?: boolean;
}

export interface Scene {
  id: string;
  title: string;
  subtitle: string;
  timeLabel: string;
  messages: Message[];
}

export const scenes: Scene[] = [
  {
    id: "morning",
    title: "7:00 AM — Tuesday Morning",
    subtitle: "You wake up. One notification.",
    timeLabel: "7:00 AM",
    messages: [
      {
        id: "m1",
        sender: "pulse",
        text: "Good morning, Himanshu ☀️\n\nHere's your overnight briefing:\n\n🟢 9 of 11 clients healthy\n🔴 Bloom Skincare — ROAS crashed to 1.2x (was 3.8x). Creative fatigue, frequency 4.2.\n🟡 FreshCart — budget pacing 3 days ahead. Recommend -15% daily.\n🟢 UrbanFit retargeting at 6.2x — room to scale $1,200/day\n\n✅ Auto-paused 2 low-CTR ad sets on PetTreats at 3am. $0 wasted.\n✅ Reduced Bloom bids 15% at 4am to slow the bleeding.\n\nTotal portfolio: $18,420 weekly spend, 3.4x blended ROAS.",
        time: "7:00 AM",
        delay: 1500,
        buttons: ["APPROVE ALL", "Details on Bloom", "Skip for now"],
      },
      {
        id: "m2",
        sender: "user",
        text: "APPROVE ALL",
        time: "7:01 AM",
        delay: 800,
      },
      {
        id: "m3",
        sender: "pulse",
        text: "Done ✅\n\n• Bloom \"Summer Sale\" — paused\n• FreshCart daily budget — reduced 15%\n• UrbanFit retargeting — scaled +$200/day\n\nAll changes applied. Your portfolio is stabilized.\n\nGo have breakfast with your daughter. I'll watch everything. 💛",
        time: "7:01 AM",
        delay: 1200,
      },
    ],
  },
  {
    id: "client-update",
    title: "9:15 AM — Client Asks",
    subtitle: "Priya messages: \"How are campaigns doing?\"",
    timeLabel: "9:15 AM",
    messages: [
      {
        id: "c1",
        sender: "user",
        text: "update for Bloom Skincare",
        time: "9:15 AM",
        delay: 800,
      },
      {
        id: "c2",
        sender: "pulse",
        text: "📊 Bloom Skincare — Week of Feb 17-24\n\nSpend: $3,240 / $4,500 budget (72%)\nROAS: 1.2x ⚠️ (target: 3.0x)\nCPA: $8.40 (target: $5.00) 🔴\nConversions: 386 → 212 (-45%)\n\n🔍 Root cause: Creative fatigue\n• \"Glow Serum UGC\" CTR dropped from 1.8% → 0.6%\n• Frequency hit 4.2 on Lookalike audiences\n• Retargeting still strong at 2.1x ROAS\n\n💡 Recommendation: Pause prospecting, refresh creatives, scale retargeting.\n\nWant me to draft a message for Priya?",
        time: "9:15 AM",
        delay: 1500,
      },
      {
        id: "c3",
        sender: "user",
        text: "draft message for Priya",
        time: "9:16 AM",
        delay: 800,
      },
      {
        id: "c4",
        sender: "pulse",
        text: "Here's a draft for Priya:\n\n\"Hi Priya! Quick update on campaigns —\n\nThe Summer Sale campaign has served its initial audience well, and we're seeing natural creative fatigue setting in (which is normal at this stage). I've already paused the underperformers and shifted budget to your retargeting, which is still performing strong.\n\nTo get ROAS back to 3x+, we need to launch the new creative batch we discussed. Can you approve those today? I've got everything ready to go live immediately.\n\nAlso, good news — your retargeting audience is converting at 2.1x, so we have room to scale once fresh creatives are in.\"\n\nSend this to Priya?",
        time: "9:16 AM",
        delay: 2000,
        buttons: ["Send to Priya", "Edit first", "Save as draft"],
      },
      {
        id: "c5",
        sender: "user",
        text: "Send to Priya",
        time: "9:17 AM",
        delay: 600,
      },
      {
        id: "c6",
        sender: "pulse",
        text: "Sent ✅ Message delivered to Priya (WhatsApp).\n\nThat response took 45 seconds instead of 12 minutes. You just saved yourself a trip through Ads Manager, Google Sheets, and back. 🎯",
        time: "9:17 AM",
        delay: 1000,
      },
    ],
  },
  {
    id: "crisis",
    title: "Saturday, 4:30 PM — Your Cousin's Wedding",
    subtitle: "You're on the dance floor. Your phone buzzes once.",
    timeLabel: "4:30 PM",
    messages: [
      {
        id: "e1",
        sender: "pulse",
        text: "🚨 CRITICAL: FreshCart\n\nCheckout page returning 500 errors. Conversion rate dropped to 0% in the last 18 minutes.\n\nAll campaigns still running — currently spending $28/hour on traffic to a broken checkout.\n\n⚡ I've automatically paused all FreshCart campaigns to stop the bleed.\n\n$0 wasted since detection.\n\nI've also sent a notification to their dev team email on file.",
        time: "4:30 PM",
        delay: 1500,
        buttons: ["Got it, thanks", "Resume campaigns", "Alert the client"],
      },
      {
        id: "e2",
        sender: "user",
        text: "Got it, thanks",
        time: "4:31 PM",
        delay: 600,
      },
      {
        id: "e3",
        sender: "pulse",
        text: "All good. Go enjoy the wedding 🎉\n\nI'll keep monitoring FreshCart's checkout. The moment it's back online, I'll send you a confirmation before resuming any campaigns.\n\nNo client money wasted. No angry phone calls. You didn't even have to leave the dance floor.",
        time: "4:31 PM",
        delay: 1200,
      },
    ],
  },
  {
    id: "friday",
    title: "Friday, 4:55 PM",
    subtitle: "Usually you'd still be building reports. Not anymore.",
    timeLabel: "4:55 PM",
    messages: [
      {
        id: "f1",
        sender: "user",
        text: "send all weekly reports",
        time: "4:55 PM",
        delay: 800,
      },
      {
        id: "f2",
        sender: "pulse",
        text: "Generating reports for 4 clients...\n\n✅ Bloom Skincare — sent to Priya\n✅ FreshCart — sent to Rahul & team\n✅ TechLoom — sent to dev@techloom.com\n✅ NovaHealth — sent to marketing@novahealth.in\n\nEach report includes:\n• Performance summary with AI commentary\n• Top & bottom performing creatives\n• Budget utilization & pacing\n• Recommendations for next week\n• Branded PDF with their logo\n\nAll 4 reports generated and delivered in 34 seconds.\nThat used to take you 3 hours.",
        time: "4:56 PM",
        delay: 2000,
      },
      {
        id: "f3",
        sender: "pulse",
        text: "It's 4:56 PM on a Friday.\n\nYour reports are sent. Your clients are updated. Your campaigns are optimized.\n\nGo home, Himanshu. Your weekend just started. 🌅",
        time: "4:56 PM",
        delay: 1500,
      },
      {
        id: "f4",
        sender: "user",
        text: "🙏",
        time: "4:57 PM",
        delay: 600,
        isEmoji: true,
      },
    ],
  },
];
