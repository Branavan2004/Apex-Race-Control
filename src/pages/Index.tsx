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
import CursorTrail from "@/components/CursorTrail";
import FlagSystem from "@/components/FlagSystem";
import TyreDegradation from "@/components/TyreDegradation";
import SteeringInput from "@/components/SteeringInput";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background grain">
      <SpeedBackground />
      <CursorTrail />
      <FlagSystem />
      <BroadcastTicker />
      <TimingTower />
      <DRSOverlay />
      <RadioPopup />
      <RaceHUD />
      <TrackMap />
      <WeatherPanel />
      <TyreDegradation />
      <ERSBar />
      <SteeringInput />

      <div className="relative z-10">
        <HeroSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <DriverProfile />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <SkillsTelemetry />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <RaceHistory />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <PitWall />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <LiveTelemetry />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <ContactRadio />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <FinishLine />
      </div>
    </div>
  );
};

export default Index;
