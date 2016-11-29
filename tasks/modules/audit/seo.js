/* global Promise */

//-------------------------------------
// Functions

function gmetrix() {
    // TODO: ...
}

/**
 * Checks if is compliant
 *
 * @param {object} audit
 * @returns
 */
function hasCanonical(audit) {
    var promise;

    // Now lets validate
    promise = new Promise(function (resolve, reject) {
        var links = audit.window.$('link');
        var hasIt;

        // Lets see if one of these is a canonical one
        links.each(function (i, val) {
            hasIt = hasIt || val.getAttribute('rel') === 'canonical';
        });

        if (!!hasIt) { resolve(true); } else { reject(false); }
    });

    return promise;
}

//-------------------------------------
// Export

module.exports = function (audit) {
    var rules = [
        { name: 'hasCanonical', fn: hasCanonical.bind(null, audit) }
    ];

    return { name: 'seo', rules: rules };
};
