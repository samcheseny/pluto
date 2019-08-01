const os = require('os');
const fs = require('fs');

class Utilities {

    /**
     * Gets the current datetime in dd-mm-yyyy h:m:s format
     * @returns {string}
     */
    static getCurrentDateTime() {

        let date = new Date();

        let dd = date.getDate(),
            mm = date.getMonth() + 1,
            yyyy = date.getFullYear(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        return `${dd}-${mm}-${yyyy} ${h}:${m}:${s}`;
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

    static getFileSize(filename) {

        try {

            let stat = fs.statSync(filename);

            return stat.size;

        } catch (error) {

            console.log(error);

            return 0;
        }


    }
}

module.exports = Utilities;