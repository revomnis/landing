import { LandingPage } from "./LandingPage";
import { useAnimateInOnView } from "./hooks/useAnimateInOnView";

export default function App() {
  useAnimateInOnView();
  return <LandingPage />;
}
