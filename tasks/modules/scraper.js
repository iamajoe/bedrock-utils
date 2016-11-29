/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var Joi = require('joi');
var scraper = require('../utils/scraper.js');

var OPTIONS_STRUCT = Joi.object().keys({
    base: Joi.string(),
    baseEnv: Joi.string()
}).default({});

var STRUCT = Joi.object().keys({
    src: Joi.array().items(Joi.string()).required(),
    dest: Joi.string(),
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
    options: OPTIONS_STRUCT
});

//-------------------------------------
// Functions

/**
 * Scrapes
 *
 * @param  {object} task
 * @param  {function} cb
 */
function compile(task, cb) {
    // Scrap urls
    scraper.compile(task).then(function (scraps) {
        // TODO: ...
        return scraps;
    })
    // TODO: We need to save the report
    .then(function (report) {
        console.log("REPORT", report);
        cb(null, report);
    })
    .catch(err => cb(err));
}

// --------------------------------
// Export

module.exports = { STRUCT: STRUCT, compile: compile };
