'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = undefined;

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _cloneDeep = require('lodash/cloneDeep.js');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -----------------------------------------
// Functions

/**
 * Validates function arguments in private
 * @param  {array} items
 * @param  {array} args
 * @return {string}
 */
var _validate = function _validate(items, args) {
    // TODO: Should check for dev env vars and remove all this and the lib from import
    var schema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Validation data',
        type: 'object',
        properties: {},
        additionalItems: false
    };
    var required = [];

    // Lets parse all items
    for (var i = 0; i < items.length; i += 1) {
        var item = (0, _cloneDeep2.default)(items[i]);

        // Lets cache required. Not json schema valid
        item.required && required.push('' + i);

        // Always force to delete it
        delete item.required;

        // Set on the schema
        schema.properties['' + i] = item;
    }

    // Check if there are requireds
    if (required.length) {
        schema.required = required;
    }

    // Lets parse arguments
    var argsObj = {};
    for (var _i = 0; _i < args.length; _i += 1) {
        argsObj['' + _i] = args[_i];
    }

    // Finally check the results
    var ajv = new _ajv2.default({ allErrors: true });
    var valid = ajv.validate(schema, argsObj);

    // Check for errors
    return !valid && ajv.errors;
};

/**
 * Validates function arguments
 * @param  {array} items
 * @param  {function} fn
 * @param  {array} args
 * @return {string}
 */
var validate = function validate(items, fn) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    // Check if this function has the right values
    var isntValid = _validate([{ title: 'items', type: 'array', items: { type: 'object' }, minItems: 1, required: true }, { title: 'args', type: 'array', minItems: 1, required: true }], [items, args]);

    // This function isn't valid
    if (isntValid) {
        /* eslint-disable no-throw-literal */
        throw {
            name: 'Error',
            message: 'Wrong data in validate function',
            data: isntValid
        };
        /* eslint-enable */
    }

    // Lets check the real one now
    isntValid = _validate(items, args);
    if (isntValid) {
        /* eslint-disable no-throw-literal */
        throw {
            name: 'Error',
            message: 'Wrong data in test!',
            data: isntValid
        };
        /* eslint-enable */
    }

    // Lets run the function now or just return the data
    return typeof fn === 'function' && fn.apply(undefined, args);
};
exports.validate = validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJfdmFsaWRhdGUiLCJpdGVtcyIsImFyZ3MiLCJzY2hlbWEiLCIkc2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwicHJvcGVydGllcyIsImFkZGl0aW9uYWxJdGVtcyIsInJlcXVpcmVkIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJwdXNoIiwiYXJnc09iaiIsImFqdiIsImFsbEVycm9ycyIsInZhbGlkIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJmbiIsImlzbnRWYWxpZCIsIm1pbkl0ZW1zIiwibmFtZSIsIm1lc3NhZ2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBaUI7QUFDL0I7QUFDQSxRQUFNQyxTQUFTO0FBQ1hDLGlCQUFTLHlDQURFO0FBRVhDLGVBQU8saUJBRkk7QUFHWEMsY0FBTSxRQUhLO0FBSVhDLG9CQUFZLEVBSkQ7QUFLWEMseUJBQWlCO0FBTE4sS0FBZjtBQU9BLFFBQU1DLFdBQVcsRUFBakI7O0FBRUE7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVQsTUFBTVUsTUFBMUIsRUFBa0NELEtBQUssQ0FBdkMsRUFBMEM7QUFDdEMsWUFBTUUsT0FBTyx5QkFBVVgsTUFBTVMsQ0FBTixDQUFWLENBQWI7O0FBRUE7QUFDQUUsYUFBS0gsUUFBTCxJQUFpQkEsU0FBU0ksSUFBVCxNQUFpQkgsQ0FBakIsQ0FBakI7O0FBRUE7QUFDQSxlQUFPRSxLQUFLSCxRQUFaOztBQUVBO0FBQ0FOLGVBQU9JLFVBQVAsTUFBcUJHLENBQXJCLElBQTRCRSxJQUE1QjtBQUNIOztBQUVEO0FBQ0EsUUFBSUgsU0FBU0UsTUFBYixFQUFxQjtBQUFFUixlQUFPTSxRQUFQLEdBQWtCQSxRQUFsQjtBQUE2Qjs7QUFFcEQ7QUFDQSxRQUFNSyxVQUFVLEVBQWhCO0FBQ0EsU0FBSyxJQUFJSixLQUFJLENBQWIsRUFBZ0JBLEtBQUlSLEtBQUtTLE1BQXpCLEVBQWlDRCxNQUFLLENBQXRDLEVBQXlDO0FBQ3JDSSxxQkFBV0osRUFBWCxJQUFrQlIsS0FBS1EsRUFBTCxDQUFsQjtBQUNIOztBQUVEO0FBQ0EsUUFBTUssTUFBTSxrQkFBUSxFQUFFQyxXQUFXLElBQWIsRUFBUixDQUFaO0FBQ0EsUUFBTUMsUUFBUUYsSUFBSUcsUUFBSixDQUFhZixNQUFiLEVBQXFCVyxPQUFyQixDQUFkOztBQUVBO0FBQ0EsV0FBTyxDQUFDRyxLQUFELElBQVVGLElBQUlJLE1BQXJCO0FBQ0gsQ0F4Q0Q7O0FBMENBOzs7Ozs7O0FBT0EsSUFBTUQsV0FBVyxTQUFYQSxRQUFXLENBQUNqQixLQUFELEVBQVFtQixFQUFSLEVBQXdCO0FBQUEsc0NBQVRsQixJQUFTO0FBQVRBLFlBQVM7QUFBQTs7QUFDckM7QUFDQSxRQUFJbUIsWUFBWXJCLFVBQVUsQ0FDdEIsRUFBRUssT0FBTyxPQUFULEVBQWtCQyxNQUFNLE9BQXhCLEVBQWlDTCxPQUFPLEVBQUVLLE1BQU0sUUFBUixFQUF4QyxFQUE0RGdCLFVBQVUsQ0FBdEUsRUFBeUViLFVBQVUsSUFBbkYsRUFEc0IsRUFFdEIsRUFBRUosT0FBTyxNQUFULEVBQWlCQyxNQUFNLE9BQXZCLEVBQWdDZ0IsVUFBVSxDQUExQyxFQUE2Q2IsVUFBVSxJQUF2RCxFQUZzQixDQUFWLEVBR2IsQ0FBQ1IsS0FBRCxFQUFRQyxJQUFSLENBSGEsQ0FBaEI7O0FBS0E7QUFDQSxRQUFJbUIsU0FBSixFQUFlO0FBQ1g7QUFDQSxjQUFNO0FBQ0ZFLGtCQUFNLE9BREo7QUFFRkMscUJBQVMsaUNBRlA7QUFHRkMsa0JBQU1KO0FBSEosU0FBTjtBQUtBO0FBQ0g7O0FBRUQ7QUFDQUEsZ0JBQVlyQixVQUFVQyxLQUFWLEVBQWlCQyxJQUFqQixDQUFaO0FBQ0EsUUFBSW1CLFNBQUosRUFBZTtBQUNYO0FBQ0EsY0FBTTtBQUNGRSxrQkFBTSxPQURKO0FBRUZDLHFCQUFTLHFCQUZQO0FBR0ZDLGtCQUFNSjtBQUhKLFNBQU47QUFLQTtBQUNIOztBQUVEO0FBQ0EsV0FBTyxPQUFPRCxFQUFQLEtBQWMsVUFBZCxJQUE0QkEsb0JBQU1sQixJQUFOLENBQW5DO0FBQ0gsQ0FoQ0Q7UUFpQ1NnQixRLEdBQUFBLFEiLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBanYgZnJvbSAnYWp2JztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoL2Nsb25lRGVlcC5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBWYWxpZGF0ZXMgZnVuY3Rpb24gYXJndW1lbnRzIGluIHByaXZhdGVcbiAqIEBwYXJhbSAge2FycmF5fSBpdGVtc1xuICogQHBhcmFtICB7YXJyYXl9IGFyZ3NcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3QgX3ZhbGlkYXRlID0gKGl0ZW1zLCBhcmdzKSA9PiB7XG4gICAgLy8gVE9ETzogU2hvdWxkIGNoZWNrIGZvciBkZXYgZW52IHZhcnMgYW5kIHJlbW92ZSBhbGwgdGhpcyBhbmQgdGhlIGxpYiBmcm9tIGltcG9ydFxuICAgIGNvbnN0IHNjaGVtYSA9IHtcbiAgICAgICAgJHNjaGVtYTogJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDQvc2NoZW1hIycsXG4gICAgICAgIHRpdGxlOiAnVmFsaWRhdGlvbiBkYXRhJyxcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHt9LFxuICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlXG4gICAgfTtcbiAgICBjb25zdCByZXF1aXJlZCA9IFtdO1xuXG4gICAgLy8gTGV0cyBwYXJzZSBhbGwgaXRlbXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjbG9uZURlZXAoaXRlbXNbaV0pO1xuXG4gICAgICAgIC8vIExldHMgY2FjaGUgcmVxdWlyZWQuIE5vdCBqc29uIHNjaGVtYSB2YWxpZFxuICAgICAgICBpdGVtLnJlcXVpcmVkICYmIHJlcXVpcmVkLnB1c2goYCR7aX1gKTtcblxuICAgICAgICAvLyBBbHdheXMgZm9yY2UgdG8gZGVsZXRlIGl0XG4gICAgICAgIGRlbGV0ZSBpdGVtLnJlcXVpcmVkO1xuXG4gICAgICAgIC8vIFNldCBvbiB0aGUgc2NoZW1hXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2Ake2l9YF0gPSBpdGVtO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGFyZSByZXF1aXJlZHNcbiAgICBpZiAocmVxdWlyZWQubGVuZ3RoKSB7IHNjaGVtYS5yZXF1aXJlZCA9IHJlcXVpcmVkOyB9XG5cbiAgICAvLyBMZXRzIHBhcnNlIGFyZ3VtZW50c1xuICAgIGNvbnN0IGFyZ3NPYmogPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJnc09ialtgJHtpfWBdID0gYXJnc1tpXTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5IGNoZWNrIHRoZSByZXN1bHRzXG4gICAgY29uc3QgYWp2ID0gbmV3IEFqdih7IGFsbEVycm9yczogdHJ1ZSB9KTtcbiAgICBjb25zdCB2YWxpZCA9IGFqdi52YWxpZGF0ZShzY2hlbWEsIGFyZ3NPYmopO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGVycm9yc1xuICAgIHJldHVybiAhdmFsaWQgJiYgYWp2LmVycm9ycztcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICogQHBhcmFtICB7YXJyYXl9IGl0ZW1zXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSAge2FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHZhbGlkYXRlID0gKGl0ZW1zLCBmbiwgLi4uYXJncykgPT4ge1xuICAgIC8vIENoZWNrIGlmIHRoaXMgZnVuY3Rpb24gaGFzIHRoZSByaWdodCB2YWx1ZXNcbiAgICBsZXQgaXNudFZhbGlkID0gX3ZhbGlkYXRlKFtcbiAgICAgICAgeyB0aXRsZTogJ2l0ZW1zJywgdHlwZTogJ2FycmF5JywgaXRlbXM6IHsgdHlwZTogJ29iamVjdCcgfSwgbWluSXRlbXM6IDEsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIHsgdGl0bGU6ICdhcmdzJywgdHlwZTogJ2FycmF5JywgbWluSXRlbXM6IDEsIHJlcXVpcmVkOiB0cnVlIH1cbiAgICBdLCBbaXRlbXMsIGFyZ3NdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXNuJ3QgdmFsaWRcbiAgICBpZiAoaXNudFZhbGlkKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXRocm93LWxpdGVyYWwgKi9cbiAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgbmFtZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXcm9uZyBkYXRhIGluIHZhbGlkYXRlIGZ1bmN0aW9uJyxcbiAgICAgICAgICAgIGRhdGE6IGlzbnRWYWxpZFxuICAgICAgICB9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLy8gTGV0cyBjaGVjayB0aGUgcmVhbCBvbmUgbm93XG4gICAgaXNudFZhbGlkID0gX3ZhbGlkYXRlKGl0ZW1zLCBhcmdzKTtcbiAgICBpZiAoaXNudFZhbGlkKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXRocm93LWxpdGVyYWwgKi9cbiAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgbmFtZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXcm9uZyBkYXRhIGluIHRlc3QhJyxcbiAgICAgICAgICAgIGRhdGE6IGlzbnRWYWxpZFxuICAgICAgICB9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLy8gTGV0cyBydW4gdGhlIGZ1bmN0aW9uIG5vdyBvciBqdXN0IHJldHVybiB0aGUgZGF0YVxuICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oLi4uYXJncyk7XG59O1xuZXhwb3J0IHsgdmFsaWRhdGUgfTtcbiJdfQ==