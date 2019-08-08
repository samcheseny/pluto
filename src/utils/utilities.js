const os = require('os');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

class Utilities {

    /**
     * Gets the current datetime in dd-mm-yyyy h:m:s.ms format
     *
     * @returns {string}
     */
    static getCurrentDateTime() {

        let date = new Date();

        let dd = date.getDate(),
            mm = date.getMonth() + 1,
            yyyy = date.getFullYear(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            ms = date.getMilliseconds();

        return `${dd}-${mm}-${yyyy} ${h}:${m}:${s}.${ms}`;
    }

    /**
     * Returns the name of the current server
     */
    static getServerName() {
        return os.hostname()
    }

    /**
     * Gets the current process ID
     *
     * @returns {Number}
     */
    static getProcessID() {
        return process.pid;
    }

    /**
     * Gets the size of a file in MBs
     *
     * @param filename
     * @returns {*}
     */
    static getFileSize(filename) {

        try {

            let stat = fs.statSync(filename);

            return stat.size / 1024 / 1024;

        } catch (error) {

            console.log(error);

            return 0;
        }

    }

    /**
     *
     * @param currentFile
     * @param maxBackupIndex
     * @param compressOldFiles
     */
    static cleanUpOldFiles(currentFile, maxBackupIndex, compressOldFiles) {

        let directory = path.dirname(currentFile);

        let basename = path.basename(currentFile); //e.g : info.log

        //Todo: use async method
        //Sort the files in ascending order
        let filesInAscendingOrder = fs.readdirSync(directory)
            .filter(file => path.extname(file) !== '.zip' && file.includes(basename + '.'))
            .map(file => {
                return {
                    filename: file,
                    time: fs.statSync(path.join(directory, file)).mtimeMs,
                    backupIndex: path.extname(file)
                }
            })
            .sort((a, b) => a.time - b.time);

        //Delete or compress older files
        if (filesInAscendingOrder.length > maxBackupIndex - 1) {

            let toBeDeletedOrCompressed = filesInAscendingOrder.slice(
                0,
                filesInAscendingOrder.length - (maxBackupIndex - 1)
            );

            if (compressOldFiles) {
                this.compressOldFiles(toBeDeletedOrCompressed, directory)
            } else {
                toBeDeletedOrCompressed.forEach(file => {
                    //Todo: wrap in try catch to handle errors
                    fs.unlinkSync(path.join(directory, file.filename))
                })
            }

        }

        // Rename *.log to *.log.latest index
        fs.renameSync(
            path.join(directory, basename),
            path.join(
                directory,
                `${basename}.${parseInt(filesInAscendingOrder[filesInAscendingOrder.length - 1].backupIndex) + 1}`
            )
        );

        // Create new *.log file
        fs.closeSync(fs.openSync(path.join(directory, basename), 'a'));
    }

    /**
     * Checks if an object is empty
     *
     * @param object
     * @returns {boolean}
     */
    static isObjectEmpty(object) {
        return Object.keys(object).length < 1
    }

    /**
     * Fetches the total memory in bytes used by the current process
     *
     * @returns {string}
     */
    static getUsedMemory() {
        return (process.memoryUsage().heapUsed / 1024 / 1024) + "MB";
    }

    /**
     * Compresses files to .zip files
     *
     * @param files
     * @param directory
     */
    static compressOldFiles(files, directory) {

        files.forEach(file => {
            //Todo: wrap in try catch
            fs.createReadStream(path.join(directory, file.filename))
                .pipe(zlib.createGzip())
                .pipe(fs.createWriteStream(path.join(directory, file.filename) + '.zip'))
                .on('finish', () => fs.unlinkSync(path.join(directory, file.filename)))
        })

    }
}

module.exports = Utilities;