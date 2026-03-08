import HeroSection from "@/components/HeroSection";
import DriverProfile from "@/components/DriverProfile";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import RaceHistory from "@/components/RaceHistory";
import PitWall from "@/components/PitWall";
import LiveTelemetry from "@/components/LiveTelemetry";
import ContactRadio from "@/components/ContactRadio";
import FinishLine from "@/components/FinishLine";
import RaceHUD from "@/components/RaceHUD";
import TrackMap from "@/components/TrackMap";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <RaceHUD />
      <TrackMap />

      <div className="relative z-10">
        <HeroSection />
        <DriverProfile />
        <SkillsTelemetry />
        <RaceHistory />
        <PitWall />
        <LiveTelemetry />
        <ContactRadio />
        <FinishLine />
      </div>
    </div>
  );
};

export default Index;
