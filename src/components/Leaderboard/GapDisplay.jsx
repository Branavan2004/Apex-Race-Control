import { formatGap } from '../../lib/formatters';

function GapDisplay({ gapSeconds, lapsBehind }) {
  return <span>{formatGap(gapSeconds, lapsBehind)}</span>;
}

export default GapDisplay;
