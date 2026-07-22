import type { KnowledgeArticle } from "./types";

/** Local fallback when Supabase env is missing or unreachable. */
export const LOCAL_SEED_ARTICLES: KnowledgeArticle[] = [
  {
    id: "local-1",
    slug: "fit-before-volume-in-outbound",
    title: "Why outbound fails when volume outruns fit",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-02T10:00:00Z",
    excerpt:
      "Outbound breaks when teams scale sends before they define who is actually worth a conversation.",
    body_md: null,
    revomnis_comment:
      "Fit before volume is not a slogan for us — it is the operating rule. We classify accounts and contacts before sequencing so campaigns protect reply quality and meeting standards instead of optimizing for send volume.",
    topics: ["ICP", "targeting"],
    status: "published",
    seo_title: "Fit before volume in outbound — Revomnis Knowledge",
    seo_description:
      "Why outbound fails when volume outruns fit, and how Revomnis builds audience logic before campaigns scale.",
  },
  {
    id: "local-2",
    slug: "coordinated-email-and-linkedin",
    title: "Email and LinkedIn only work as one motion",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-09T10:00:00Z",
    excerpt:
      "Treating cold email and LinkedIn as separate services creates mixed signals and weak handoffs.",
    body_md: null,
    revomnis_comment:
      "Revomnis runs email and LinkedIn against one ICP, one messaging system, and one meeting objective. LinkedIn reinforces familiarity; email carries scalable sequencing and reply generation. Separate vendors usually cannot hold that coherence.",
    topics: ["LinkedIn", "email", "sequencing"],
    status: "published",
    seo_title: "Coordinated email and LinkedIn outbound — Revomnis Knowledge",
    seo_description:
      "How Revomnis coordinates email and LinkedIn as one outbound motion instead of two disconnected channels.",
  },
  {
    id: "local-3",
    slug: "protect-the-primary-domain",
    title: "Do not burn your primary domain on cold email",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-16T10:00:00Z",
    excerpt:
      "Primary domains should not be the default sending layer for cold outbound.",
    body_md: null,
    revomnis_comment:
      "We operate client-branded secondary domains and managed inbox infrastructure so outbound can run with deliverability discipline while the primary brand domain stays protected. Infrastructure is part of the service, not a bolt-on.",
    topics: ["deliverability", "infrastructure"],
    status: "published",
    seo_title: "Protect your primary domain in cold email — Revomnis Knowledge",
    seo_description:
      "Why Revomnis uses managed secondary domains for cold email instead of risking the primary brand domain.",
  },
  {
    id: "local-4",
    slug: "qualified-meetings-not-calendar-spam",
    title: "A booked meeting is not automatically a qualified meeting",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-23T10:00:00Z",
    excerpt:
      "Calendar volume without buyer-fit criteria creates noise for sales and weak pipeline quality.",
    body_md: null,
    revomnis_comment:
      "Before campaigns launch, we define fit signals, disqualifiers, and commercial intent criteria with the client. Reply handling and qualification sit inside the operating system so meetings handed over are worth the conversation.",
    topics: ["qualification", "meetings"],
    status: "published",
    seo_title: "Qualified outbound meetings — Revomnis Knowledge",
    seo_description:
      "How Revomnis defines and protects meeting quality instead of optimizing for raw booked-call volume.",
  },
  {
    id: "local-5",
    slug: "visible-not-black-box-outbound",
    title: "Outbound should be visible, not a black box",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-06-30T10:00:00Z",
    excerpt:
      "Clients should see what is running, what is moving, and what is being learned — not just a monthly activity dump.",
    body_md: null,
    revomnis_comment:
      "The Revomnis portal is a visibility layer for managed outbound: campaign movement, meetings, segments, and insights. The product is still the operating system; the portal exists so clients are not buying a black box.",
    topics: ["visibility", "portal"],
    status: "published",
    seo_title: "Visible outbound, not a black box — Revomnis Knowledge",
    seo_description:
      "Why Revomnis pairs managed outbound with portal visibility instead of black-box reporting.",
  },
  {
    id: "local-6",
    slug: "messaging-tests-need-segment-logic",
    title: "Messaging tests are useless without segment logic",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-07T10:00:00Z",
    excerpt:
      "A/B copy tests on a mixed audience produce noise, not learning.",
    body_md: null,
    revomnis_comment:
      "We test angles inside clear segments so persona learning and objection patterns are attributable. Insights are only useful when audience definition and campaign execution share the same logic.",
    topics: ["messaging", "ICP", "testing"],
    status: "published",
    seo_title: "Outbound messaging tests and segment logic — Revomnis Knowledge",
    seo_description:
      "Why Revomnis ties messaging tests to segment logic so outbound learning is attributable.",
  },
  {
    id: "local-7",
    slug: "reply-handling-is-the-system",
    title: "Reply handling is not an afterthought",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-14T10:00:00Z",
    excerpt:
      "Most outbound programs break after the first positive reply because nobody owns interpretation and next step.",
    body_md: null,
    revomnis_comment:
      "Revomnis monitors, interprets, and qualifies replies as part of the managed service. The path from reply to meeting is designed, not forwarded as an unstructured inbox dump.",
    topics: ["replies", "qualification"],
    status: "published",
    seo_title: "Outbound reply handling — Revomnis Knowledge",
    seo_description:
      "How Revomnis treats reply handling as part of the outbound operating system, not a handoff afterthought.",
  },
  {
    id: "local-8",
    slug: "anti-patterns-vanity-metrics",
    title: "Vanity metrics hide weak outbound systems",
    source_name: "Revomnis",
    source_url: "https://revomnis.com/",
    author_name: "Revomnis",
    published_at: "2026-07-21T10:00:00Z",
    excerpt:
      "Open rates, connection counts, and raw meetings can look healthy while pipeline quality is poor.",
    body_md: null,
    revomnis_comment:
      "We refuse to sell vanity as proof. The metrics that matter are fit, conversation quality, qualified meetings, and what the market is teaching the system. If a report cannot explain movement and learning, it is theater.",
    topics: ["anti-patterns", "visibility"],
    status: "published",
    seo_title: "Outbound vanity metrics to avoid — Revomnis Knowledge",
    seo_description:
      "Which outbound vanity metrics Revomnis rejects, and what visibility should show instead.",
  },
];
