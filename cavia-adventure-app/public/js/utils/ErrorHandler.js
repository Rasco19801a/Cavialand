import { createElement } from './DOMHelpers.js';

export default class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxErrors = 50;
        this.setupGlobalHandlers();
    }

    setupGlobalHandlers() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError({
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error,
                type: 'uncaught'
            });
            event.preventDefault();
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                message: event.reason?.message || event.reason,
                error: event.reason,
                type: 'unhandled_promise'
            });
            event.preventDefault();
        });
    }

    handleError(errorInfo) {
        // Log to console in development
        if (process.env.NODE_ENV !== 'production') {
            console.error('Error caught:', errorInfo);
        }

        // Add to error log
        this.errorLog.push({
            ...errorInfo,
            timestamp: new Date().toISOString()
        });

        // Keep log size manageable
        if (this.errorLog.length > this.maxErrors) {
            this.errorLog.shift();
        }

        // Show user-friendly message
        this.showErrorMessage(errorInfo);
    }

    showErrorMessage(errorInfo) {
        // Don't show multiple error messages at once
        if (document.querySelector('.error-notification')) {
            return;
        }

        const notification = createElement('div', { className: 'error-notification' }, [
            createElement('div', { className: 'error-content' }, [
                createElement('span', { className: 'error-icon' }, ['⚠️']),
                createElement('span', { className: 'error-text' }, ['Er is iets misgegaan. Probeer de pagina te verversen.']),
                createElement('button', { 
                    className: 'error-close',
                    onClick: function() { this.parentElement.parentElement.remove(); }
                }, ['✕'])
            ])
        ]);

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    logError(error, context = '') {
        this.handleError({
            message: error.message || error,
            error: error,
            context: context,
            type: 'logged'
        });
    }

    getErrorLog() {
        return [...this.errorLog];
    }

    clearErrorLog() {
        this.errorLog = [];
    }
}

// Create singleton instance
export const errorHandler = new ErrorHandler();