import HeroSection from "@/components/HeroSection";
import DriverProfile from "@/components/DriverProfile";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import RaceHistory from "@/components/RaceHistory";
import PitWall from "@/components/PitWall";
import LiveTelemetry from "@/components/LiveTelemetry";
import ContactRadio from "@/components/ContactRadio";
import FinishLine from "@/components/FinishLine";
import RaceHUD from "@/components/RaceHUD";
import RaceTicker from "@/components/RaceTicker";
import TrackMap from "@/components/TrackMap";
import RaceFlagBanner from "@/components/RaceFlagBanner";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <RaceTicker />
      <RaceHUD />
      <TrackMap />
      <RaceFlagBanner />

      <div className="relative z-10">
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
        <LiveTelemetry />
        <div className="sector-divider" />
        <ContactRadio />
        <div className="sector-divider" />
        <FinishLine />
      </div>
    </div>
  );
};

export default Index;
