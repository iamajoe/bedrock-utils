'use strict';

// Stub exists to be imported when in production mode
// Validation in runtime will slow down performance speeds
// And there is no need to run it in production

// -----------------------------------------
// Functions
/**
 * Validates function arguments
 * @param  {array} items
 * @param  {function} fn
 * @param  {array} args
 * @return {string}
 */
const validate = (items, fn, ...args) => typeof fn === 'function' && fn(...args);

// -----------------------------------------
// Export

export { validate };

// Just for tests... We will get rid of this on the build process
export const testsFn = () => ({ validate });
