/**
 * EventBus for decoupled component communication
 * @module services/EventBus
 */

class EventBus {
  constructor() {
    this.events = new Map();
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   * @returns {Function} Unsubscribe function
   */
  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    this.events.get(event).add(handler);
    
    // Return unsubscribe function
    return () => this.off(event, handler);
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   */
  once(event, handler) {
    const wrappedHandler = (...args) => {
      handler(...args);
      this.off(event, wrappedHandler);
    };
    
    this.on(event, wrappedHandler);
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   */
  off(event, handler) {
    if (!this.events.has(event)) return;
    
    const handlers = this.events.get(event);
    handlers.delete(handler);
    
    if (handlers.size === 0) {
      this.events.delete(event);
    }
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {...any} args - Arguments to pass to handlers
   */
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    
    const handlers = this.events.get(event);
    handlers.forEach((handler) => {
      try {
        handler(...args);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  /**
   * Remove all event listeners
   */
  clear() {
    this.events.clear();
  }

  /**
   * Get all registered events
   * @returns {Array<string>} Array of event names
   */
  getEvents() {
    return Array.from(this.events.keys());
  }

  /**
   * Get handler count for an event
   * @param {string} event - Event name
   * @returns {number} Number of handlers
   */
  getHandlerCount(event) {
    return this.events.has(event) ? this.events.get(event).size : 0;
  }
}

// Export singleton instance
export default new EventBus();

// Export event names as constants
export const EVENTS = {
  // Game events
  GAME_START: 'game:start',
  GAME_PAUSE: 'game:pause',
  GAME_RESUME: 'game:resume',
  GAME_OVER: 'game:over',
  
  // Player events
  PLAYER_MOVE: 'player:move',
  PLAYER_STOP: 'player:stop',
  PLAYER_ENTER_BUILDING: 'player:enter_building',
  PLAYER_EXIT_BUILDING: 'player:exit_building',
  PLAYER_COLOR_CHANGE: 'player:color_change',
  
  // World events
  WORLD_CHANGE: 'world:change',
  WORLD_LOADED: 'world:loaded',
  
  // UI events
  UI_SHOW_MESSAGE: 'ui:show_message',
  UI_HIDE_MESSAGE: 'ui:hide_message',
  UI_UPDATE_STATS: 'ui:update_stats',
  
  // System events
  ERROR_OCCURRED: 'system:error',
  ASSET_LOADED: 'system:asset_loaded',
  PERFORMANCE_WARNING: 'system:performance_warning',
};