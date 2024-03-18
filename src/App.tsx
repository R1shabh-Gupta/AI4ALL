import { useState } from "react";
import "./App.css";
import CTA from "./components/CTA";
import FAQsSection from "./components/FAQsSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OverviewSection from "./components/OverviewSection";
import VersionSection from "./components/VersionSection";
import { auth } from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
    }
  });

  return (
    <div>
      <Navbar onIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />
      <OverviewSection />
      <VersionSection />
      <FeaturesSection />
      <FAQsSection />
      <CTA />
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
