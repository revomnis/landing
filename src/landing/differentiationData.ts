export const DIFF_COLUMNS = [
  {
    key: "diy" as const,
    label: "In-house or DIY outbound",
    description:
      "You manage the tools, inboxes, lists, copy, replies, reporting, and trial-and-error.",
  },
  {
    key: "generic" as const,
    label: "Generic lead-gen agency",
    description:
      "They send activity, hand over reports, and often leave qualification and interpretation unclear.",
  },
  {
    key: "revomnis" as const,
    label: "Revomnis",
    description:
      "We build and run the outbound engine, then make the work visible through campaigns, meetings, segments, and insights.",
  },
] as const;

export const DIFF_ROWS = [
  {
    label: "Audience definition",
    diy: "Built from assumptions and manual research",
    generic: "Broad ICP notes turned into lists",
    revomnis:
      "Evidence-based ICP, classification, segment logic, and exclusions",
  },
  {
    label: "Infrastructure",
    diy: "You set up and manage domains, inboxes, and deliverability",
    generic: "Setup may be opaque or inconsistent",
    revomnis:
      "Client-branded secondary domains and Revomnis-managed infrastructure",
  },
  {
    label: "Channel model",
    diy: "Email and LinkedIn often run separately",
    generic: "Usually email-heavy or channel-fragmented",
    revomnis: "Coordinated email + LinkedIn around one audience logic",
  },
  {
    label: "Reply handling",
    diy: "Your team sorts, chases, and qualifies replies",
    generic: "Replies may be passed over without enough context",
    revomnis: "Replies are handled, qualified, and moved toward meetings",
  },
  {
    label: "Visibility",
    diy: "You build your own reporting layer",
    generic: "Activity reports and surface metrics",
    revomnis:
      "Portal visibility into campaigns, meetings, segments, and insights",
  },
  {
    label: "Outcome focus",
    diy: "Internal effort and learning curve",
    generic: "Leads, sends, opens, and activity",
    revomnis: "Qualified conversations and booked meetings",
  },
] as const;

export type DiffColumnKey = (typeof DIFF_COLUMNS)[number]["key"];
export type DiffRow = (typeof DIFF_ROWS)[number];
