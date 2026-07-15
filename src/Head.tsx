import { type RouteSeo, getSeo } from "./seo";

/**
 * Sets document <head> tags for the current route.
 * Tags are set synchronously during render so that Puppeteer captures them
 * during the build-time prerender step. The prerender script then replaces
 * them with static tags in the final HTML anyway, so this mainly serves
 * dev mode and client-side navigation.
 */
export function Head({ path }: { path: string }) {
  const seo: RouteSeo = getSeo(path);

  if (typeof document !== "undefined") {
    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("og:title", seo.title, "property");
    setMeta("og:description", seo.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", seo.ogImage, "property");
    setMeta("og:url", seo.canonical, "property");
    setLink("canonical", seo.canonical);
  }

  return null;
}

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name"
) {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
