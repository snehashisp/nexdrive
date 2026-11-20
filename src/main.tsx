// Entry point: the browser runs this file first (index.html loads it).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Global CSS first, so component CSS Modules (imported through App) come later and win ties.
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/app.css';
import '@/styles/interactions.css';
import App from '@/app/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('index.html is missing the #root element');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register the service worker (public/sw.js) so NexDrive can be installed and works offline.
// Only in the built app: during `npm run dev` a service worker would serve stale cached files.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch((e) => console.warn('[nexdrive] SW registration failed:', e));
  });
}
