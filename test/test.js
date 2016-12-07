/* eslint-disable strict */'use strict';/* eslint-enable */

const path = require('path');
const glob = require('glob');

// --------------------------------
// Imports test modules

const specs = glob.sync('./src/**/*.spec.js');

// Now lets require it
specs.forEach(val => require(path.join(process.cwd(), val)));
