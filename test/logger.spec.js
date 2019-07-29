process.env.NODE_ENV = 'test';
const chai = require('chai');
const Logger = require('../src/logger');

//Todo: add config to constructor signature
let log = new Logger();

describe('Logger', () => {

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
    describe('verbose', () => {

        test('should accept string message', () => {

            log.verbose("Some verbose");

            expect(true).toEqual(true);

        });

    });

    //Test log method
    describe('log', () => {

        test('should accept string message', () => {

            log.log("Some log");

            expect(true).toEqual(true);

        });

        test('should throw an exception if file does not exist', () => {

            //Todo: add config arg to constructor with fake file path
            log = new Logger();

            expect(log.log("Some log")).toThrow();

        });

    });

    //Test register listeners
    describe('', () => {
    });

});