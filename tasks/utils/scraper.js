/* eslint-disable strict */
'use strict';
/* eslint-enable strict */
/* global Promise */

// Import packages
var jsdom = require('jsdom');

//-------------------------------------
// Functions

/**
 * Check if url is valid
 *
 * @param {string} url
 * @returns
 */
function checkUrl(url) {
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    return pattern.test(url);
}

/**
 * Gets scraps promises
 *
 * @param {array} scraps
 * @param {array} auditList
 * @returns
 */
function setUrlsPromises(task) {
    var baseEnv = task.options.baseEnv && process.env[task.options.baseEnv];
    var base = baseEnv || task.options.base;
    var urlsPromises = task.src.map(function (url, index) {
        var promise = new Promise(function (resolve, reject) {
            // Lets set the bases
            if (base) {
                if (base[base.length - 1] !== '/' && url[0] !== '/') {
                    base += '/';
                } else if (base[base.length - 1] === '/' && url[0] === '/') {
                    base = base.substring(0, base.length - 1);
                }

                url = base + url;
            }

            // Need to check if url is ok
            if (!checkUrl(url)) {
                return reject({
                    reqSrc: url,
                    src: [task.src[index]],
                    err: new Error('Url not valid')
                });
            }

            // Set jsdom...
            jsdom.env(url, ['http://code.jquery.com/jquery.js'], function (reqUrl, i, err, window) {
                if (err) {
                    return reject({
                        reqSrc: reqUrl,
                        src: [task.src[i]],
                        err: err
                    });
                }

                // Cache the window
                resolve({ reqSrc: reqUrl, src: [task.src[i]], window: window });
            }.bind(null, url, index));
        });

        return promise;
    });

    return Promise.all(urlsPromises);
}

/**
 * Scrapes
 *
 * @param  {object} task
 * @param  {function} cb
 */
function compile(task, cb) {
    var promise = setUrlsPromises(task);

    if (!cb) {
        return promise;
    }

    return promise.then(data => cb(null, data)).catch(err => cb(err));
}

// --------------------------------
// Export

module.exports = { compile: compile };
