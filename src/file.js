/* @flow *//* :: import type {ReadFile} from "./_test/file.flow.js" */
'use strict';

import fs from 'fs';
import path from 'path';

// -----------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @param  {string} dirname
 * @return {string}
 */
const readFile/* :: :ReadFile */ = (pathSrc, dirname) => {
    const filename = !!dirname ? path.join(dirname, pathSrc) : path.resolve(pathSrc);
    return !fs.existsSync(filename) ? '' : fs.readFileSync(filename, 'utf8');
};

// ------------------------------------
// Export

export default { readFile };
