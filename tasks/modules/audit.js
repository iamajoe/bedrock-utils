/* eslint-disable strict */
'use strict';
/* eslint-enable strict */
/* global Promise */

// Import packages
var fs = require('fs');
var path = require('path');
var Joi = require('joi');
var mkdirp = require('mkdirp');
var logger = require('../utils/logger.js');
var scraper = require('../utils/scraper.js');
var modules = {
    w3: require('./audit/w3.js'),
    SEO: require('./audit/seo.js'),
    lighthouse: require('./audit/lighthouse.js'),
    stylelint: require('./audit/stylelint.js'),
    eslint: require('./audit/eslint.js')
};

var OPTIONS_STRUCT = Joi.object().keys({
    base: Joi.string(),
    baseEnv: Joi.string(),
    defaults: Joi.array().items(Joi.string()).default(['w3', 'SEO']),
    custom: Joi.array().items(Joi.string()).default([])
}).default({
    defaults: ['w3', 'SEO'],
    custom: []
});

var STRUCT = Joi.object().keys({
    src: Joi.array().items(Joi.string()).required(),
    dest: Joi.string().required(),
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
    options: OPTIONS_STRUCT
});

//-------------------------------------
// Functions

/**
 * Gets path
 * @param  {string} src
 * @return {string}
 */
function getPath(src) {
    var newSrc = src;

    if (src && typeof src === 'string') {
        newSrc = (src[0] !== '/') ? path.join(process.env.PWD, src) : src;
    } else if (src && typeof src === 'object' && src.hasOwnProperty('length')) {
        newSrc = src.map(function (val) { return getPath(val); });
    }

    return newSrc;
}

/**
 * Set audits promises
 *
 * @param {array} rules
 */
function setAudits(single) {
    // Finally set promise for the results
    var promise = Promise.all(single.rules.map(function (rule) {
        var rulePromise = new Promise(function (resolve) {
            // Set the rule promise now
            rule.fn()
            .then(function (result) {
                resolve({ ok: true, name: rule.name, result: result });
            })
            .catch(function (err) {
                resolve({ ok: false, name: rule.name, err: err });
            });
        });

        return rulePromise;
    }))
    .then(function (data) {
        var hasError = false;
        var i;

        // Find if there was any error
        for (i = 0; i < data.length; i += 1) {
            if (data[i].ok === false) {
                hasError = true;
                break;
            }
        }

        return { ok: !hasError, name: single.name, rules: data };
    });

    return promise;
}

/**
 * Gets scraps promises
 *
 * @param {array} scraps
 * @param {array} auditList
 * @returns
 */
function setScrapPromises(scraps, auditList) {
    // Set promises per scrap
    var scrapsPromises = scraps.map(function (scrap) {
        // Set promises per single in audit list
        var listPromises = auditList.map(function (single) {
            // Finally set promise for the results
            return setAudits(single(scrap));
        });

        // Lets take care of audits
        return Promise.all(listPromises)
        .then(function (data) {
            return { src: scrap.src[0], reqSrc: scrap.reqSrc, audits: data };
        });
    });

    return Promise.all(scrapsPromises);
}

/**
 * Scrapes
 *
 * @param  {object} task
 * @param  {function} cb
 */
function compile(task, cb) {
    // Scrap urls
    return scraper.compile(task).then(function (scraps) {
        var custom = task.options.custom.map(function (val) {
            return require(getPath(val));
        });
        var defaults = task.options.defaults.map(function (val) {
            return modules[val];
        });
        var auditList = defaults.concat(custom).filter(function (val) {
            return !!val;
        });

        // Now take care of audits
        return setScrapPromises(scraps, auditList);
    })
    .then(function (report) {
        mkdirp.sync(path.dirname(task.dest));
        fs.writeFileSync(task.dest, JSON.stringify(report, null, 4));

        cb(null, report);
    })
    .catch(function (err) {
        cb(err);
        logger.err('Audit', err);
    });
}

// --------------------------------
// Export

module.exports = { STRUCT: STRUCT, compile: compile };
