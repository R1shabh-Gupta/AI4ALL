import CTA from "@/components/CTA";
import FAQsSection from "@/components/FAQsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import VersionSection from "@/components/VersionSection";

type appProps = {
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
};

const HomePage = ({ isLoggedIn, setIsLoggedIn }: appProps) => {
  return (
    <>
      <HeroSection isLoggedIn={isLoggedIn} />
      <OverviewSection />
      <VersionSection />
      <FeaturesSection />
      <FAQsSection />
      <CTA isLoggedIn={isLoggedIn} />
      <Footer isLoggedIn={isLoggedIn} onIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default HomePage;
