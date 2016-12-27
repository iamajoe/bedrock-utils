'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSchema = exports.compileSchema = exports.validateSchema = exports.validate = undefined;

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

var ajv = new _ajv2.default({
    allErrors: true,
    useDefaults: true,
    verbose: true,
    // TODO: We should use this later to cache schemas or maybe that
    // will bring overhead if there are a lot of requests. Something to decide
    addUsedSchema: false,
    cache: undefined
});
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
var validateSchema = function validateSchema(schema, args) {
    if (typeof schema !== 'function') {
        throw new Error('Schema should be a function to validate');
    } else if (!(0, _isArray2.default)(args) || !args.length) {
        throw new Error('Arguments should be and array and have more than 0 items');
    }

    // Lets parse arguments
    var argsObj = {};
    for (var i = 0; i < args.length; i += 1) {
        argsObj['' + i] = args[i];
    }

    // Finally check the results
    var valid = schema(argsObj);

    // Check for errors
    return !valid && schema.errors;
};

/**
 * Compiles schema
 *
 * @param {object} schema
 * @returns {function}
 */
var compileSchema = function compileSchema(schema) {
    if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) !== 'object') {
        throw new Error('Schema should be an object to compile');
    }

    var enforcedSchema = (0, _merge2.default)((0, _clone2.default)(DEFAULT_SCHEMA), schema);
    return ajv.compile(enforcedSchema);
};

/**
 * Gets a schema object
 * @param  {array|object} items
 * @return {object}
 */
var getSchema = function getSchema(items) {
    // Check if this function has the right values
    // It doesn't use the validate schema because it
    // takes a speed toll without an actual need for
    if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object') {
        throw new Error('Items should be an array with schema items or a schema object');
    } else if ((0, _isArray2.default)(items) && !items.length) {
        throw new Error('Items should have more than 0 items');
    }

    if (!items.hasOwnProperty('length') || !items.length) {
        return items;
    }

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

    try {
        var isntValid = validateSchema(compileSchema(getSchema(items)), args);
        if (isntValid) {
            /* eslint-disable no-throw-literal */
            throw { name: 'Error', message: 'Wrong data in test!', data: isntValid };
            /* eslint-enable */
        }
    } catch (err) {
        /* eslint-disable no-throw-literal */
        throw { name: 'Error', message: 'Wrong data in validate function', data: err };
        /* eslint-enable */
    }

    // Lets run the function now or just return the data
    return typeof fn === 'function' && fn.apply(undefined, args) || args;
};

// -----------------------------------------
// Export

exports.validate = validate;
exports.validateSchema = validateSchema;
exports.compileSchema = compileSchema;
exports.getSchema = getSchema;

// Just for tests... We will get rid of this on the build process
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZS5qcyJdLCJuYW1lcyI6WyJhanYiLCJhbGxFcnJvcnMiLCJ1c2VEZWZhdWx0cyIsInZlcmJvc2UiLCJhZGRVc2VkU2NoZW1hIiwiY2FjaGUiLCJ1bmRlZmluZWQiLCJERUZBVUxUX1NDSEVNQSIsIiRzY2hlbWEiLCJ0aXRsZSIsInR5cGUiLCJhZGRpdGlvbmFsSXRlbXMiLCJ2YWxpZGF0ZVNjaGVtYSIsInNjaGVtYSIsImFyZ3MiLCJFcnJvciIsImxlbmd0aCIsImFyZ3NPYmoiLCJpIiwidmFsaWQiLCJlcnJvcnMiLCJjb21waWxlU2NoZW1hIiwiZW5mb3JjZWRTY2hlbWEiLCJjb21waWxlIiwiZ2V0U2NoZW1hIiwiaXRlbXMiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3BlcnRpZXMiLCJyZXF1aXJlZCIsIml0ZW0iLCJwdXNoIiwidmFsaWRhdGUiLCJmbiIsImlzbnRWYWxpZCIsIm5hbWUiLCJtZXNzYWdlIiwiZGF0YSIsImVyciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLGtCQUFRO0FBQ2hCQyxlQUFXLElBREs7QUFFaEJDLGlCQUFhLElBRkc7QUFHaEJDLGFBQVMsSUFITztBQUloQjtBQUNBO0FBQ0FDLG1CQUFlLEtBTkM7QUFPaEJDLFdBQU9DO0FBUFMsQ0FBUixDQUFaO0FBU0EsSUFBTUMsaUJBQWlCO0FBQ25CQyxhQUFTLHlDQURVO0FBRW5CQyxXQUFPLGlCQUZZO0FBR25CQyxVQUFNLFFBSGE7QUFJbkJDLHFCQUFpQjtBQUpFLENBQXZCOztBQU9BO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFrQjtBQUNyQyxRQUFJLE9BQU9ELE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDOUIsY0FBTSxJQUFJRSxLQUFKLENBQVUseUNBQVYsQ0FBTjtBQUNI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QUFDQTtBQUNIOztBQUVEO0FBQ0EsV0FBTyxPQUFPTCxFQUFQLEtBQWMsVUFBZCxJQUE0QkEsb0JBQU1sQixJQUFOLENBQTVCLElBQTJDQSxJQUFsRDtBQUNILENBaEJEOztBQWtCQTtBQUNBOztRQUVTaUIsUSxHQUFBQSxRO1FBQVVuQixjLEdBQUFBLGM7UUFBZ0JTLGEsR0FBQUEsYTtRQUFlRyxTLEdBQUFBLFM7O0FBRWxEIiwiZmlsZSI6InZhbGlkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQWp2IGZyb20gJ2Fqdic7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheS5qcyc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lLmpzJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UuanMnO1xuXG5jb25zdCBhanYgPSBuZXcgQWp2KHtcbiAgICBhbGxFcnJvcnM6IHRydWUsXG4gICAgdXNlRGVmYXVsdHM6IHRydWUsXG4gICAgdmVyYm9zZTogdHJ1ZSxcbiAgICAvLyBUT0RPOiBXZSBzaG91bGQgdXNlIHRoaXMgbGF0ZXIgdG8gY2FjaGUgc2NoZW1hcyBvciBtYXliZSB0aGF0XG4gICAgLy8gd2lsbCBicmluZyBvdmVyaGVhZCBpZiB0aGVyZSBhcmUgYSBsb3Qgb2YgcmVxdWVzdHMuIFNvbWV0aGluZyB0byBkZWNpZGVcbiAgICBhZGRVc2VkU2NoZW1hOiBmYWxzZSxcbiAgICBjYWNoZTogdW5kZWZpbmVkXG59KTtcbmNvbnN0IERFRkFVTFRfU0NIRU1BID0ge1xuICAgICRzY2hlbWE6ICdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA0L3NjaGVtYSMnLFxuICAgIHRpdGxlOiAnVmFsaWRhdGlvbiBkYXRhJyxcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogVmFsaWRhdGVzIHNjaGVtYVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmNvbnN0IHZhbGlkYXRlU2NoZW1hID0gKHNjaGVtYSwgYXJncykgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2NoZW1hIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRvIHZhbGlkYXRlJyk7XG4gICAgfSBlbHNlIGlmICghaXNBcnJheShhcmdzKSB8fCAhYXJncy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudHMgc2hvdWxkIGJlIGFuZCBhcnJheSBhbmQgaGF2ZSBtb3JlIHRoYW4gMCBpdGVtcycpO1xuICAgIH1cblxuICAgIC8vIExldHMgcGFyc2UgYXJndW1lbnRzXG4gICAgY29uc3QgYXJnc09iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcmdzT2JqW2Ake2l9YF0gPSBhcmdzW2ldO1xuICAgIH1cblxuICAgIC8vIEZpbmFsbHkgY2hlY2sgdGhlIHJlc3VsdHNcbiAgICBjb25zdCB2YWxpZCA9IHNjaGVtYShhcmdzT2JqKTtcblxuICAgIC8vIENoZWNrIGZvciBlcnJvcnNcbiAgICByZXR1cm4gIXZhbGlkICYmIHNjaGVtYS5lcnJvcnM7XG59O1xuXG4vKipcbiAqIENvbXBpbGVzIHNjaGVtYVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgY29tcGlsZVNjaGVtYSA9IChzY2hlbWEpID0+IHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2hlbWEgc2hvdWxkIGJlIGFuIG9iamVjdCB0byBjb21waWxlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZW5mb3JjZWRTY2hlbWEgPSBtZXJnZShjbG9uZShERUZBVUxUX1NDSEVNQSksIHNjaGVtYSk7XG4gICAgcmV0dXJuIGFqdi5jb21waWxlKGVuZm9yY2VkU2NoZW1hKTtcbn07XG5cbi8qKlxuICogR2V0cyBhIHNjaGVtYSBvYmplY3RcbiAqIEBwYXJhbSAge2FycmF5fG9iamVjdH0gaXRlbXNcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuY29uc3QgZ2V0U2NoZW1hID0gKGl0ZW1zKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJpZ2h0IHZhbHVlc1xuICAgIC8vIEl0IGRvZXNuJ3QgdXNlIHRoZSB2YWxpZGF0ZSBzY2hlbWEgYmVjYXVzZSBpdFxuICAgIC8vIHRha2VzIGEgc3BlZWQgdG9sbCB3aXRob3V0IGFuIGFjdHVhbCBuZWVkIGZvclxuICAgIGlmICh0eXBlb2YgaXRlbXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlbXMgc2hvdWxkIGJlIGFuIGFycmF5IHdpdGggc2NoZW1hIGl0ZW1zIG9yIGEgc2NoZW1hIG9iamVjdCcpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShpdGVtcykgJiYgIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZW1zIHNob3VsZCBoYXZlIG1vcmUgdGhhbiAwIGl0ZW1zJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpdGVtcy5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgfHwgIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hID0geyBwcm9wZXJ0aWVzOiB7fSB9O1xuICAgIGNvbnN0IHJlcXVpcmVkID0gW107XG5cbiAgICAvLyBMZXRzIHBhcnNlIGFsbCBpdGVtc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuXG4gICAgICAgIC8vIExldHMgY2FjaGUgcmVxdWlyZWQuIE5vdCBqc29uIHNjaGVtYSB2YWxpZFxuICAgICAgICBpdGVtLnJlcXVpcmVkICYmIHJlcXVpcmVkLnB1c2goYCR7aX1gKTtcblxuICAgICAgICAvLyBBbHdheXMgZm9yY2UgdG8gZGVsZXRlIGl0XG4gICAgICAgIGRlbGV0ZSBpdGVtLnJlcXVpcmVkO1xuXG4gICAgICAgIC8vIFNldCBvbiB0aGUgc2NoZW1hXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2Ake2l9YF0gPSBpdGVtO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGFyZSByZXF1aXJlZHNcbiAgICBpZiAocmVxdWlyZWQubGVuZ3RoKSB7IHNjaGVtYS5yZXF1aXJlZCA9IHJlcXVpcmVkOyB9XG5cbiAgICAvLyBDaGVjayBmb3IgZXJyb3JzXG4gICAgcmV0dXJuIHNjaGVtYTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICogQHBhcmFtICB7YXJyYXl9IGl0ZW1zXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSAge2FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHZhbGlkYXRlID0gKGl0ZW1zLCBmbiwgLi4uYXJncykgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzbnRWYWxpZCA9IHZhbGlkYXRlU2NoZW1hKGNvbXBpbGVTY2hlbWEoZ2V0U2NoZW1hKGl0ZW1zKSksIGFyZ3MpO1xuICAgICAgICBpZiAoaXNudFZhbGlkKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby10aHJvdy1saXRlcmFsICovXG4gICAgICAgICAgICB0aHJvdyB7IG5hbWU6ICdFcnJvcicsIG1lc3NhZ2U6ICdXcm9uZyBkYXRhIGluIHRlc3QhJywgZGF0YTogaXNudFZhbGlkIH07XG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdGhyb3ctbGl0ZXJhbCAqL1xuICAgICAgICB0aHJvdyB7IG5hbWU6ICdFcnJvcicsIG1lc3NhZ2U6ICdXcm9uZyBkYXRhIGluIHZhbGlkYXRlIGZ1bmN0aW9uJywgZGF0YTogZXJyIH07XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICB9XG5cbiAgICAvLyBMZXRzIHJ1biB0aGUgZnVuY3Rpb24gbm93IG9yIGp1c3QgcmV0dXJuIHRoZSBkYXRhXG4gICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBmbiguLi5hcmdzKSB8fCBhcmdzO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgeyB2YWxpZGF0ZSwgdmFsaWRhdGVTY2hlbWEsIGNvbXBpbGVTY2hlbWEsIGdldFNjaGVtYSB9O1xuXG4vLyBKdXN0IGZvciB0ZXN0cy4uLiBXZSB3aWxsIGdldCByaWQgb2YgdGhpcyBvbiB0aGUgYnVpbGQgcHJvY2Vzc1xuZXhwb3J0IGNvbnN0IF9fdGVzdF9fID0geyB2YWxpZGF0ZSwgY29tcGlsZVNjaGVtYSwgdmFsaWRhdGVTY2hlbWEsIGdldFNjaGVtYSB9O1xuIl19