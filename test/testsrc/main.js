/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Imports
var $ = require('jquery');

// Wait for the document to be ready
$(document).ready(function () {
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');
});
