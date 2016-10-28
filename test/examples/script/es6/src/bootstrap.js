'use strict';

import index from './scripts/index.js';

/* eslint-disable no-undef */
const $ = jQuery;
/* eslint-enable no-undef */

// Wait for the document to be ready
$(document).ready(() => {
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    // Initialize all containers
    index.init();
});
