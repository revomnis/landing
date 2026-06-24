import { LandingPage } from "./LandingPage";
import { SalesDeckPage } from "./SalesDeckPage";
import { BrandPage } from "./BrandPage";
import { PrivacyPage } from "./PrivacyPage";
import { useAnimateInOnView } from "./hooks/useAnimateInOnView";

export default function App() {
  useAnimateInOnView();
  const path = window.location.pathname;
  if (path === "/deck") return <SalesDeckPage />;
  if (path === "/brand") return <BrandPage />;
  if (path === "/privacy") return <PrivacyPage />;
  return <LandingPage />;
}
