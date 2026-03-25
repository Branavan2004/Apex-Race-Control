import './UI.css';

function LoadingSkeleton() {
  return (
    <div className="ui-loadingShell">
      <div className="ui-loadingHeader skeleton" />
      <div className="ui-loadingBody">
        <div className="ui-loadingSidebar skeleton" />
        <div className="ui-loadingMain">
          <div className="ui-loadingTrack skeleton" />
          <div className="ui-loadingChart skeleton" />
        </div>
        <div className="ui-loadingRight">
          <div className="ui-loadingLeaderboard skeleton" />
          <div className="ui-loadingTelemetry skeleton" />
        </div>
      </div>
      <div className="ui-loadingFooter skeleton" />
    </div>
  );
}

export default LoadingSkeleton;
