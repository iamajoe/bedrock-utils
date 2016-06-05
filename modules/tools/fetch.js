'use strict';

// -----------------------------------------
// IMPORTS

var check = require('./check');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// CloneURL clones a url
function cloneURL(url, path) {
    check.validate(
        { url: url, path: path },
        { url: check.Joi.string(), path: check.Joi.string() }
    );

	// TODO: Clone url
}

// CloneGit clones a git
function cloneGit(git, path) {
    check.validate(
        { git: git, path: path },
        { git: check.Joi.string(), path: check.Joi.string() }
    );

	// TODO: Clone git
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    cloneURL: cloneURL,
    cloneGit: cloneGit
};
