/* eslint-disable strict */'use strict';/* eslint-enable strict */
/* global $, window, document, module, process, navigator */

// -----------------------------------------
// Functions

/**
 * Check if is browser
 * @param  {*} val
 * @return {boolean}
 */
function browser() {
    return (typeof window !== 'undefined');
}

/**
 * Check if is node
 * @param  {*} val
 * @return {boolean}
 */
function node() {
    return (typeof module !== 'undefined' && module.exports && typeof process !== 'undefined');
}

/**
 * Is it ie?
 * @return {boolean}
 */
function ie() {
    return browser() && navigator.userAgent.match(/Trident\/7\./);
}

/**
 * Is edge
 * @return {Boolean}
 */
function edge() {
    return browser() && /Edge\/\d./i.test(navigator.userAgent);
}

/**
 * Is it mobile?
 * @return {boolean}
 */
function mobile() {
    if (browser()) {
        /* eslint-disable max-len */
        if (/Android|Tablet PC|PalmOS|PalmSource|smartphone|GT-P1000|SGH-T849|SHW-M180S|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows CE|Windows Mobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        /* eslint-enable max-len */
    }

    return false;
}

/**
 * Check if device is touch
 * @return {boolean}
 */
function touch() {
    if (browser()) {
        return !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
    }

    return false;
}

/**
 * Check if media is...
 * @return {boolean}
 */
function media(target) {
    var body;

    if (typeof document === 'undefined' || typeof $ === 'undefined' || !target || target === '') {
        // TODO: We should try to do without $
        return false;
    }

    body = document.body;
    body = $(body);

    if (target === 'mobile') {
        return body.find('> .is-mobile').is(':visible');
    } else if (target === 'tablet') {
        return body.find('> .is-tablet').is(':visible');
    } else if (target === 'desktop') {
        return !(body.find('> .is-mobile').is(':visible')) &&
               !(body.find('> .is-tablet').is(':visible'));
    } else if (target === 'over') {
        return body.find('> .is-over').is(':visible');
    }
}

// ------------------------------------
// Export

module.exports = {
    node: node,
    browser: browser,
    ie: ie,
    edge: edge,
    mobile: mobile,
    touch: touch,
    media: media
};


