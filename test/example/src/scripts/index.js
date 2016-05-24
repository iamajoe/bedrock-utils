/* eslint-disable no-undef */
const $ = jQuery;
/* eslint-enable no-undef */

// --------------------------------
// Vars

let wrapperEl;

// --------------------------------
// Functions

/**
 * Initializes header
 */
const init = () => {
    wrapperEl = wrapperEl || $('.page-index');

    if (!wrapperEl.length) {
        return;
    }

    // TODO: Set whatever
};

// --------------------------------
// Export

export default { init };
