(function () {
    'use strict';

    // Containers
    var fooContainer = require('./nested/foo.js');
    var bodyEl;

    // ------------------------------------------------
    // Functions

    /**
     * Initialize all modules
     */
    var initModules = function () {
        // Initialize all containers
        fooContainer.init();
    };

    /**
     * DOM load handler
     */
    var onDOMLoad = function () {
        // Cache elements
        // I generally use a '#body-wrapper' here because some
        // javascript frameworks prefer the body to be wrapped (like React)
        bodyEl = document.getElementById('body-wrapper');

        // Vars
        var classList = bodyEl.classList;

        // Set classes
        classList.remove('no-script');

        // Initialize
        initModules();
    };

    // ------------------------------------------------
    // Runtime

    // Wait for the document to be ready
    document.addEventListener('DOMContentLoaded', onDOMLoad);
})();
