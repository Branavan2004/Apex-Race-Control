import { useRef } from 'react';

import { getTrackLayout } from '../../lib/trackLayouts';
import { useTrackAnimation } from '../../hooks/useTrackAnimation';
import TrackSVG from './TrackSVG';
import CarMarker from './CarMarker';
import TrackOverlay from './TrackOverlay';
import './TrackMap.css';

function TrackMap({ session, standings, currentLap }) {
  const layout = getTrackLayout(session?.slug);
  const pathRef = useRef(null);
  const markers = useTrackAnimation(pathRef, standings);

  return (
    <section className="trackMap">
      <TrackOverlay layout={layout} lap={currentLap} />
      <svg className="trackMap__svg" viewBox={layout.viewBox} preserveAspectRatio="xMidYMid meet">
        <TrackSVG layout={layout} pathRef={pathRef} />
        {markers.map((driver) => (
          <CarMarker
            key={driver.driver}
            driverNumber={driver.driverNumber}
            teamColor={driver.teamColor}
            x={driver.x}
            y={driver.y}
            angle={driver.angle}
            isLeader={driver.isLeader}
            position={driver.position}
          />
        ))}
      </svg>
    </section>
  );
}

export default TrackMap;
