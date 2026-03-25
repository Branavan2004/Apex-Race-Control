import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Apex Race Control render error', error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isDevelopment = import.meta.env.DEV;

    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#08080f', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ width: 560, maxWidth: '90vw', padding: 24, borderRadius: 16, background: '#12121f', border: '1px solid #2d2d44' }}>
          <h1 style={{ marginBottom: 12, fontFamily: 'Rajdhani, sans-serif' }}>Apex Race Control encountered an error</h1>
          <p style={{ color: '#a0a0b8', marginBottom: 16 }}>
            The UI crashed during rendering. Reload the page to recover.
          </p>
          {isDevelopment && (
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#ffd700' }}>
              {String(this.state.error)}
            </pre>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ marginTop: 16, border: 0, borderRadius: 999, padding: '10px 14px', background: '#e10600', color: '#fff', cursor: 'pointer' }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
