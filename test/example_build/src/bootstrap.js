'use strict';

// Imports
var index = require('./scripts/index.js');

/* eslint-disable no-undef */
var $ = jQuery;
/* eslint-enable no-undef */

// Wait for the document to be ready
$(document).ready(function () {
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    // Initialize all containers
    index.init();
});
