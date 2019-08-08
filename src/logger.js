const EventEmitter = require('events');
const fs = require('fs');
const Utilities = require('./utils/utilities');
const LogLevels = require('./configs/log-levels');
const notificationPackages = require('./configs/notification-packages-map');

class Logger extends EventEmitter {

    /**
     * Contains initialization configuration
     */
    constructor(config) {
        super();

        this.config = {
            delimiter: config.delimiter || ' | ',
            maxBackupIndex: config.maxBackupIndex || 5,
            maxFileSize: config.maxFileSize || 1024,//This is in MBs,
            compressOldFiles: config.compressOldFiles || true,
            files: Logger.validateFiles(config.files)
        }
    }

    /**
     * Logs informational messages
     *
     * @param message
     */
    info(message) {
        this.log(message, 'info', Utilities.getCurrentDateTime());
    }

    /**
     * Logs error messages
     *
     * @param message
     */
    error(message) {
        this.log(message, 'error', Utilities.getCurrentDateTime());
    }

    /**
     * Logs debug messages
     *
     * @param message
     */
    debug(message) {
        this.log(message, 'debug', Utilities.getCurrentDateTime());
    }

    /**
     * Logs warning messages
     *
     * @param message
     */
    warn(message) {
        this.log(message, 'warning', Utilities.getCurrentDateTime());
    }

    /**
     * Logs emergency messages
     *
     * @param message
     */
    emergency(message) {
        this.log(message, 'emergency', Utilities.getCurrentDateTime());
    }

    /**
     * Logs messages
     *
     * @param message
     * @param logLevel
     * @param timestamp
     */
    log(message, logLevel, timestamp) {

        let serverName = Utilities.getServerName();

        let PID = Utilities.getProcessID();

        let usedMemory = Utilities.getUsedMemory();

        let stringToBeLogged = `${logLevel.toUpperCase()}${this.config.delimiter}
                               ${timestamp}${this.config.delimiter}
                               ${serverName}${this.config.delimiter}
                               ${PID}${this.config.delimiter}
                               ${usedMemory}${this.config.delimiter}
                               ${message}`;

        try {

            let filename = this.config.files[logLevel].file;

            //Check the file size
            let fileSize = Utilities.getFileSize(filename);

            //If file is too big
            if (fileSize >= this.config.maxFileSize) {

                Utilities.cleanUpOldFiles(
                    filename,
                    this.config.maxBackupIndex,
                    this.config.compressOldFiles
                )

            }

            //Write the actual log
            //Todo: benchmark the performance of each of the following including a stream option
            fs.appendFile(filename, stringToBeLogged, (error) => {

                if (error) {
                    //todo: fail gracefully and return. Possibly emit a 'failure' event
                }

                let eventData = {
                    timestamp,
                    serverName,
                    PID,
                    usedMemory,
                    message,
                    line:'',//Todo:implement
                    file:'',//Todo:implement
                    function:'',//Todo:implement
                    severity:logLevel,
                    logged: stringToBeLogged
                };

                //Emit the respective event
                this.emit(logLevel, eventData);

                //Send notifications here
                this.config.files[logLevel].channels.forEach(channel => {

                    let notificationModule = notificationPackages[channel];

                    if (notificationModule) {

                        try {

                            let Notification = require(notificationModule);

                            Notification.notify(eventData);

                        } catch (error) {
                            //todo: handle errors
                        }

                    }

                })

            });

        } catch (error) {

        }

    }

    static validateFiles(files) {

        //Check if files is null
        if (!files) {
            throw new Error('No files were provided in the configuration object');
        }

        //Check if 'files' is an object
        if (!(typeof files === 'object')) {
            throw new Error('The "files" property must be an object');
        }

        //todo: verify that file is existent
        //Check if the object is empty
        if (Utilities.isObjectEmpty(files)) {
            throw new Error('The "files" property must be a non empty object');
        }

        let levels = Object.keys(LogLevels);

        //Validate the rest
        Object.entries(files).forEach(([level, options]) => {

            //Check if valid log levels have been provided in 'files'
            if (!(level in levels)) {

                let supportedLogLevels = levels.join(",");

                throw new Error(`${level} is not among the supported log levels: ${supportedLogLevels}`);

            }

            //todo: check if file exists and create if it does not
            //Check if file path has been provided
            if (!options.file || options.file === "") {
                throw new Error(`The 'file' option must be provided for log level ${level}`);
            }

            //Check if channels property holds a non array data structure
            if (options.channels && !Array.isArray(options.channels)) {
                throw new Error(
                    `The 'channels' option should be an array, ${typeof options.channels} given`
                );
            }

        });

        return files;

    }

}

module.exports = Logger;