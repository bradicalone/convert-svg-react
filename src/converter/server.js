// @ts-nocheck
const http = require('http');

/**
 * For use with NodeJS only
 * Displays new converted svg to a usable svg react components.
 * @param {string|object} svg 
 */
const openFile = (svg) => {
    const text = { "Content-Type": "text/plain; charset=utf-8" }
    const html = { "Content-Type": "text/html" }
    let error = svg.error
    let content_type;
    let content; 

    if (error) {
        content_type = html
        content = svg.error
    } else {
        content_type = text
        content = svg
    }

    const requestListener = function (req, res) {
        res.writeHead(200, content_type);
        res.end(content);
    }

    const server = http.createServer(requestListener);
    server.listen(8000);
    console.log('Open browswer http://localhost:8000/')
}

module.exports = openFile

