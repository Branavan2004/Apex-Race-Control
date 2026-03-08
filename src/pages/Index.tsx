import HeroSection from "@/components/HeroSection";
import DriverProfile from "@/components/DriverProfile";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import RaceHistory from "@/components/RaceHistory";
import PitWall from "@/components/PitWall";
import ContactRadio from "@/components/ContactRadio";
import FinishLine from "@/components/FinishLine";
import RaceHUD from "@/components/RaceHUD";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <RaceHUD />
      <HeroSection />
      <div className="sector-divider" />
      <DriverProfile />
      <div className="sector-divider" />
      <SkillsTelemetry />
      <div className="sector-divider" />
      <RaceHistory />
      <div className="sector-divider" />
      <PitWall />
      <div className="sector-divider" />
      <ContactRadio />
      <div className="sector-divider" />
      <FinishLine />
    </div>
  );
};

export default Index;
