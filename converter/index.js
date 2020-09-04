const ConvertSvg = require('./svgconverter');

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


// (function(exports){
// console.log('exports:', exports)


//     exports.convert = (path) => {
//         return new ConvertSvg(path)
//     }
// //    exports.test = function(){

// //         return './svgconverter.js'
// //     };

// })(typeof exports === 'undefined'? this['ConvertSvg']={}: exports);

