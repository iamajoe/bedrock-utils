'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPwd = exports.isUrl = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isArray = require('lodash/isArray.js');

var _isArray2 = _interopRequireDefault(_isArray);

var _validate = require('./validate.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -----------------------------------------
// Functions

/**
 * Is url
 *
 * @param {string} url
 * @returns {boolean}
 */
var isUrl = function isUrl(url) {
    (0, _validate.validate)([{ title: 'url', type: 'string' }], null, url);
    return !!/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);
};
exports.isUrl = isUrl;

/**
 * Gets pwd path
 * @param  {string|array} src
 * @return {string|array}
 */

var getPwd = function getPwd(src) {
    (0, _validate.validate)([{ title: 'src', anyOf: [{ type: 'string', minLength: 1 }, { type: 'array', items: { type: 'string' } }] }], null, src);

    var newSrc = src;

    if (!src) {
        return src;
    }

    if (typeof src === 'string') {
        if (isUrl(src)) {
            return src;
        }

        var pwd = process.env.PWD;
        if (pwd === undefined || pwd === null || typeof pwd !== 'string') {
            return src;
        }

        newSrc = src[0] !== '/' ? _path2.default.join(pwd, src) : src;
    } else if ((0, _isArray2.default)(src)) {
        newSrc = src.map(function (val) {
            return getPwd(val);
        });
    }

    return newSrc;
};
exports.getPwd = getPwd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRoLmpzIl0sIm5hbWVzIjpbImlzVXJsIiwidXJsIiwidGl0bGUiLCJ0eXBlIiwidGVzdCIsImdldFB3ZCIsInNyYyIsImFueU9mIiwibWluTGVuZ3RoIiwiaXRlbXMiLCJuZXdTcmMiLCJwd2QiLCJwcm9jZXNzIiwiZW52IiwiUFdEIiwidW5kZWZpbmVkIiwiam9pbiIsIm1hcCIsInZhbCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVEsQ0FBQ0MsR0FBRCxFQUFTO0FBQ25CLDRCQUFTLENBQUMsRUFBRUMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLFFBQXRCLEVBQUQsQ0FBVCxFQUE2QyxJQUE3QyxFQUFtREYsR0FBbkQ7QUFDQSxXQUFPLENBQUMsQ0FBRSw4RUFBOEVHLElBQTlFLENBQW1GSCxHQUFuRixDQUFWO0FBQ0gsQ0FIRDtRQUlTRCxLLEdBQUFBLEs7O0FBRVQ7Ozs7OztBQUtBLElBQU1LLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxHQUFELEVBQVM7QUFDcEIsNEJBQVMsQ0FDTCxFQUFFSixPQUFPLEtBQVQsRUFBZ0JLLE9BQU8sQ0FDbkIsRUFBRUosTUFBTSxRQUFSLEVBQWtCSyxXQUFXLENBQTdCLEVBRG1CLEVBRW5CLEVBQUVMLE1BQU0sT0FBUixFQUFpQk0sT0FBTyxFQUFFTixNQUFNLFFBQVIsRUFBeEIsRUFGbUIsQ0FBdkIsRUFESyxDQUFULEVBS0csSUFMSCxFQUtTRyxHQUxUOztBQU9BLFFBQUlJLFNBQVNKLEdBQWI7O0FBRUEsUUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDTixlQUFPQSxHQUFQO0FBQ0g7O0FBRUQsUUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDekIsWUFBSU4sTUFBTU0sR0FBTixDQUFKLEVBQWdCO0FBQUUsbUJBQU9BLEdBQVA7QUFBYTs7QUFFL0IsWUFBTUssTUFBTUMsUUFBUUMsR0FBUixDQUFZQyxHQUF4QjtBQUNBLFlBQUlILFFBQVFJLFNBQVIsSUFBcUJKLFFBQVEsSUFBN0IsSUFBcUMsT0FBT0EsR0FBUCxLQUFlLFFBQXhELEVBQWtFO0FBQzlELG1CQUFPTCxHQUFQO0FBQ0g7O0FBRURJLGlCQUFVSixJQUFJLENBQUosTUFBVyxHQUFaLEdBQW1CLGVBQUtVLElBQUwsQ0FBVUwsR0FBVixFQUFlTCxHQUFmLENBQW5CLEdBQXlDQSxHQUFsRDtBQUNILEtBVEQsTUFTTyxJQUFJLHVCQUFRQSxHQUFSLENBQUosRUFBa0I7QUFDckJJLGlCQUFTSixJQUFJVyxHQUFKLENBQVE7QUFBQSxtQkFBT1osT0FBT2EsR0FBUCxDQUFQO0FBQUEsU0FBUixDQUFUO0FBQ0g7O0FBRUQsV0FBT1IsTUFBUDtBQUNILENBNUJEO1FBNkJTTCxNLEdBQUFBLE0iLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheS5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogSXMgdXJsXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzVXJsID0gKHVybCkgPT4ge1xuICAgIHZhbGlkYXRlKFt7IHRpdGxlOiAndXJsJywgdHlwZTogJ3N0cmluZycgfV0sIG51bGwsIHVybCk7XG4gICAgcmV0dXJuICEhKC8oaHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJSFcXC1cXC9dKSk/Ly50ZXN0KHVybCkpO1xufTtcbmV4cG9ydCB7IGlzVXJsIH07XG5cbi8qKlxuICogR2V0cyBwd2QgcGF0aFxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBzcmNcbiAqIEByZXR1cm4ge3N0cmluZ3xhcnJheX1cbiAqL1xuY29uc3QgZ2V0UHdkID0gKHNyYykgPT4ge1xuICAgIHZhbGlkYXRlKFtcbiAgICAgICAgeyB0aXRsZTogJ3NyYycsIGFueU9mOiBbXG4gICAgICAgICAgICB7IHR5cGU6ICdzdHJpbmcnLCBtaW5MZW5ndGg6IDEgfSxcbiAgICAgICAgICAgIHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IHsgdHlwZTogJ3N0cmluZycgfSB9XG4gICAgICAgIF0gfVxuICAgIF0sIG51bGwsIHNyYyk7XG5cbiAgICBsZXQgbmV3U3JjID0gc3JjO1xuXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgICAgcmV0dXJuIHNyYztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNyYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGlzVXJsKHNyYykpIHsgcmV0dXJuIHNyYzsgfVxuXG4gICAgICAgIGNvbnN0IHB3ZCA9IHByb2Nlc3MuZW52LlBXRDtcbiAgICAgICAgaWYgKHB3ZCA9PT0gdW5kZWZpbmVkIHx8IHB3ZCA9PT0gbnVsbCB8fCB0eXBlb2YgcHdkICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHNyYztcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1NyYyA9IChzcmNbMF0gIT09ICcvJykgPyBwYXRoLmpvaW4ocHdkLCBzcmMpIDogc3JjO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShzcmMpKSB7XG4gICAgICAgIG5ld1NyYyA9IHNyYy5tYXAodmFsID0+IGdldFB3ZCh2YWwpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U3JjO1xufTtcbmV4cG9ydCB7IGdldFB3ZCB9O1xuIl19