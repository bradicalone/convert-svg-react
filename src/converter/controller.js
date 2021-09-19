const ConvertSvg = require('./svgconverter');
const server = require('./server');

/**
 * Will open port 8000 to copy transformed svg to a usable React component
 * For CommonJS
 * @param {string} path - path to svg file or file itself
 * @returns {Promise}
 */
async function read_File_CommonJS(path) {
    const fs = require('fs').promises
    let svg = await fs.readFile(path, 'utf8')
    let REACTsvg = new ConvertSvg(svg).findAndReplace()
    server( REACTsvg.forCopy)

    // Retruns transformed svg also for terminal copying for testing.
    return REACTsvg
}

/**
 * Will open port 8000 to copy transformed svg to a usable React component
 * For CommonJS
 * @param {string} string - path to svg file or file itself
 * @returns {String}
 */
function from_string_CommonJS(string) {
    let REACTsvg = new ConvertSvg(string).findAndReplace()
    server( REACTsvg.forCopy)

    // Retruns transformed svg also for terminal copying for testing.
    return REACTsvg
}

/**
 * For browsers
 * @param {string} string - string
 * @returns {Object[]}
 */

function from_string_ES2016(string) {
    const { StringToJSX }  = require('../components/StringToJSX')

    let REACTsvg = new ConvertSvg(string).findAndReplace()
    return StringToJSX( REACTsvg, 'fromString' )
}

 /**
 * For browsers only
 * @param {string} path - path to svg file or file itself
 * @returns {Promise<Array>}
 */

async function read_File_ES2016(path) {
    const { StringToJSX }  = require('../components/StringToJSX')

    // Will make VueJS svg resuable component from here
    try{
        let res = await fetch(path)
        let svg = await res.text()

        let REACTsvg = new ConvertSvg(svg).findAndReplace()
        return StringToJSX( REACTsvg, 'fromFile' )

    }catch(e) {
        return e
    }  
}

module.exports = {read_File_ES2016, from_string_ES2016, read_File_CommonJS, from_string_CommonJS}