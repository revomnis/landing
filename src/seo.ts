import { FAQ_ITEMS } from "./landing/faqData";

export interface RouteSeo {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  jsonLd?: object[];
}

const SITE_URL = "https://revomnis.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revomnis",
  url: SITE_URL,
  logo: `${SITE_URL}/images/og-cover.jpg`,
  description:
    "Revomnis builds and runs coordinated email and LinkedIn outbound systems for B2B companies.",
  sameAs: ["https://www.linkedin.com/company/revomnis"],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Revomnis",
  url: SITE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const SEO_BY_ROUTE: Record<string, RouteSeo> = {
  "/": {
    title: "Revomnis — Managed outbound for qualified B2B meetings",
    description:
      "Managed outbound for B2B teams. Revomnis builds and runs your system from ICP to booked calls—qualified meetings without SDR overhead.",
    canonical: `${SITE_URL}/`,
    ogImage: OG_IMAGE,
    jsonLd: [organizationSchema, webSiteSchema, faqSchema],
  },
  "/privacy": {
    title: "Privacy Policy — Revomnis",
    description:
      "How Revomnis handles data, cookies, and privacy for its managed outbound service.",
    canonical: `${SITE_URL}/privacy`,
    ogImage: OG_IMAGE,
  },
};

export function getSeo(path: string): RouteSeo {
  return SEO_BY_ROUTE[path] ?? SEO_BY_ROUTE["/"];
}
