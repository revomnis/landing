export const ENGINE_NODES = [
  { key: "audience", label: "Audience" },
  { key: "classification", label: "Classification" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "email", label: "Email" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "replies", label: "Replies" },
  { key: "meetings", label: "Meetings" },
  { key: "insights", label: "Insights" },
] as const;

export const ENGINE_MOBILE_NODES = [
  { key: "audience", label: "Audience", description: "Fit signals and buyer context." },
  { key: "classification", label: "Classification", description: "Segments, exclusions, and campaign logic." },
  { key: "infrastructure", label: "Infrastructure", description: "Client-branded sending setup managed by Revomnis." },
  { key: "email-linkedin", label: "Email + LinkedIn", description: "Coordinated outreach across both core channels." },
  { key: "replies", label: "Replies", description: "Responses handled, interpreted, and qualified." },
  { key: "meetings", label: "Meetings", description: "Qualified conversations moved into booked calls." },
  { key: "insights", label: "Insights", description: "Campaign learning made visible through the portal." },
] as const;

export const ENGINE_LAYERS = [
  { title: "Define the market", description: "Audience evidence, fit rules, exclusions, and segment logic." },
  { title: "Run the motion", description: "Managed infrastructure, email, LinkedIn, replies, and qualification." },
  { title: "Interpret the signal", description: "Meetings, campaign movement, segment learning, and portal insight." },
] as const;
