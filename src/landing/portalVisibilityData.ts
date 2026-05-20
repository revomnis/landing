export const PORTAL_TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "campaigns", label: "Campaigns" },
  { key: "meetings", label: "Meetings" },
  { key: "insights", label: "Insights" },
  { key: "segments", label: "Segments" },
] as const;

export const ACTIVE_TAB = "dashboard";

export const CAMPAIGN_ROWS = [
  { label: "Campaign", value: "Founder-led B2B services" },
  { label: "Channels", value: "Email + LinkedIn" },
] as const;

export const SEGMENT_ROWS = [
  { label: "Founder-led services", active: true },
  { label: "Agency operators", active: true },
  { label: "Recruiting firms", active: true },
  { label: "Low-fit local services", active: false },
] as const;

export const MEETING_SOURCES = [
  { count: 2, label: "founder-led services" },
  { count: 1, label: "agency operator" },
  { count: 1, label: "recruiting firm" },
] as const;

export const INTERPRETATION_ROWS = [
  {
    label: "Observation",
    text: "Second-touch emails are producing clearer positive replies.",
  },
  {
    label: "Implication",
    text: "Founder-led service firms are responding to SDR hiring cost.",
  },
  {
    label: "Next move",
    text: "Reinforce the sequence with LinkedIn touchpoints.",
  },
] as const;

export const VISIBILITY_CATEGORIES = [
  {
    title: "What is running",
    description: "Active campaigns, channel mix, and segments in motion.",
  },
  {
    title: "What is moving",
    description: "Replies, qualified conversations, and meeting context.",
  },
  {
    title: "What is being learned",
    description:
      "Segment patterns, objections, buyer language, and recommended next moves.",
  },
] as const;
