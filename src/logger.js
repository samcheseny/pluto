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
     * Logs messages
     *
     * @param message
     */
    log(message) {

    }

}

module.exports = Logger;