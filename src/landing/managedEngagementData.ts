export type ProcessBlock = {
  title: string;
  description: string;
};

export type Workstream = {
  id: string;
  title: string;
  intro: string;
  inputChips: string[];
  blocks: ProcessBlock[];
  outputChips: { label: string; color: "blue" | "green" | "amber" | "gray" }[];
};

export const WORKSTREAMS: Workstream[] = [
  {
    id: "audience",
    title: "Audience & Infrastructure",
    intro:
      "Fit logic and sending infrastructure are built before outreach begins.",
    inputChips: ["ICP evidence", "Fit signals", "Sender setup"],
    blocks: [
      {
        title: "Fit definition",
        description:
          "Best-fit buyers, roles, and disqualifiers are clarified.",
      },
      {
        title: "Segment classification",
        description:
          "Prospects are grouped by fit, relevance, and campaign logic.",
      },
      {
        title: "Infrastructure setup",
        description:
          "Client-branded domains and inboxes are prepared.",
      },
      {
        title: "Campaign-ready audience",
        description:
          "Segments are shaped into controlled outreach groups.",
      },
    ],
    outputChips: [
      { label: "High-fit", color: "green" },
      { label: "Review", color: "amber" },
      { label: "Exclude", color: "gray" },
    ],
  },
  {
    id: "outreach",
    title: "Coordinated Outreach",
    intro:
      "Email and LinkedIn run around one audience logic and meeting objective.",
    inputChips: ["Email sequence", "LinkedIn touchpoints", "Message direction"],
    blocks: [
      {
        title: "Message structure",
        description:
          "Campaign angles are shaped around the segment and offer.",
      },
      {
        title: "Email motion",
        description:
          "Structured email touchpoints create repeatable outreach rhythm.",
      },
      {
        title: "LinkedIn motion",
        description:
          "Connection and touchpoint activity reinforce the campaign.",
      },
      {
        title: "Campaign monitoring",
        description:
          "Replies, channel signal, and movement are watched together.",
      },
    ],
    outputChips: [
      { label: "Email active", color: "blue" },
      { label: "LinkedIn active", color: "blue" },
      { label: "Aligned motion", color: "green" },
    ],
  },
  {
    id: "replies",
    title: "Replies & Meetings",
    intro:
      "Responses are interpreted, qualified, and moved toward the right next step.",
    inputChips: ["Reply queue", "Qualification criteria", "Calendar path"],
    blocks: [
      {
        title: "Reply review",
        description:
          "Positive replies, objections, and timing signals are classified.",
      },
      {
        title: "Qualification",
        description:
          "Interest is checked against fit, need, and meeting criteria.",
      },
      {
        title: "Objection handling",
        description:
          "Relevant objections are answered without dumping replies on the client.",
      },
      {
        title: "Meeting movement",
        description:
          "Qualified conversations are moved toward booked meetings.",
      },
    ],
    outputChips: [
      { label: "Qualified", color: "green" },
      { label: "Follow-up", color: "amber" },
      { label: "Booked", color: "green" },
    ],
  },
];
