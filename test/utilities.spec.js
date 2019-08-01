process.env.NODE_ENV = 'test';
const chai = require('chai');
const Utilities = require('../src/utilities');

describe('Utilities', () => {

    beforeEach(() => {

    });

    afterEach(() => {

    });

    //Test getCurrentDateTime method
    describe('getCurrentDateTime', () => {

        test('should return a valid datetime string', () => {

            let datetime = Utilities.getCurrentDateTime();

            expect(isNaN(Date.parse(datetime))).toBeFalsy();

        });

        test('should return a date equal to or less than now', () => {

            let datetime = Utilities.getCurrentDateTime();

            let currentDate = new Date().getTime();

            expect(new Date(datetime).getTime()).toBeLessThanOrEqual(currentDate);

        });

    });

    //Test getServerName method
    describe('getServerName', () => {

        test('should return a string', () => {

            let server = Utilities.getServerName();

            expect(server).toBeDefined();

            expect(server.length).toBeGreaterThan(1);

        });

    });

    //Test getProcessID method
    describe('getProcessID', () => {

        test('should return a number', () => {

            let PID = Utilities.getProcessID();

            expect(isNaN(PID)).toBeFalsy();

        });

    });

    //Test getFileSize method
    describe('getFileSize', () => {

        test('should return a number', () => {

            let fileSize = Utilities.getFileSize(__filename);

            expect(isNaN(fileSize)).toBeFalsy();

        });

        test('should return a number greater than 0 on a valid file', () => {

            let fileSize = Utilities.getFileSize(__filename);

            expect(fileSize).toBeGreaterThan(0);

        });

        test('should return a number equal to 0 on an invalid/non-existent file', () => {

            let file = "";

            let fileSize = Utilities.getFileSize(file);

            expect(fileSize).toBe(0);

        });

    });

});