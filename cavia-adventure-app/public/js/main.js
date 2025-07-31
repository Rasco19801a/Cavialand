// Main entry point for the Cavia Adventure game
import Game from './game/Game.js';
import WorldManager from './game/WorldManager.js';
import UIManager from './game/UIManager.js';
import { errorHandler } from './utils/ErrorHandler.js';
import { createElement } from './utils/DOMHelpers.js';

// Show loading screen
function showLoadingScreen() {
    const loadingOverlay = createElement('div', { className: 'loading-overlay' }, [
        createElement('div', { className: 'loading-content' }, [
            createElement('div', { className: 'loading-spinner' }),
            createElement('div', { className: 'loading-text' }, ['Cavia Avonturen wordt geladen...']),
            createElement('div', { className: 'loading-subtext' }, ['Even geduld alsjeblieft 🐹'])
        ])
    ]);
    document.body.appendChild(loadingOverlay);
    return loadingOverlay;
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = showLoadingScreen();
    
    try {
        // Create game instance
        const game = new Game();
        
        // Start the game
        await game.start();
        
        // Remove loading screen
        loadingScreen.remove();
        
        // Make game instance available globally for debugging
        window.game = game;
    } catch (error) {
        errorHandler.logError(error, 'Game initialization failed');
        loadingScreen.remove();
    }
});