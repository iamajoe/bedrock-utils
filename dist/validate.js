'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _isArray = require('lodash/isArray.js');

var _isArray2 = _interopRequireDefault(_isArray);

var _clone = require('lodash/clone.js');

var _clone2 = _interopRequireDefault(_clone);

var _merge = require('lodash/merge.js');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SCHEMA = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'Validation data',
    type: 'object',
    additionalItems: false
};

// -----------------------------------------
// Functions

/**
 * Validates schema
 *
 * @param {object} schema
 * @param {array} args
 * @returns {object}
 */
var _validateSchema = function _validateSchema(schema, args) {
    var enforcedSchema = (0, _merge2.default)((0, _clone2.default)(DEFAULT_SCHEMA), schema);

    // Lets parse arguments
    var argsObj = {};
    for (var i = 0; i < args.length; i += 1) {
        argsObj['' + i] = args[i];
    }

    // Finally check the results
    var ajv = new _ajv2.default({ allErrors: true });
    var valid = ajv.validate(enforcedSchema, argsObj);

    // Check for errors
    return !valid && ajv.errors;
};

/**
 * Validates function arguments in private
 * @param  {array} items
 * @return {object}
 */
var _getSchema = function _getSchema(items) {
    var schema = { properties: {} };
    var required = [];

    // Lets parse all items
    for (var i = 0; i < items.length; i += 1) {
        var item = items[i];

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

    // Check for errors
    return schema;
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

    var isntValid = void 0;

    // Check if this function has the right values
    // It doesn't use the validate schema because it
    // takes a speed toll without an actual need for
    if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object') {
        isntValid = 'Items should be an array with schema items or a schema object';
    } else if ((0, _isArray2.default)(items) && !items.length) {
        isntValid = 'Items should have more than 0 items';
    } else if (!(0, _isArray2.default)(args) || !args.length) {
        isntValid = 'Arguments should be and array and have more than 0 items';
    }

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
    var hasSchema = !items.hasOwnProperty('length') || !items.length;
    var schema = hasSchema ? items : _getSchema(items);
    isntValid = _validateSchema(schema, args);
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

// -----------------------------------------
// Export

exports.validate = validate;

// Just for tests... We will get rid of this on the build process
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX1NDSEVNQSIsIiRzY2hlbWEiLCJ0aXRsZSIsInR5cGUiLCJhZGRpdGlvbmFsSXRlbXMiLCJfdmFsaWRhdGVTY2hlbWEiLCJzY2hlbWEiLCJhcmdzIiwiZW5mb3JjZWRTY2hlbWEiLCJhcmdzT2JqIiwiaSIsImxlbmd0aCIsImFqdiIsImFsbEVycm9ycyIsInZhbGlkIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJfZ2V0U2NoZW1hIiwiaXRlbXMiLCJwcm9wZXJ0aWVzIiwicmVxdWlyZWQiLCJpdGVtIiwicHVzaCIsImZuIiwiaXNudFZhbGlkIiwibmFtZSIsIm1lc3NhZ2UiLCJkYXRhIiwiaGFzU2NoZW1hIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCO0FBQ25CQyxhQUFTLHlDQURVO0FBRW5CQyxXQUFPLGlCQUZZO0FBR25CQyxVQUFNLFFBSGE7QUFJbkJDLHFCQUFpQjtBQUpFLENBQXZCOztBQU9BO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFrQjtBQUN0QyxRQUFNQyxpQkFBaUIscUJBQU0scUJBQU1SLGNBQU4sQ0FBTixFQUE2Qk0sTUFBN0IsQ0FBdkI7O0FBRUE7QUFDQSxRQUFNRyxVQUFVLEVBQWhCO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlILEtBQUtJLE1BQXpCLEVBQWlDRCxLQUFLLENBQXRDLEVBQXlDO0FBQ3JDRCxxQkFBV0MsQ0FBWCxJQUFrQkgsS0FBS0csQ0FBTCxDQUFsQjtBQUNIOztBQUVEO0FBQ0EsUUFBTUUsTUFBTSxrQkFBUSxFQUFFQyxXQUFXLElBQWIsRUFBUixDQUFaO0FBQ0EsUUFBTUMsUUFBUUYsSUFBSUcsUUFBSixDQUFhUCxjQUFiLEVBQTZCQyxPQUE3QixDQUFkOztBQUVBO0FBQ0EsV0FBTyxDQUFDSyxLQUFELElBQVVGLElBQUlJLE1BQXJCO0FBQ0gsQ0FmRDs7QUFpQkE7Ozs7O0FBS0EsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLEtBQUQsRUFBVztBQUMxQixRQUFNWixTQUFTLEVBQUVhLFlBQVksRUFBZCxFQUFmO0FBQ0EsUUFBTUMsV0FBVyxFQUFqQjs7QUFFQTtBQUNBLFNBQUssSUFBSVYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJUSxNQUFNUCxNQUExQixFQUFrQ0QsS0FBSyxDQUF2QyxFQUEwQztBQUN0QyxZQUFNVyxPQUFPSCxNQUFNUixDQUFOLENBQWI7O0FBRUE7QUFDQVcsYUFBS0QsUUFBTCxJQUFpQkEsU0FBU0UsSUFBVCxNQUFpQlosQ0FBakIsQ0FBakI7O0FBRUE7QUFDQSxlQUFPVyxLQUFLRCxRQUFaOztBQUVBO0FBQ0FkLGVBQU9hLFVBQVAsTUFBcUJULENBQXJCLElBQTRCVyxJQUE1QjtBQUNIOztBQUVEO0FBQ0EsUUFBSUQsU0FBU1QsTUFBYixFQUFxQjtBQUFFTCxlQUFPYyxRQUFQLEdBQWtCQSxRQUFsQjtBQUE2Qjs7QUFFcEQ7QUFDQSxXQUFPZCxNQUFQO0FBQ0gsQ0F2QkQ7O0FBeUJBOzs7Ozs7O0FBT0EsSUFBTVMsV0FBVyxTQUFYQSxRQUFXLENBQUNHLEtBQUQsRUFBUUssRUFBUixFQUF3QjtBQUFBLHNDQUFUaEIsSUFBUztBQUFUQSxZQUFTO0FBQUE7O0FBQ3JDLFFBQUlpQixrQkFBSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFJLFFBQU9OLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBckIsRUFBK0I7QUFDM0JNLG9CQUFZLCtEQUFaO0FBQ0gsS0FGRCxNQUVPLElBQUksdUJBQVFOLEtBQVIsS0FBa0IsQ0FBQ0EsTUFBTVAsTUFBN0IsRUFBcUM7QUFDeENhLG9CQUFZLHFDQUFaO0FBQ0gsS0FGTSxNQUVBLElBQUksQ0FBQyx1QkFBUWpCLElBQVIsQ0FBRCxJQUFrQixDQUFDQSxLQUFLSSxNQUE1QixFQUFvQztBQUN2Q2Esb0JBQVksMERBQVo7QUFDSDs7QUFFRDtBQUNBLFFBQUlBLFNBQUosRUFBZTtBQUNYO0FBQ0EsY0FBTTtBQUNGQyxrQkFBTSxPQURKO0FBRUZDLHFCQUFTLGlDQUZQO0FBR0ZDLGtCQUFNSDtBQUhKLFNBQU47QUFLQTtBQUNIOztBQUVEO0FBQ0EsUUFBTUksWUFBWSxDQUFDVixNQUFNVyxjQUFOLENBQXFCLFFBQXJCLENBQUQsSUFBbUMsQ0FBQ1gsTUFBTVAsTUFBNUQ7QUFDQSxRQUFNTCxTQUFTc0IsWUFBWVYsS0FBWixHQUFvQkQsV0FBV0MsS0FBWCxDQUFuQztBQUNBTSxnQkFBWW5CLGdCQUFnQkMsTUFBaEIsRUFBd0JDLElBQXhCLENBQVo7QUFDQSxRQUFJaUIsU0FBSixFQUFlO0FBQ1g7QUFDQSxjQUFNO0FBQ0ZDLGtCQUFNLE9BREo7QUFFRkMscUJBQVMscUJBRlA7QUFHRkMsa0JBQU1IO0FBSEosU0FBTjtBQUtBO0FBQ0g7O0FBRUQ7QUFDQSxXQUFPLE9BQU9ELEVBQVAsS0FBYyxVQUFkLElBQTRCQSxvQkFBTWhCLElBQU4sQ0FBbkM7QUFDSCxDQXpDRDs7QUEyQ0E7QUFDQTs7UUFFU1EsUSxHQUFBQSxROztBQUVUIiwiZmlsZSI6InZhbGlkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQWp2IGZyb20gJ2Fqdic7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheS5qcyc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lLmpzJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UuanMnO1xuXG5jb25zdCBERUZBVUxUX1NDSEVNQSA9IHtcbiAgICAkc2NoZW1hOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEjJyxcbiAgICB0aXRsZTogJ1ZhbGlkYXRpb24gZGF0YScsXG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFZhbGlkYXRlcyBzY2hlbWFcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5jb25zdCBfdmFsaWRhdGVTY2hlbWEgPSAoc2NoZW1hLCBhcmdzKSA9PiB7XG4gICAgY29uc3QgZW5mb3JjZWRTY2hlbWEgPSBtZXJnZShjbG9uZShERUZBVUxUX1NDSEVNQSksIHNjaGVtYSk7XG5cbiAgICAvLyBMZXRzIHBhcnNlIGFyZ3VtZW50c1xuICAgIGNvbnN0IGFyZ3NPYmogPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJnc09ialtgJHtpfWBdID0gYXJnc1tpXTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5IGNoZWNrIHRoZSByZXN1bHRzXG4gICAgY29uc3QgYWp2ID0gbmV3IEFqdih7IGFsbEVycm9yczogdHJ1ZSB9KTtcbiAgICBjb25zdCB2YWxpZCA9IGFqdi52YWxpZGF0ZShlbmZvcmNlZFNjaGVtYSwgYXJnc09iaik7XG5cbiAgICAvLyBDaGVjayBmb3IgZXJyb3JzXG4gICAgcmV0dXJuICF2YWxpZCAmJiBhanYuZXJyb3JzO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgZnVuY3Rpb24gYXJndW1lbnRzIGluIHByaXZhdGVcbiAqIEBwYXJhbSAge2FycmF5fSBpdGVtc1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5jb25zdCBfZ2V0U2NoZW1hID0gKGl0ZW1zKSA9PiB7XG4gICAgY29uc3Qgc2NoZW1hID0geyBwcm9wZXJ0aWVzOiB7fSB9O1xuICAgIGNvbnN0IHJlcXVpcmVkID0gW107XG5cbiAgICAvLyBMZXRzIHBhcnNlIGFsbCBpdGVtc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuXG4gICAgICAgIC8vIExldHMgY2FjaGUgcmVxdWlyZWQuIE5vdCBqc29uIHNjaGVtYSB2YWxpZFxuICAgICAgICBpdGVtLnJlcXVpcmVkICYmIHJlcXVpcmVkLnB1c2goYCR7aX1gKTtcblxuICAgICAgICAvLyBBbHdheXMgZm9yY2UgdG8gZGVsZXRlIGl0XG4gICAgICAgIGRlbGV0ZSBpdGVtLnJlcXVpcmVkO1xuXG4gICAgICAgIC8vIFNldCBvbiB0aGUgc2NoZW1hXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2Ake2l9YF0gPSBpdGVtO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGFyZSByZXF1aXJlZHNcbiAgICBpZiAocmVxdWlyZWQubGVuZ3RoKSB7IHNjaGVtYS5yZXF1aXJlZCA9IHJlcXVpcmVkOyB9XG5cbiAgICAvLyBDaGVjayBmb3IgZXJyb3JzXG4gICAgcmV0dXJuIHNjaGVtYTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICogQHBhcmFtICB7YXJyYXl9IGl0ZW1zXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSAge2FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHZhbGlkYXRlID0gKGl0ZW1zLCBmbiwgLi4uYXJncykgPT4ge1xuICAgIGxldCBpc250VmFsaWQ7XG5cbiAgICAvLyBDaGVjayBpZiB0aGlzIGZ1bmN0aW9uIGhhcyB0aGUgcmlnaHQgdmFsdWVzXG4gICAgLy8gSXQgZG9lc24ndCB1c2UgdGhlIHZhbGlkYXRlIHNjaGVtYSBiZWNhdXNlIGl0XG4gICAgLy8gdGFrZXMgYSBzcGVlZCB0b2xsIHdpdGhvdXQgYW4gYWN0dWFsIG5lZWQgZm9yXG4gICAgaWYgKHR5cGVvZiBpdGVtcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaXNudFZhbGlkID0gJ0l0ZW1zIHNob3VsZCBiZSBhbiBhcnJheSB3aXRoIHNjaGVtYSBpdGVtcyBvciBhIHNjaGVtYSBvYmplY3QnO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShpdGVtcykgJiYgIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpc250VmFsaWQgPSAnSXRlbXMgc2hvdWxkIGhhdmUgbW9yZSB0aGFuIDAgaXRlbXMnO1xuICAgIH0gZWxzZSBpZiAoIWlzQXJyYXkoYXJncykgfHwgIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGlzbnRWYWxpZCA9ICdBcmd1bWVudHMgc2hvdWxkIGJlIGFuZCBhcnJheSBhbmQgaGF2ZSBtb3JlIHRoYW4gMCBpdGVtcyc7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpc24ndCB2YWxpZFxuICAgIGlmIChpc250VmFsaWQpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdGhyb3ctbGl0ZXJhbCAqL1xuICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBuYW1lOiAnRXJyb3InLFxuICAgICAgICAgICAgbWVzc2FnZTogJ1dyb25nIGRhdGEgaW4gdmFsaWRhdGUgZnVuY3Rpb24nLFxuICAgICAgICAgICAgZGF0YTogaXNudFZhbGlkXG4gICAgICAgIH07XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvLyBMZXRzIGNoZWNrIHRoZSByZWFsIG9uZSBub3dcbiAgICBjb25zdCBoYXNTY2hlbWEgPSAhaXRlbXMuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpIHx8ICFpdGVtcy5sZW5ndGg7XG4gICAgY29uc3Qgc2NoZW1hID0gaGFzU2NoZW1hID8gaXRlbXMgOiBfZ2V0U2NoZW1hKGl0ZW1zKTtcbiAgICBpc250VmFsaWQgPSBfdmFsaWRhdGVTY2hlbWEoc2NoZW1hLCBhcmdzKTtcbiAgICBpZiAoaXNudFZhbGlkKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXRocm93LWxpdGVyYWwgKi9cbiAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgbmFtZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXcm9uZyBkYXRhIGluIHRlc3QhJyxcbiAgICAgICAgICAgIGRhdGE6IGlzbnRWYWxpZFxuICAgICAgICB9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgfVxuXG4gICAgLy8gTGV0cyBydW4gdGhlIGZ1bmN0aW9uIG5vdyBvciBqdXN0IHJldHVybiB0aGUgZGF0YVxuICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oLi4uYXJncyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCB7IHZhbGlkYXRlIH07XG5cbi8vIEp1c3QgZm9yIHRlc3RzLi4uIFdlIHdpbGwgZ2V0IHJpZCBvZiB0aGlzIG9uIHRoZSBidWlsZCBwcm9jZXNzXG5leHBvcnQgY29uc3QgX190ZXN0X18gPSB7IF92YWxpZGF0ZVNjaGVtYSwgX2dldFNjaGVtYSwgdmFsaWRhdGUgfTtcbiJdfQ==