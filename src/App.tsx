import "./App.css";
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
    </div>
  );
}

export default App;
