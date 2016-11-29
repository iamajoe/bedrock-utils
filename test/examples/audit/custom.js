/* global Promise */

//-------------------------------------
// Functions

/**
 * Checks if exists a body
 *
 * @param {object} audit
 * @returns
 */
function hasBody(audit) {
    var promise = new Promise(function (resolve, reject) {
        var bodyHtml = audit.window.$('body').html();
        if (!!bodyHtml.length) { resolve(true); } else { reject(false); }
    });

    return promise;
}

//-------------------------------------
// Export

module.exports = function (audit) {
    var rules = [
        { name: 'hasBody', fn: hasBody.bind(null, audit) }
    ];

    return { name: 'custom', rules: rules };
};
