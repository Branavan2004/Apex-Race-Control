import './TrackMap.css';

function TrackOverlay({ layout, lap }) {
  return (
    <>
      <div className="trackMap__infoCard">
        <span className="trackMap__infoTitle">{layout.name}</span>
        <div className="trackMap__infoRow">
          <span>{layout.circuitLength.toFixed(3)} KM</span>
          <span>LAP RECORD {layout.lapRecord}</span>
          <span>LAP {lap} / {layout.totalLaps}</span>
        </div>
      </div>
      <div className="trackMap__watermark">{layout.name.toUpperCase()}</div>
    </>
  );
}

export default TrackOverlay;
