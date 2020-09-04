const {read_File_ES2016, read_File_CommonJS} = require('./controller');

/**
 * 
 * @file index.js is the root file for this package
 */

/**
 * 
 * @param {String} path - Stringed path to clients svg file, or file itself
 * @returns {Promise}
 */
module.exports = (path) => {
    if(process.browser) {
        return read_File_ES2016(path)
    } else {
        return read_File_CommonJS(path)
    }
}

