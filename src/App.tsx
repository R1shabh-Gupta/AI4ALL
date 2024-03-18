import "./App.css";
import CTA from "./components/CTA";
import FAQsSection from "./components/FAQsSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
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
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

// Refactor: Navbar mobile optimized
