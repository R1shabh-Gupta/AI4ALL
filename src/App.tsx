import "./App.css";
import FAQsSection from "./components/FAQsSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OverviewSection from "./components/OverviewSection";
import VersionSection from "./components/VersionSection";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <VersionSection />
      <FeaturesSection />
      <FAQsSection />
    </div>
  );
}

export default App;
