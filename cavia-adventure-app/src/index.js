/**
 * Main entry point for Cavia Adventure Game
 * @module index
 */

import './styles/main.css';
import Logger from './services/Logger';
import ErrorBoundary from './utils/ErrorBoundary';
import { App } from './App';

// Initialize error handling first
ErrorBoundary.setupGlobalHandlers();

// Log application start
Logger.info('Cavia Adventure Game starting...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/**
 * Initialize the application
 */
async function initializeApp() {
  try {
    // Create and start the app
    const app = new App();
    await app.initialize();
    
    // Make app instance available globally for debugging (development only)
    if (process.env.NODE_ENV !== 'production') {
      window.__CAVIA_APP__ = app;
      Logger.debug('App instance available at window.__CAVIA_APP__');
    }
    
    Logger.info('Cavia Adventure Game initialized successfully');
  } catch (error) {
    Logger.error('Failed to initialize application', error);
    showFatalError();
  }
}

/**
 * Show fatal error screen
 */
function showFatalError() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.innerHTML = `
      <div class="error-content">
        <h2>😔 Er is iets misgegaan</h2>
        <p>Het spel kon niet worden geladen.</p>
        <button onclick="location.reload()">Probeer opnieuw</button>
      </div>
    `;
  }
}