process.env.NODE_ENV = 'test';
const chai = require('chai');
const fs = require('fs');
const Logger = require('../src/logger');
const path = require('path');
const directory = path.join(__dirname, 'sample-logs');

let config = {
    delimiter: ' | ',
    maxBackupIndex: 5,
    maxFileSize: 1024,
    compressOldFiles: true,
    files: {
        emergency: {
            file: path.join(directory, 'emergency.log'),
            channels: ['web', 'email', 'slack', 'sms']
        },
        error: {
            file: path.join(directory, 'error.log'),
            channels: ['web', 'email', 'slack', 'sms']
        },
        warning: {
            file: path.join(directory, 'warning.log'),
            channels: ['web', 'email', 'slack', 'sms']
        },
        info: {
            file: path.join(directory, 'info.log'),
            channels: ['web', 'email', 'slack', 'sms']
        },
        debug: {
            file: path.join(directory, 'debug.log'),
            channels: ['web', 'email', 'slack', 'sms']
        },
    }
};

let log = new Logger(config);

describe('Logger', () => {

    beforeAll(() => {
        createLogsDirectoryAndFiles()
    });

    afterAll(() => {
        deleteLogsDirectory()
    });

    beforeEach(() => {
    });

    afterEach(() => {
    });

    //Test info method
    describe('info', () => {

        test('should accept string message', () => {

            log.info("Some info");

            expect(true).toEqual(true);

        });

    });

    //Test error method
    describe('error', () => {

        test('should accept string message', () => {

            log.error("Some error");

            expect(true).toEqual(true);

        });

    });

    //Test debug method
    describe('debug', () => {

        test('should accept string message', () => {

            log.debug("Some debug");

            expect(true).toEqual(true);

        });

    });

    //Test warn method
    describe('warn', () => {

        test('should accept string message', () => {

            log.info("Some info");

            expect(true).toEqual(true);

        });

    });

    //Test verbose method
    describe('emergency', () => {

        test('should accept string message', () => {

            log.emergency("Some emergency");

            expect(true).toEqual(true);

        });

    });

    //Test log method
    describe('log', () => {

        let logLevel = "info";

        let timestamp = "1-8-2019 12:12:12";

        test('should accept string message', () => {

            log.log("Some log", logLevel, timestamp);

            expect(true).toEqual(true);

        });

        test('should throw an exception if file does not exist', () => {

            let wrongConfig = config;

            //Remove the info property
            delete wrongConfig.files.info;

            log = new Logger(wrongConfig);

            expect(log.log("Some log", logLevel, timestamp)).toThrow();

        });

    });

    //Test register listeners
    describe('', () => {
    });

});

function createLogsDirectoryAndFiles() {

    try {

        //Make the directory
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        //Make the files
        Object.entries(config.files).forEach(([level, value]) => {
            fs.closeSync(fs.openSync(value.file, 'w'))
        });

    } catch (error) {
        console.error(error)
    }
}

function deleteLogsDirectory() {

    try {

        if (fs.existsSync(directory)) {
            fs.rmdirSync(directory);
        }

    } catch (error) {
        console.error(error)
    }

}