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

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate = function validate(items, fn) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return typeof fn === 'function' && fn.apply(undefined, args);
};

// -----------------------------------------
// Export

exports.validate = validate;

// Just for tests... We will get rid of this on the build process

var testsFn = exports.testsFn = function testsFn() {
  return { validate: validate };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZS5zdHViLmpzIl0sIm5hbWVzIjpbInZhbGlkYXRlIiwiaXRlbXMiLCJmbiIsImFyZ3MiLCJ0ZXN0c0ZuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQU9BLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxLQUFELEVBQVFDLEVBQVI7QUFBQSxvQ0FBZUMsSUFBZjtBQUFlQSxRQUFmO0FBQUE7O0FBQUEsU0FBd0IsT0FBT0QsRUFBUCxLQUFjLFVBQWQsSUFBNEJBLG9CQUFNQyxJQUFOLENBQXBEO0FBQUEsQ0FBakI7O0FBRUE7QUFDQTs7UUFFU0gsUSxHQUFBQSxROztBQUVUOztBQUNPLElBQU1JLDRCQUFVLFNBQVZBLE9BQVU7QUFBQSxTQUFPLEVBQUVKLGtCQUFGLEVBQVA7QUFBQSxDQUFoQiIsImZpbGUiOiJ2YWxpZGF0ZS5zdHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBTdHViIGV4aXN0cyB0byBiZSBpbXBvcnRlZCB3aGVuIGluIHByb2R1Y3Rpb24gbW9kZVxuLy8gVmFsaWRhdGlvbiBpbiBydW50aW1lIHdpbGwgc2xvdyBkb3duIHBlcmZvcm1hbmNlIHNwZWVkc1xuLy8gQW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gcnVuIGl0IGluIHByb2R1Y3Rpb25cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuLyoqXG4gKiBWYWxpZGF0ZXMgZnVuY3Rpb24gYXJndW1lbnRzXG4gKiBAcGFyYW0gIHthcnJheX0gaXRlbXNcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtICB7YXJyYXl9IGFyZ3NcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3QgdmFsaWRhdGUgPSAoaXRlbXMsIGZuLCAuLi5hcmdzKSA9PiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oLi4uYXJncyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgdmFsaWRhdGUgfTtcblxuLy8gSnVzdCBmb3IgdGVzdHMuLi4gV2Ugd2lsbCBnZXQgcmlkIG9mIHRoaXMgb24gdGhlIGJ1aWxkIHByb2Nlc3NcbmV4cG9ydCBjb25zdCB0ZXN0c0ZuID0gKCkgPT4gKHsgdmFsaWRhdGUgfSk7XG4iXX0=