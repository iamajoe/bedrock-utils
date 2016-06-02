// -----------------------------------------
// IMPORTS

import { isIe, isMobile } from 'bedrock/is';
import { mountApp } from 'containers/app.js';

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Initialize function
 */
const init = () => {
    const bodyWrapper = document.getElementById('body-wrapper');
    const classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    if (isIe()) {
        classList.add('is-ie');
    }

    if (isMobile()) {
        classList.add('is-mobile');
    }

    // Mount app
    mountApp(bodyWrapper);

    // Router
    require('route/router.js');
};

// -----------------------------------------
// RUNTIME

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', init);
