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
import TimingTower from "@/components/TimingTower";
import BroadcastTicker from "@/components/BroadcastTicker";
import RadioPopup from "@/components/RadioPopup";
import SpeedBackground from "@/components/SpeedBackground";
import WeatherPanel from "@/components/WeatherPanel";
import ERSBar from "@/components/ERSBar";
import DRSOverlay from "@/components/DRSOverlay";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background systems */}
      <SpeedBackground />

      {/* Broadcast overlays */}
      <BroadcastTicker />
      <TimingTower />
      <DRSOverlay />
      <RadioPopup />

      {/* HUD elements */}
      <RaceHUD />
      <TrackMap />
      <WeatherPanel />
      <ERSBar />

      {/* Main content */}
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
