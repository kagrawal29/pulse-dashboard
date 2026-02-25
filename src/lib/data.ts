export type ClientHealth = "green" | "yellow" | "red";

export interface Client {
  id: string;
  name: string;
  initials: string;
  color: string;
  colorBg: string;
  platform: string;
  campaigns: number;
  health: ClientHealth;
  roas: number;
  spend: number;
  cpa: number;
  roasHistory: number[];
}

export interface FocusItem {
  id: string;
  type: "urgent" | "warning" | "opportunity";
  client: string;
  title: string;
  subtitle: string;
  action: string;
  resolved?: boolean;
  autoResolved?: boolean;
}

export interface AutopilotEntry {
  id: string;
  time: string;
  type: "auto" | "done" | "alert";
  text: string;
  highlight: string;
  platform: "Meta" | "Google";
}

export const clients: Client[] = [
  {
    id: "bloom",
    name: "Bloom Skincare",
    initials: "BL",
    color: "#818cf8",
    colorBg: "#6366f110",
    platform: "Meta",
    campaigns: 4,
    health: "red",
    roas: 1.2,
    spend: 3240,
    cpa: 8.4,
    roasHistory: [3.8, 3.5, 3.1, 2.4, 1.8, 1.4, 1.2],
  },
  {
    id: "freshcart",
    name: "FreshCart",
    initials: "FC",
    color: "#f59e0b",
    colorBg: "#f59e0b10",
    platform: "Google",
    campaigns: 6,
    health: "yellow",
    roas: 2.8,
    spend: 2840,
    cpa: 4.2,
    roasHistory: [3.0, 3.1, 2.9, 2.8, 2.8, 2.7, 2.8],
  },
  {
    id: "urbanfit",
    name: "UrbanFit",
    initials: "UF",
    color: "#22A06B",
    colorBg: "#22A06B10",
    platform: "Meta + Google",
    campaigns: 8,
    health: "green",
    roas: 4.6,
    spend: 5100,
    cpa: 2.1,
    roasHistory: [3.8, 4.0, 4.1, 4.3, 4.4, 4.5, 4.6],
  },
  {
    id: "novahealth",
    name: "NovaHealth",
    initials: "NV",
    color: "#388BFF",
    colorBg: "#388BFF10",
    platform: "Google",
    campaigns: 3,
    health: "green",
    roas: 3.9,
    spend: 1800,
    cpa: 3.1,
    roasHistory: [3.6, 3.7, 3.7, 3.8, 3.8, 3.9, 3.9],
  },
  {
    id: "pettreats",
    name: "PetTreats Co",
    initials: "PT",
    color: "#f472b6",
    colorBg: "#f472b610",
    platform: "Meta",
    campaigns: 5,
    health: "green",
    roas: 5.1,
    spend: 2200,
    cpa: 1.8,
    roasHistory: [4.0, 4.2, 4.5, 4.7, 4.8, 5.0, 5.1],
  },
  {
    id: "zenstudio",
    name: "ZenStudio",
    initials: "ZS",
    color: "#8B5CF6",
    colorBg: "#8B5CF610",
    platform: "Meta + Google",
    campaigns: 5,
    health: "green",
    roas: 3.2,
    spend: 3240,
    cpa: 3.5,
    roasHistory: [3.0, 3.0, 3.1, 3.1, 3.1, 3.2, 3.2],
  },
];

export const focusItems: FocusItem[] = [
  {
    id: "1",
    type: "urgent",
    client: "Bloom Skincare",
    title: "ROAS crashed to 1.2x on \"Summer Sale\"",
    subtitle: "Was 3.8x last week · Burning $420/day at a loss",
    action: "Pause",
  },
  {
    id: "2",
    type: "warning",
    client: "FreshCart",
    title: "Budget runs out by Thursday",
    subtitle: "$2,840 of $4,000 spent · 3 days ahead of schedule",
    action: "Fix Pacing",
  },
  {
    id: "3",
    type: "opportunity",
    client: "UrbanFit",
    title: "Retargeting crushing it at 6.2x ROAS",
    subtitle: "Only using 40% of budget · $1,200/day headroom",
    action: "Scale",
  },
  {
    id: "4",
    type: "opportunity",
    client: "PetTreats Co",
    title: "Paused 2 low CTR ad sets",
    subtitle: "Handled by autopilot at 6:50am",
    action: "Done",
    autoResolved: true,
  },
];

export const autopilotEntries: AutopilotEntry[] = [
  {
    id: "1",
    time: "8:42am",
    type: "auto",
    text: "Reduced bid 15% on",
    highlight: "Bloom \"Summer Sale\"",
    platform: "Meta",
  },
  {
    id: "2",
    time: "7:15am",
    type: "done",
    text: "Scaled +$200/day on",
    highlight: "UrbanFit retargeting",
    platform: "Meta",
  },
  {
    id: "3",
    time: "6:50am",
    type: "done",
    text: "Paused 2 ad sets in",
    highlight: "PetTreats \"Spring\"",
    platform: "Meta",
  },
  {
    id: "4",
    time: "2:10am",
    type: "alert",
    text: "Creative fatigue on",
    highlight: "Bloom \"Glow Serum\"",
    platform: "Meta",
  },
  {
    id: "5",
    time: "1:45am",
    type: "auto",
    text: "Shifted $300 brand→non-brand",
    highlight: "FreshCart search",
    platform: "Google",
  },
];
