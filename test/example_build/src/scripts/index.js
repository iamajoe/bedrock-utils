/* eslint-disable no-undef */
var $ = jQuery;
/* eslint-enable no-undef */

// --------------------------------
// Vars

var wrapperEl;

// --------------------------------
// Functions

/**
 * Initializes header
 */
var init = function () {
    wrapperEl = wrapperEl || $('.page-index');

    if (!wrapperEl.length) {
        return;
    }

    // TODO: Set whatever
};

// --------------------------------
// Export

module.exports = { init: init };
