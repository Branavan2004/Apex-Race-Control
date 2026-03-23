import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import DriverProfile from "@/components/DriverProfile";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import RaceHistory from "@/components/RaceHistory";
import PitWall from "@/components/PitWall";
import LiveTelemetry from "@/components/LiveTelemetry";
import ContactRadio from "@/components/ContactRadio";
import FinishLine from "@/components/FinishLine";
import RaceHUD from "@/components/RaceHUD";
import BroadcastTicker from "@/components/BroadcastTicker";
import SpeedBackground from "@/components/SpeedBackground";
import WeatherPanel from "@/components/WeatherPanel";
import DRSOverlay from "@/components/DRSOverlay";
import FlagSystem from "@/components/FlagSystem";
import SectorDivider from "@/components/SectorDivider";
import RaceDirectorBar from "@/components/RaceDirectorBar";
import TimingTower from "@/components/TimingTower";
import TrackMap from "@/components/TrackMap";
import TyreDegradation from "@/components/TyreDegradation";
import ERSBar from "@/components/ERSBar";
import SteeringInput from "@/components/SteeringInput";
import FloatingCVButton from "@/components/overlays/FloatingCVButton";
import { SECTION_ORDER } from "@/data/siteData";

const CertificationsGarage = lazy(() => import("@/components/CertificationsGarage"));

const Index = () => {
  const dividerItems = SECTION_ORDER.slice(0, -1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <SpeedBackground />
      <RaceDirectorBar />
      <FlagSystem />
      <BroadcastTicker />
      <DRSOverlay />
      <RaceHUD />
      <WeatherPanel />
      <TimingTower />
      <TrackMap />
      <TyreDegradation />
      <ERSBar />
      <SteeringInput />
      <FloatingCVButton />

      <div className="relative z-10">
        <HeroSection />
        <SectorDivider number={dividerItems[0].short} name={dividerItems[0].name} />
        <DriverProfile />
        <SectorDivider number={dividerItems[1].short} name={dividerItems[1].name} />
        <SkillsTelemetry />
        <SectorDivider number={dividerItems[2].short} name={dividerItems[2].name} />
        <RaceHistory />
        <SectorDivider number={dividerItems[3].short} name={dividerItems[3].name} />
        <PitWall />
        <SectorDivider number={dividerItems[4].short} name={dividerItems[4].name} />
        <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-28 text-center font-data text-xs uppercase tracking-[0.3em] text-[var(--f1-muted)] md:px-12">Loading credentials garage…</div>}>
          <CertificationsGarage />
        </Suspense>
        <SectorDivider number={dividerItems[5].short} name={dividerItems[5].name} />
        <LiveTelemetry />
        <SectorDivider number={dividerItems[6].short} name={dividerItems[6].name} />
        <ContactRadio />
        <SectorDivider number={dividerItems[7].short} name={dividerItems[7].name} />
        <FinishLine />
      </div>
    </div>
  );
};

export default Index;
