/**
 * Tests for Logger service
 */

import Logger from '../../src/services/Logger';

describe('Logger Service', () => {
  beforeEach(() => {
    // Clear logs before each test
    Logger.clearLogs();
    
    // Reset console mocks
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Logging Methods', () => {
    test('should log debug messages', () => {
      Logger.debug('Test debug message', { data: 'test' });
      
      const logs = Logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('debug');
      expect(logs[0].message).toBe('Test debug message');
      expect(logs[0].data).toEqual({ data: 'test' });
    });

    test('should log info messages', () => {
      Logger.info('Test info message');
      
      const logs = Logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('info');
      expect(logs[0].message).toBe('Test info message');
    });

    test('should log warn messages', () => {
      Logger.warn('Test warning');
      
      const logs = Logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('warn');
      expect(logs[0].message).toBe('Test warning');
    });

    test('should log error messages', () => {
      const error = new Error('Test error');
      Logger.error('Test error message', error);
      
      const logs = Logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('error');
      expect(logs[0].message).toBe('Test error message');
      expect(logs[0].data).toBe(error);
    });
  });

  describe('Log Management', () => {
    test('should maintain maximum log count', () => {
      const maxLogs = 1000;
      
      // Add more than max logs
      for (let i = 0; i < maxLogs + 100; i++) {
        Logger.debug(`Log ${i}`);
      }
      
      const logs = Logger.getLogs();
      expect(logs).toHaveLength(maxLogs);
      expect(logs[0].message).toBe('Log 100'); // First 100 should be removed
    });

    test('should clear all logs', () => {
      Logger.debug('Test 1');
      Logger.info('Test 2');
      Logger.warn('Test 3');
      
      expect(Logger.getLogs()).toHaveLength(3);
      
      Logger.clearLogs();
      expect(Logger.getLogs()).toHaveLength(0);
    });

    test('should export logs as JSON', () => {
      Logger.debug('Test message');
      
      const exported = Logger.exportLogs();
      const parsed = JSON.parse(exported);
      
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].message).toBe('Test message');
    });
  });

  describe('Log Level Filtering', () => {
    test('should respect log level settings', () => {
      Logger.setLogLevel('warn');
      
      Logger.debug('Debug message');
      Logger.info('Info message');
      Logger.warn('Warn message');
      Logger.error('Error message');
      
      // All messages should be stored
      expect(Logger.getLogs()).toHaveLength(4);
      
      // But only warn and error should be logged to console
      expect(console.log).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });
  });
});