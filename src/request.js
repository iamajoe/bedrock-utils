/* eslint-disable strict */'use strict';/* eslint-enable */
/* global Promise */

require('es6-promise').polyfill();

// --------------------------------
// Functions

/**
 * Gets the XML HTTP Request object, trying to load it in various ways
 * @return {object} The XMLHttpRequest object instance
 */
function getXmlRequestObject() {
    var xml = null;

    if (typeof window === 'object' && window && typeof window.XMLHttpRequest !== 'undefined') {
        // First, try the W3-standard object
        xml = new window.XMLHttpRequest();
    }

    return xml;
}

/**
 * Makes a request
 * @param  {string} url
 * @param  {string} method
 * @param  {*} data
 * @return {promise}
 */
function makeReq(url, method, data) {
    // TODO: What about node?
    var xhr = getXmlRequestObject();
    var promise = new Promise(function (resolve, reject) {
        if (!xhr) {
            reject({
                status: 500,
                response: 'XMLHttpRequest doesn\'t exist!'
            });
        }

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: xhr.response
                });
            }
        };
    });

    // Finally the request
    if (xhr) {
        xhr.open(method, url, true);
        xhr.responseType = 'json';
        xhr.send(data);
    }

    return promise;
}

// --------------------------------
// Export

module.exports = {
    get: makeReq
};
