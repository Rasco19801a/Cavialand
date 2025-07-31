// Main entry point for the Cavia Adventure game
import Game from './game/Game.js';
import WorldManager from './game/WorldManager.js';
import UIManager from './game/UIManager.js';

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game instance
    const game = new Game();
    
    // Start the game
    game.start();
    
    // Make game instance available globally for debugging
    window.game = game;
});