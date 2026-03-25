import React from 'react';

import './UI.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui-errorBoundary">
          <h2>Dashboard rendering error</h2>
          <p>Refresh the page to reset the replay surface.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
