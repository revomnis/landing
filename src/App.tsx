import { Head } from "./Head";
import { LandingPage } from "./LandingPage";
import { PrivacyPage } from "./PrivacyPage";
import { useAnimateInOnView } from "./hooks/useAnimateInOnView";

export default function App() {
  useAnimateInOnView();
  const path = window.location.pathname;

  if (path === "/privacy") {
    return (
      <>
        <Head path="/privacy" />
        <PrivacyPage />
      </>
    );
  }

  return (
    <>
      <Head path="/" />
      <LandingPage />
    </>
  );
}
