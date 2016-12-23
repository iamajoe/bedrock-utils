'use strict';

import fs from 'fs';
import path from 'path';
import { validate } from './validate.js';

// -----------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @param  {string} dirname
 * @return {string}
 */
const readFile = (pathSrc, dirname) => {
    validate([
        { title: 'pathSrc', type: 'string', minLength: 1, required: true },
        { title: 'dirname', type: 'string', minLength: 1, required: false }
    ], null, pathSrc, dirname);

    const filename = !!dirname ? path.join(dirname, pathSrc) : path.resolve(pathSrc);
    return !fs.existsSync(filename) ? '' : fs.readFileSync(filename, 'utf8');
};

// -----------------------------------------
// Export

export { readFile };

// Just for tests... We will get rid of this on the build process
export const __test__ = { readFile };
