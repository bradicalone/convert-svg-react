
exports.stylePattern = /<style([\s\S]*)<\/style>/gi
exports.isColan = /(?<=style=".+):/gi
exports.isSemiColan = /;(?!\})/gi
exports.isStyle = /style(=|:)"/gi
exports.isColorPattern = /stop-color/gi
exports.isStopOpacity = /stop-opacity/gi
exports.isClassPattern = /class=/g
exports.isxmlPattern = /xmlns:xlink|xml:space|xlink:href/gi
exports.cssObjects = /(\..*;})/gi
exports.isTitle = /<title>.+<\/title>/gi
exports.enabledBackground = /enable-background/g 
exports.isIDorVersion = /version.*?\s|id=".*?\s/g
