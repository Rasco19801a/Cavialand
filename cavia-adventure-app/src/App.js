/**
 * Main application controller
 * @module App
 */

import Logger from './services/Logger';
import EventBus, { EVENTS } from './services/EventBus';
import { GameEngine } from './game/GameEngine';
import { CustomizationScreen } from './components/CustomizationScreen';
import { UIManager } from './components/UIManager';
import { AssetLoader } from './services/AssetLoader';
import { GAME_CONFIG } from './config/constants';

export class App {
  constructor() {
    this.gameEngine = null;
    this.uiManager = null;
    this.customizationScreen = null;
    this.assetLoader = new AssetLoader();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      Logger.info('Initializing application...');
      
      // Load assets
      await this.loadAssets();
      
      // Initialize UI Manager
      this.uiManager = new UIManager();
      await this.uiManager.initialize();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Show customization screen
      await this.showCustomizationScreen();
      
      this.isInitialized = true;
    } catch (error) {
      Logger.error('Failed to initialize app', error);
      throw error;
    }
  }

  /**
   * Load game assets
   */
  async loadAssets() {
    try {
      Logger.info('Loading game assets...');
      
      // Define assets to load
      const assets = [
        // Add asset definitions here
        // { type: 'image', name: 'cavia', src: '/assets/images/cavia.png' },
      ];
      
      await this.assetLoader.loadAll(assets);
      Logger.info('Assets loaded successfully');
    } catch (error) {
      Logger.error('Failed to load assets', error);
      throw error;
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for game events
    EventBus.on(EVENTS.GAME_START, () => this.startGame());
    EventBus.on(EVENTS.GAME_OVER, () => this.handleGameOver());
    EventBus.on(EVENTS.ERROR_OCCURRED, (error) => this.handleError(error));
    
    // Performance monitoring
    EventBus.on(EVENTS.PERFORMANCE_WARNING, (data) => {
      Logger.warn('Performance warning', data);
    });
  }

  /**
   * Show customization screen
   */
  async showCustomizationScreen() {
    return new Promise((resolve) => {
      this.customizationScreen = new CustomizationScreen({
        onComplete: (caviaColors) => {
          this.initializeGame(caviaColors);
          resolve();
        },
      });
      
      this.customizationScreen.show();
    });
  }

  /**
   * Initialize the game engine
   */
  async initializeGame(caviaColors) {
    try {
      Logger.info('Initializing game engine...');
      
      // Hide loading screen
      this.hideLoadingScreen();
      
      // Create game engine
      this.gameEngine = new GameEngine({
        canvas: document.getElementById('gameCanvas'),
        caviaColors,
        config: GAME_CONFIG,
      });
      
      // Initialize and start game
      await this.gameEngine.initialize();
      await this.gameEngine.start();
      
      // Show game container
      document.getElementById('gameContainer').classList.remove('hidden');
      
      Logger.info('Game engine initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize game engine', error);
      throw error;
    }
  }

  /**
   * Start the game
   */
  startGame() {
    if (!this.gameEngine) {
      Logger.error('Game engine not initialized');
      return;
    }
    
    this.gameEngine.start();
  }

  /**
   * Handle game over
   */
  handleGameOver() {
    Logger.info('Game over');
    // Implement game over logic
  }

  /**
   * Handle errors
   */
  handleError(error) {
    Logger.error('Application error', error);
    
    // Show user-friendly error message
    this.uiManager?.showMessage({
      type: 'error',
      text: 'Er is een fout opgetreden. Probeer het opnieuw.',
      duration: 5000,
    });
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    Logger.info('Destroying application...');
    
    // Cleanup event listeners
    EventBus.clear();
    
    // Destroy components
    this.gameEngine?.destroy();
    this.uiManager?.destroy();
    this.customizationScreen?.destroy();
    
    this.isInitialized = false;
  }
}