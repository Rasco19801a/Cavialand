/**
 * Error boundary utility for catching and handling errors
 * @module utils/ErrorBoundary
 */

import Logger from '../services/Logger';
import EventBus, { EVENTS } from '../services/EventBus';

class ErrorBoundary {
  constructor() {
    this.setupGlobalHandlers();
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
        type: 'uncaught',
      });
      event.preventDefault();
    });

    // Handle promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        message: event.reason?.message || event.reason,
        error: event.reason,
        type: 'unhandled_promise',
      });
      event.preventDefault();
    });
  }

  /**
   * Handle an error
   * @param {Object} errorInfo - Error information
   */
  handleError(errorInfo) {
    // Log the error
    Logger.error(errorInfo.message, errorInfo);

    // Emit error event
    EventBus.emit(EVENTS.ERROR_OCCURRED, errorInfo);

    // Show user-friendly message in development
    if (process.env.NODE_ENV !== 'production') {
      this.showErrorNotification(errorInfo);
    }
  }

  /**
   * Show error notification
   * @param {Object} errorInfo - Error information
   */
  showErrorNotification(errorInfo) {
    EventBus.emit(EVENTS.UI_SHOW_MESSAGE, {
      type: 'error',
      message: 'An error occurred. Please check the console for details.',
      duration: 5000,
    });
  }

  /**
   * Wrap a function with error handling
   * @param {Function} fn - Function to wrap
   * @param {string} context - Context for error logging
   * @returns {Function} Wrapped function
   */
  static wrap(fn, context = 'Unknown') {
    return function wrappedFunction(...args) {
      try {
        const result = fn.apply(this, args);
        
        // Handle async functions
        if (result instanceof Promise) {
          return result.catch((error) => {
            Logger.error(`Error in ${context}:`, error);
            throw error;
          });
        }
        
        return result;
      } catch (error) {
        Logger.error(`Error in ${context}:`, error);
        throw error;
      }
    };
  }

  /**
   * Try-catch wrapper with logging
   * @param {Function} fn - Function to execute
   * @param {*} defaultValue - Default value on error
   * @param {string} context - Context for error logging
   * @returns {*} Function result or default value
   */
  static tryExecute(fn, defaultValue = null, context = 'Unknown') {
    try {
      return fn();
    } catch (error) {
      Logger.error(`Error in ${context}:`, error);
      return defaultValue;
    }
  }
}

// Export singleton instance
export default new ErrorBoundary();