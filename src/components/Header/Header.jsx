import { useEffect, useState } from 'react';

import { formatClockUtc } from '../../lib/formatters';
import './Header.css';

function Header({ race }) {
  const [clock, setClock] = useState(formatClockUtc());

  useEffect(() => {
    const interval = window.setInterval(() => setClock(formatClockUtc()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header__brand">
        <svg className="header__logo" viewBox="0 0 92 34" aria-hidden="true">
          <ellipse cx="21" cy="17" rx="20" ry="12" fill="#E10600" />
          <path d="M39 8 H61 L55 14 H47 L41 26 H32 L39 8 Z" fill="#fff" />
          <path d="M58 8 H87 L81 14 H69 L66 19 H79 L74 26 H52 L58 8 Z" fill="#fff" />
        </svg>
        <span className="header__title">APEX RACE CONTROL</span>
      </div>
      <div className="header__race">
        <span className="header__raceName">{race?.displayName || 'LOADING GRAND PRIX'}</span>
        <span className="header__round">RD {String(race?.round || 0).padStart(2, '0')} / 24</span>
      </div>
      <div className="header__meta">
        <span className="header__clock">{clock} UTC</span>
      </div>
    </header>
  );
}

export default Header;
