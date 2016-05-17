'use strict';

// Imports
var $;

// Containers
var wrapperEl;

// --------------------------------
// Functions

/**
 * Initializes module
 */
var init = function (jQuery) {
    $ = jQuery;

    // Cache elements
    wrapperEl = wrapperEl || $('.page-module');

    if (!wrapperEl.length) {
        return;
    }

    // TODO: Set whatever
};

// --------------------------------
// Export

module.exports = { init: init };
