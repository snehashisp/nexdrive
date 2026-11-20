import type { RuntimeConfig } from './store';

declare global {
  interface Window {
    /** Set by public/js/config.js before the app loads. */
    NEXDRIVE_CONFIG?: RuntimeConfig;
  }
}
