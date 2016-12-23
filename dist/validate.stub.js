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
exports.validate = validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZS5zdHViLmpzIl0sIm5hbWVzIjpbInZhbGlkYXRlIiwiaXRlbXMiLCJmbiIsImFyZ3MiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBT0EsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEtBQUQsRUFBUUMsRUFBUjtBQUFBLG9DQUFlQyxJQUFmO0FBQWVBLFFBQWY7QUFBQTs7QUFBQSxTQUF3QixPQUFPRCxFQUFQLEtBQWMsVUFBZCxJQUE0QkEsb0JBQU1DLElBQU4sQ0FBcEQ7QUFBQSxDQUFqQjtRQUNTSCxRLEdBQUFBLFEiLCJmaWxlIjoidmFsaWRhdGUuc3R1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gU3R1YiBleGlzdHMgdG8gYmUgaW1wb3J0ZWQgd2hlbiBpbiBwcm9kdWN0aW9uIG1vZGVcbi8vIFZhbGlkYXRpb24gaW4gcnVudGltZSB3aWxsIHNsb3cgZG93biBwZXJmb3JtYW5jZSBzcGVlZHNcbi8vIEFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIHJ1biBpdCBpbiBwcm9kdWN0aW9uXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcbi8qKlxuICogVmFsaWRhdGVzIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICogQHBhcmFtICB7YXJyYXl9IGl0ZW1zXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSAge2FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHZhbGlkYXRlID0gKGl0ZW1zLCBmbiwgLi4uYXJncykgPT4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGZuKC4uLmFyZ3MpO1xuZXhwb3J0IHsgdmFsaWRhdGUgfTtcbiJdfQ==