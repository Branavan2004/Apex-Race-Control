import './UI.css';

function ErrorCard({ title, message, inline = false, variant = 'error' }) {
  return (
    <div className={`ui-stateCard ${inline ? 'ui-stateCard--inline' : ''} ui-stateCard--${variant}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorCard;
