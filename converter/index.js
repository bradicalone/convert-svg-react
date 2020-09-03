const ConvertSvg = require('./svgconverter.js')

/**
 * 
 * @file index.js is the root file for this package
 */

/**
 * 
 * @param {String} path Stringed path to clients svg file
 */

module.exports = (path) => {
    return new ConvertSvg(path)
}
