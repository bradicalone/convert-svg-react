
exports.stylePattern = /<style([\s\S]*)<\/style>/i
exports.isColan = /(.*\sstyle=".*)(:)(.*\/>)/gi
exports.isSemiColan = /;(?!\})/gi
exports.isStyle = /style="/gi
exports.isColorPattern = /stop-color/gi
exports.isStopOpacity = /stop-opacity/gi
exports.isClassPattern = /class=/g
exports.isxmlPattern = /xmlns:xlink|xml:space|xlink:href/gi
exports.cssObjects = /(\..*;})/gi
exports.isTitle = /<title>.+<\/title>/gi
exports.enabledBackground = /style="enable-background.+"\s/
exports.isVersion = /version.*?\s/
exports.isXML = /<\?xml.+>/
exports.isAdobeComment = /<!-- Generator: Adobe.+-->/