/* global Promise */
var w3cjs = require('w3cjs');

//-------------------------------------
// Functions

/**
 * Checks if is compliant
 *
 * @param {object} audit
 * @returns
 */
function isCompliant(audit) {
    var documentHtml = audit.window.document.documentElement.outerHTML;
    var promise;

    // Now lets validate
    promise = new Promise(function (resolve, reject) {
        w3cjs.validate({
            input: documentHtml,
            callback: function (res) {
                var msgs = res && res.messages || [];
                var hasErrors = false;
                var i;

                for (i = 0; i < msgs.length; i += 1) {
                    if (msgs[i].type === 'error') {
                        hasErrors = true;
                        break;
                    }
                }

                if (!hasErrors) { resolve(msgs); } else { reject(msgs); }
            }
        });
    });

    return promise;
}

//-------------------------------------
// Export

module.exports = function (audit) {
    var rules = [
        { name: 'isCompliant', fn: isCompliant.bind(null, audit) }
    ];

    return { name: 'w3', rules: rules };
};
