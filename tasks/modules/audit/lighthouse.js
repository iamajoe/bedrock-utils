/* global Promise */
var chromeLauncher = require('lighthouse/lighthouse-cli/chrome-launcher.js');
var lighthouse = require('lighthouse');
var logger = require('../../utils/logger.js');

//-------------------------------------
// Functions


/**
 * Checks if is compliant
 *
 * @param {object} audit
 * @returns
 */
function isCompliant(audit) {
    // Lighthouse doesn't complies with strings and as suchs needs the url
    var url = typeof audit.reqSrc === 'string' ? audit.reqSrc : audit.reqSrc[0];

    // Now lets validate
    var launcher = new chromeLauncher.ChromeLauncher({
        port: 9222,
        autoSelectChrome: true
    });
    var cacheData;

    // Perform...
    return launcher.isDebuggerReady().catch(() => {
        logger.log('Lighthouse', 'Launching Chrome...');
        return launcher.run();
    })
    .then(() => lighthouse(url, { output: 'json' }))
    .then(function (data) {
        cacheData = data.audits;
        return data;
    })
    .then(() => launcher.kill())
    .then(function () {
        var keys = Object.keys(cacheData);
        var hasError = false;
        var i;

        // Lets see if all is compliant
        for (i = 0; i < keys.length; i += 1) {
            if (cacheData[keys[i]].score === false) {
                hasError = true;
                break;
            }
        }

        if (hasError) { throw cacheData; }

        return cacheData;
    });
}

//-------------------------------------
// Export

module.exports = function (audit) {
    var rules = [
        { name: 'isCompliant', fn: isCompliant.bind(null, audit) }
    ];

    return { name: 'lighthouse', rules: rules };
};
