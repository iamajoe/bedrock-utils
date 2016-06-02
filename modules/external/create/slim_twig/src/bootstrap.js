// -----------------------------------------
// IMPORTS

var is = require('bedrock/is');
var outdatedBrowser = require('bedrock/outdatedbrowser');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Initialize function
 */
var init = function () {
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    if (is.isIe()) {
        classList.add('is-ie');
    }

    if (is.isMobile()) {
        classList.add('is-mobile');
    }

    // Set outdated browser
    outdatedBrowser({
        lowerThan: '<% if (minie === "edge") { %>edge<% } else { %>IE<%= minie %><% } %>',
        languagePath: ''
    });
};

// -----------------------------------------
// RUNTIME

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', init);
