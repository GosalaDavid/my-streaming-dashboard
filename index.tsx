import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Guard against server-side execution — Next.js may compile this file
// during SSR/build. Only run DOM mounting on the client.
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}