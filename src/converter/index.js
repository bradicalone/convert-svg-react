const {read_File_ES2016, from_string_ES2016, read_File_CommonJS,  from_string_CommonJS} = require('./controller');

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
    const file = typeof path === 'string' ? path : path.string

    if (process.browser) {
        let isImgPath = file.match(/data:image\/svg\+xml/g)

        if(isImgPath) {
            // Client supplies svg img file
            return read_File_ES2016(file)
        } else {
            // Client supplies stringed svg
            return from_string_ES2016(file)
        }
    } else {
        let isSVGstring = file.match(/<\/svg>/g)

        // If path is svg string returns true
        if(isSVGstring) {
            return from_string_CommonJS(file)
        }
        return read_File_CommonJS(file)
    }
}

