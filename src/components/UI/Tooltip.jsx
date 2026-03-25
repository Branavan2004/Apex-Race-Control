import './UI.css';

function Tooltip({ children, label }) {
  return (
    <span className="ui-tooltipWrap">
      {children}
      <span className="ui-tooltipBubble">{label}</span>
    </span>
  );
}

export default Tooltip;
