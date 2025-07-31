/**
 * Logger service for centralized logging
 * @module services/Logger
 */

class Logger {
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug';
    this.logs = [];
    this.maxLogs = 1000;
  }

  /**
   * Log levels
   */
  static LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };

  /**
   * Set the current log level
   * @param {string} level - The log level to set
   */
  setLogLevel(level) {
    this.logLevel = level;
  }

  /**
   * Internal logging method
   * @private
   */
  _log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
    };

    // Store log
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output based on environment
    if (this._shouldLog(level)) {
      const consoleMethod = this._getConsoleMethod(level);
      const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      
      if (data) {
        console[consoleMethod](formattedMessage, data);
      } else {
        console[consoleMethod](formattedMessage);
      }
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      this._sendToExternalService(logEntry);
    }
  }

  /**
   * Check if should log based on current level
   * @private
   */
  _shouldLog(level) {
    const levels = Logger.LEVELS;
    const currentLevel = levels[this.logLevel.toUpperCase()] || levels.DEBUG;
    const messageLevel = levels[level.toUpperCase()] || levels.DEBUG;
    return messageLevel >= currentLevel;
  }

  /**
   * Get appropriate console method
   * @private
   */
  _getConsoleMethod(level) {
    const methods = {
      debug: 'log',
      info: 'info',
      warn: 'warn',
      error: 'error',
    };
    return methods[level] || 'log';
  }

  /**
   * Send logs to external service
   * @private
   */
  _sendToExternalService(logEntry) {
    // TODO: Implement external logging service integration
    // Example: Sentry, LogRocket, etc.
  }

  /**
   * Public logging methods
   */
  debug(message, data) {
    this._log('debug', message, data);
  }

  info(message, data) {
    this._log('info', message, data);
  }

  warn(message, data) {
    this._log('warn', message, data);
  }

  error(message, data) {
    this._log('error', message, data);
  }

  /**
   * Get all stored logs
   * @returns {Array} Array of log entries
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Clear all stored logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   * @returns {string} JSON string of logs
   */
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export default new Logger();