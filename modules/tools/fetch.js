'use strict';

// -----------------------------------------
// IMPORTS

var validate = require('./validate.js');
var Joi = require('joi');

// -----------------------------------------
// VARS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Clones a url
 * @param  {string} url
 * @param  {string} path
 */
function cloneURL(url, path) {
    validate.type(
        { url: url, path: path },
        { url: Joi.string(), path: Joi.string() }
    );

	// TODO: Clone url
}

/**
 * Clones a git
 * @param  {string} git
 * @param  {string} path
 */
function cloneGit(git, path) {
    validate.type(
        { git: git, path: path },
        { git: Joi.string(), path: Joi.string() }
    );

	// TODO: Clone git
}

// -----------------------------------------
// EXPORTS

module.exports = {
    cloneURL: cloneURL,
    cloneGit: cloneGit
};
