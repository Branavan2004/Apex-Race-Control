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
import SectorDivider from "@/components/SectorDivider";
import RaceDirectorBar from "@/components/RaceDirectorBar";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background grain vignette">
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
      <RaceDirectorBar />

      <div className="relative z-10">
        <HeroSection />
        <SectorDivider sector={1} label="Driver Briefing" />
        <DriverProfile />
        <SectorDivider sector={2} label="Technical Telemetry" />
        <SkillsTelemetry />
        <SectorDivider sector={3} label="Race Classification" />
        <RaceHistory />
        <SectorDivider sector={4} label="Pit Wall" />
        <PitWall />
        <SectorDivider sector={5} label="Live Data Feed" />
        <LiveTelemetry />
        <SectorDivider sector={6} label="Team Radio" />
        <ContactRadio />
        <SectorDivider sector={7} label="Chequered Flag" />
        <FinishLine />
      </div>
    </div>
  );
};

export default Index;
