/**
 * Build-time prerender script.
 *
 * After `vite build` produces dist/ (the SPA shell), this script:
 * 1. Starts a local preview server serving the built dist/
 * 2. Uses Puppeteer to render each route in a real browser
 * 3. Captures the fully-rendered HTML (head + body)
 * 4. Writes route-specific static HTML files back into dist/
 *
 * This ensures crawlers see the full page content without executing JS.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { platform } from "node:os";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");

const SITE_URL = "https://revomnis.com";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object[];
}

const FAQ_ITEMS = [
  { q: "What does Revomnis actually do?", a: "Revomnis builds and runs coordinated email and LinkedIn outbound systems for B2B companies. The service covers audience definition, managed infrastructure, campaign execution, reply handling, qualification, booked meetings, and portal visibility." },
  { q: "Is Revomnis a lead generation agency?", a: "No. Revomnis is not a generic lead-generation agency. It is a managed outbound operating partner focused on qualified conversations and booked meetings, with infrastructure, targeting logic, reply handling, and visibility built into the service." },
  { q: "Who is Revomnis best for?", a: "Revomnis is built for B2B companies that want outbound working without building the full system internally. Best-fit clients have a clear offer, a definable buyer, and want premium execution without managing domains, inboxes, targeting workflows, reply handling, and reporting themselves." },
  { q: "How do cold email and LinkedIn work together?", a: "Cold email and LinkedIn work together when they follow one audience logic and meeting objective. Email provides scalable sequencing and reply generation, while LinkedIn supports connection-building, familiarity, and selective direct outreach." },
  { q: "What does it take to send cold email campaigns safely?", a: "Safe cold email requires more than a list and a sequence. It requires controlled sending infrastructure, branded secondary domains, configured inboxes, deliverability discipline, relevant targeting, and truthful sender practices." },
  { q: "Should a company use its primary domain for cold email?", a: "No. A company's primary domain should not be the default sending layer for cold email. Revomnis uses client-branded secondary domains to protect the primary brand and support controlled outbound execution." },
  { q: "What counts as a qualified outbound meeting?", a: "A qualified outbound meeting is a meeting that matches the agreed buyer profile, fit signals, disqualifiers, and commercial intent criteria. Revomnis defines this with the client before campaigns are built so the system is optimized for relevance, not just calendar volume." },
  { q: "Who handles replies from prospects?", a: "Revomnis handles replies as part of the service. Replies are monitored, interpreted, qualified, and moved toward the right next step instead of being forwarded to the client without context." },
  { q: "How does Revomnis pricing work?", a: "Revomnis pricing is custom-scoped and typically includes a setup fee plus a monthly management fee. Final scope depends on audience complexity, infrastructure requirements, channel motion, and delivery intensity." },
  { q: "What does the Revomnis portal show?", a: "The Revomnis portal shows campaign activity, meeting movement, segments, and insights. It is a visibility layer for the managed service, not a standalone software product." },
  { q: "What does the client still own after hiring Revomnis?", a: "The client owns the offer, sales conversation, downstream CRM, and close after the meeting is handed off. Revomnis owns the outbound engine layer that creates qualified conversations and booked meetings." },
];

const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Revomnis — Managed outbound for qualified B2B meetings",
    description: "Managed outbound for B2B teams. Revomnis builds and runs your system from ICP to booked calls—qualified meetings without SDR overhead.",
    canonical: `${SITE_URL}/`,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Organization", name: "Revomnis", url: SITE_URL, logo: OG_IMAGE, description: "Revomnis builds and runs coordinated email and LinkedIn outbound systems for B2B companies.", sameAs: ["https://www.linkedin.com/company/revomnis"] },
      { "@context": "https://schema.org", "@type": "WebSite", name: "Revomnis", url: SITE_URL },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Revomnis",
    description: "How Revomnis handles data, cookies, and privacy for its managed outbound service.",
    canonical: `${SITE_URL}/privacy`,
  },
];

function buildHeadTags(route: RouteMeta): string {
  const lines: string[] = [
    `    <title>${route.title}</title>`,
    `    <meta name="description" content="${escapeAttr(route.description)}" />`,
    `    <link rel="canonical" href="${route.canonical}" />`,
    `    <meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `    <meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:url" content="${route.canonical}" />`,
    `    <meta property="og:image" content="${OG_IMAGE}" />`,
  ];

  if (route.jsonLd) {
    for (const schema of route.jsonLd) {
      lines.push(
        `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`
      );
    }
  }

  return lines.join("\n");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function startStaticServer(dir: string, port: number): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || "/", `http://localhost:${port}`);
      const pathname = url.pathname;

      // Try paths in order: exact file, path/index.html, SPA fallback
      const candidates = [
        resolve(dir, pathname === "/" ? "index.html" : pathname.slice(1)),
        resolve(dir, pathname.slice(1), "index.html"),
        resolve(dir, "index.html"),
      ];

      let content: Buffer | null = null;
      let resolvedPath = candidates[0];
      for (const candidate of candidates) {
        try {
          content = readFileSync(candidate) as unknown as Buffer;
          resolvedPath = candidate;
          break;
        } catch {
          continue;
        }
      }

      if (!content) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const ext = resolvedPath.split(".").pop() || "";
      const mimeTypes: Record<string, string> = {
        html: "text/html",
        js: "application/javascript",
        css: "text/css",
        json: "application/json",
        svg: "image/svg+xml",
        jpg: "image/jpeg",
        png: "image/png",
        woff2: "font/woff2",
      };

      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(content);
    });

    server.listen(port, () => resolvePromise(server));
  });
}

async function getChromePath(): Promise<string> {
  if (platform() === "darwin") {
    const paths = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ];
    const found = paths.find((p) => existsSync(p));
    if (found) return found;
    throw new Error("Chrome not found on macOS. Install Google Chrome.");
  }

  // Linux (Vercel build container) — use @sparticuz/chromium
  const chromium = await import("@sparticuz/chromium");
  return await chromium.default.executablePath();
}

async function run() {
  const PORT = 4199;
  console.log("Starting local server...");
  const server = await startStaticServer(DIST, PORT);

  console.log("Launching browser...");
  const executablePath = await getChromePath();
  console.log(`  Using Chrome: ${executablePath}`);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    executablePath,
    headless: true,
  });

  const template = readFileSync(resolve(DIST, "index.html"), "utf-8");

  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route.path}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait a moment for any useEffect-based head manipulation to settle
    await page.waitForSelector("main", { timeout: 10000 }).catch(() => {});

    // Capture rendered body content
    const bodyContent = await page.evaluate(() => {
      return document.getElementById("root")?.innerHTML || "";
    });

    await page.close();

    // Build final HTML: template with injected SEO head + rendered body
    let html = template;

    // Remove existing title and SEO meta from template
    html = html.replace(/<title>[^<]*<\/title>\s*\n?/g, "");
    html = html.replace(
      /\s*<meta\s+(?:name="description"|property="og:[^"]*"|name="twitter:[^"]*")[^>]*\/?>[ \t]*\n?/g,
      ""
    );
    html = html.replace(/\s*<link\s+rel="canonical"[^>]*\/?>[ \t]*\n?/g, "");

    // Inject route-specific head tags before </head>
    const headTags = buildHeadTags(route);
    html = html.replace("</head>", `${headTags}\n  </head>`);

    // Inject rendered body content into the root div
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${bodyContent}</div>`
    );

    // Write to correct path
    const outDir = route.path === "/" ? DIST : resolve(DIST, route.path.slice(1));
    mkdirSync(outDir, { recursive: true });
    const outFile = resolve(outDir, "index.html");
    writeFileSync(outFile, html, "utf-8");

    const bodySize = Math.round(bodyContent.length / 1024);
    console.log(`  ✓ ${route.path} → ${outFile} (${bodySize}KB body)`);
  }

  await browser.close();
  server.close();
  console.log("\nPrerender complete.");
}

run();
