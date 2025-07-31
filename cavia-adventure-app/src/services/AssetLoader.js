/**
 * Asset loader service for managing game resources
 * @module services/AssetLoader
 */

import Logger from './Logger';
import EventBus, { EVENTS } from './EventBus';

export class AssetLoader {
  constructor() {
    this.assets = new Map();
    this.loadingProgress = 0;
  }

  /**
   * Load a single asset
   * @param {Object} assetConfig - Asset configuration
   * @returns {Promise} Promise that resolves when asset is loaded
   */
  async loadAsset(assetConfig) {
    const { type, name, src } = assetConfig;
    
    try {
      let asset;
      
      switch (type) {
        case 'image':
          asset = await this.loadImage(src);
          break;
        case 'audio':
          asset = await this.loadAudio(src);
          break;
        case 'json':
          asset = await this.loadJSON(src);
          break;
        default:
          throw new Error(`Unknown asset type: ${type}`);
      }
      
      this.assets.set(name, asset);
      Logger.debug(`Loaded asset: ${name}`);
      
      return asset;
    } catch (error) {
      Logger.error(`Failed to load asset: ${name}`, error);
      throw error;
    }
  }

  /**
   * Load multiple assets
   * @param {Array} assetConfigs - Array of asset configurations
   * @returns {Promise} Promise that resolves when all assets are loaded
   */
  async loadAll(assetConfigs) {
    const total = assetConfigs.length;
    let loaded = 0;
    
    const promises = assetConfigs.map(async (config) => {
      const asset = await this.loadAsset(config);
      loaded++;
      this.loadingProgress = (loaded / total) * 100;
      
      EventBus.emit(EVENTS.ASSET_LOADED, {
        name: config.name,
        progress: this.loadingProgress,
      });
      
      return asset;
    });
    
    try {
      await Promise.all(promises);
      Logger.info(`All assets loaded (${total} items)`);
    } catch (error) {
      Logger.error('Failed to load all assets', error);
      throw error;
    }
  }

  /**
   * Load an image
   * @private
   */
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      
      img.src = src;
    });
  }

  /**
   * Load audio
   * @private
   */
  loadAudio(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      
      audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
      audio.addEventListener('error', () => reject(new Error(`Failed to load audio: ${src}`)), { once: true });
      
      audio.src = src;
      audio.load();
    });
  }

  /**
   * Load JSON data
   * @private
   */
  async loadJSON(src) {
    try {
      const response = await fetch(src);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to load JSON: ${src} - ${error.message}`);
    }
  }

  /**
   * Get a loaded asset
   * @param {string} name - Asset name
   * @returns {*} The loaded asset
   */
  get(name) {
    if (!this.assets.has(name)) {
      Logger.warn(`Asset not found: ${name}`);
      return null;
    }
    
    return this.assets.get(name);
  }

  /**
   * Check if an asset is loaded
   * @param {string} name - Asset name
   * @returns {boolean} True if asset is loaded
   */
  has(name) {
    return this.assets.has(name);
  }

  /**
   * Get loading progress
   * @returns {number} Loading progress (0-100)
   */
  getProgress() {
    return this.loadingProgress;
  }

  /**
   * Clear all loaded assets
   */
  clear() {
    this.assets.clear();
    this.loadingProgress = 0;
    Logger.debug('All assets cleared');
  }

  /**
   * Get all loaded assets
   * @returns {Map} Map of all loaded assets
   */
  getAll() {
    return new Map(this.assets);
  }
}