const ConvertSvg = require('./svgconverter.js')

module.exports = (path) => {
    return new ConvertSvg(path)
}
