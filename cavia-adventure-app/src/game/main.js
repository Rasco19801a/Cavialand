// Main entry point for the Cavia Adventure game
import Game from './game/Game.js';
import CustomizationScreen from './game/CustomizationScreen.js';
import { errorHandler } from './utils/ErrorHandler.js';
import { createElement } from './utils/DOMHelpers.js';

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Show customization screen first
        const customizationScreen = new CustomizationScreen((selectedColors) => {
            // Start game with selected colors
            startGame(selectedColors);
        });
        
        // Hide the game container initially
        document.querySelector('.game-container').style.display = 'none';
        
    } catch (error) {
        errorHandler.logError(error, 'Initialization failed');
    }
});

async function startGame(caviaColors) {
    const loadingScreen = showLoadingScreen();
    
    try {
        // Show game container
        document.querySelector('.game-container').style.display = 'block';
        
        // Create game instance
        const game = new Game();
        
        // Set player colors
        game.player.colors = caviaColors;
        
        // Start the game
        await game.start();
        
        // Remove loading screen with fade effect
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 300);
        
        // Make game instance available globally for debugging
        window.game = game;
    } catch (error) {
        errorHandler.logError(error, 'Game initialization failed');
        loadingScreen.remove();
    }
}

// Show loading screen
function showLoadingScreen() {
    const loadingOverlay = createElement('div', { 
        className: 'loading-overlay',
        style: { transition: 'opacity 0.3s ease' }
    }, [
        createElement('div', { className: 'loading-content' }, [
            createElement('div', { className: 'loading-spinner' }),
            createElement('div', { className: 'loading-text' }, ['Cavia Avonturen wordt geladen...']),
            createElement('div', { className: 'loading-subtext' }, ['Even geduld alsjeblieft 🐹'])
        ])
    ]);
    document.body.appendChild(loadingOverlay);
    return loadingOverlay;
}