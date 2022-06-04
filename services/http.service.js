const https = require('node:https');
const http = require('node:http');
const url = require('node:url');
const nameFunction = (name, fn) => Object.defineProperty(fn, 'name', { value: name })

module.exports = nameFunction(method, async function (webUrl, config = {}) {
    return new Promise((resolve, reject) => {
        let urlObj = new url.URL(webUrl);
        const req = [urlObj.protocol.replace(":", "")].request({ ...urlObj, method }, res => {
            res.on('data', d => {
                resolve(d);
            });
        })
        req.on('error', error => {
            reject(error);
        });
    });
});