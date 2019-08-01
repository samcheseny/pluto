const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {

    /**
     * Contains initialization configuration
     */
    constructor() {
        super();
    }

    /**
     * Logs informational messages
     *
     * @param message
     */
    info(message) {

    }

    /**
     * Logs error messages
     *
     * @param message
     */
    error(message) {

    }

    /**
     * Logs debug messages
     *
     * @param message
     */
    debug(message) {

    }

    /**
     * Logs warning messages
     *
     * @param message
     */
    warn(message) {

    }

    /**
     * Logs verbose messages
     *
     * @param message
     */
    verbose(message) {

    }

    /**
     * Logs emergency messages
     *
     * @param message
     */
    emergency(message) {

    }

    /**
     * Logs messages
     *
     * @param message
     * @param logLevel
     * @param timestamp
     */
    log(message, logLevel, timestamp) {

    }

}

module.exports = Logger;