import { useCallback, useEffect, useState } from "react";
import { Head } from "./Head";
import { LandingPage } from "./LandingPage";
import { PrivacyPage } from "./PrivacyPage";
import { useAnimateInOnView } from "./hooks/useAnimateInOnView";
import { KnowledgeArticlePage } from "./knowledge/KnowledgeArticlePage";
import { KnowledgeFeedPage } from "./knowledge/KnowledgeFeedPage";

function parsePath(pathname: string): {
  page: "home" | "privacy" | "knowledge" | "knowledge-article";
  slug?: string;
} {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/privacy") return { page: "privacy" };
  if (path === "/knowledge") return { page: "knowledge" };

  const articleMatch = path.match(/^\/knowledge\/([^/]+)$/);
  if (articleMatch) {
    return { page: "knowledge-article", slug: decodeURIComponent(articleMatch[1]) };
  }

  return { page: "home" };
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
  useAnimateInOnView();
  const [route, setRoute] = useState(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openArticle = useCallback((slug: string) => {
    navigate(`/knowledge/${slug}`);
    window.scrollTo(0, 0);
  }, []);

  const backToFeed = useCallback(() => {
    navigate("/knowledge");
    window.scrollTo(0, 0);
  }, []);

  if (route.page === "privacy") {
    return (
      <>
        <Head path="/privacy" />
        <PrivacyPage />
      </>
    );
  }

  if (route.page === "knowledge") {
    return (
      <>
        <Head path="/knowledge" />
        <KnowledgeFeedPage onOpenArticle={openArticle} />
      </>
    );
  }

  if (route.page === "knowledge-article" && route.slug) {
    return (
      <KnowledgeArticlePage slug={route.slug} onBack={backToFeed} />
    );
  }

  return (
    <>
      <Head path="/" />
      <LandingPage />
    </>
  );
}
