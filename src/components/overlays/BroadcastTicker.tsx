import { memo } from 'react';

import { TICKER_ITEMS } from '../../data/radioMessages';

const TickerText = `${TICKER_ITEMS.join('  ·  ')}  ·  `;

const BroadcastTicker = memo(function BroadcastTicker() {
  return (
    <div className="overlay-ticker">
      <div className="overlay-ticker__track">
        <span>{TickerText}</span>
        <span>{TickerText}</span>
      </div>
    </div>
  );
});

export default BroadcastTicker;
