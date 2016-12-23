'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUrl = exports.getPwd = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isArray = require('lodash/isArray.js');

var _isArray2 = _interopRequireDefault(_isArray);

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
    return !!/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);
};

/**
 * Gets pwd path
 * @param  {string|array} src
 * @return {string|array}
 */
var getPwd = function getPwd(src) {

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

// -----------------------------------------
// Export

exports.getPwd = getPwd;
exports.isUrl = isUrl;

// Just for tests... We will get rid of this on the build process
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRoLmpzIl0sIm5hbWVzIjpbImlzVXJsIiwidXJsIiwidGVzdCIsImdldFB3ZCIsInNyYyIsIm5ld1NyYyIsInB3ZCIsInByb2Nlc3MiLCJlbnYiLCJQV0QiLCJ1bmRlZmluZWQiLCJqb2luIiwibWFwIiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUdBO0FBQ0E7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxHQUFELEVBQVM7QUFFbkIsV0FBTyxDQUFDLENBQUUsOEVBQThFQyxJQUE5RSxDQUFtRkQsR0FBbkYsQ0FBVjtBQUNILENBSEQ7O0FBS0E7Ozs7O0FBS0EsSUFBTUUsU0FBUyxTQUFUQSxNQUFTLENBQUNDLEdBQUQsRUFBUzs7QUFRcEIsUUFBSUMsU0FBU0QsR0FBYjs7QUFFQSxRQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNOLGVBQU9BLEdBQVA7QUFDSDs7QUFFRCxRQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6QixZQUFJSixNQUFNSSxHQUFOLENBQUosRUFBZ0I7QUFBRSxtQkFBT0EsR0FBUDtBQUFhOztBQUUvQixZQUFNRSxNQUFNQyxRQUFRQyxHQUFSLENBQVlDLEdBQXhCO0FBQ0EsWUFBSUgsUUFBUUksU0FBUixJQUFxQkosUUFBUSxJQUE3QixJQUFxQyxPQUFPQSxHQUFQLEtBQWUsUUFBeEQsRUFBa0U7QUFDOUQsbUJBQU9GLEdBQVA7QUFDSDs7QUFFREMsaUJBQVVELElBQUksQ0FBSixNQUFXLEdBQVosR0FBbUIsZUFBS08sSUFBTCxDQUFVTCxHQUFWLEVBQWVGLEdBQWYsQ0FBbkIsR0FBeUNBLEdBQWxEO0FBQ0gsS0FURCxNQVNPLElBQUksdUJBQVFBLEdBQVIsQ0FBSixFQUFrQjtBQUNyQkMsaUJBQVNELElBQUlRLEdBQUosQ0FBUTtBQUFBLG1CQUFPVCxPQUFPVSxHQUFQLENBQVA7QUFBQSxTQUFSLENBQVQ7QUFDSDs7QUFFRCxXQUFPUixNQUFQO0FBQ0gsQ0E1QkQ7O0FBOEJBO0FBQ0E7O1FBRVNGLE0sR0FBQUEsTTtRQUNBSCxLLEdBQUFBLEs7O0FBRVQiLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheS5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogSXMgdXJsXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzVXJsID0gKHVybCkgPT4ge1xuICAgIHZhbGlkYXRlKFt7IHRpdGxlOiAndXJsJywgdHlwZTogJ3N0cmluZycgfV0sIG51bGwsIHVybCk7XG4gICAgcmV0dXJuICEhKC8oaHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJSFcXC1cXC9dKSk/Ly50ZXN0KHVybCkpO1xufTtcblxuLyoqXG4gKiBHZXRzIHB3ZCBwYXRoXG4gKiBAcGFyYW0gIHtzdHJpbmd8YXJyYXl9IHNyY1xuICogQHJldHVybiB7c3RyaW5nfGFycmF5fVxuICovXG5jb25zdCBnZXRQd2QgPSAoc3JjKSA9PiB7XG4gICAgdmFsaWRhdGUoW1xuICAgICAgICB7IHRpdGxlOiAnc3JjJywgYW55T2Y6IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ3N0cmluZycsIG1pbkxlbmd0aDogMSB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnYXJyYXknLCBpdGVtczogeyB0eXBlOiAnc3RyaW5nJyB9IH1cbiAgICAgICAgXSB9XG4gICAgXSwgbnVsbCwgc3JjKTtcblxuICAgIGxldCBuZXdTcmMgPSBzcmM7XG5cbiAgICBpZiAoIXNyYykge1xuICAgICAgICByZXR1cm4gc3JjO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc3JjID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoaXNVcmwoc3JjKSkgeyByZXR1cm4gc3JjOyB9XG5cbiAgICAgICAgY29uc3QgcHdkID0gcHJvY2Vzcy5lbnYuUFdEO1xuICAgICAgICBpZiAocHdkID09PSB1bmRlZmluZWQgfHwgcHdkID09PSBudWxsIHx8IHR5cGVvZiBwd2QgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc3JjO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3U3JjID0gKHNyY1swXSAhPT0gJy8nKSA/IHBhdGguam9pbihwd2QsIHNyYykgOiBzcmM7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHNyYykpIHtcbiAgICAgICAgbmV3U3JjID0gc3JjLm1hcCh2YWwgPT4gZ2V0UHdkKHZhbCkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTcmM7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCB7IGdldFB3ZCB9O1xuZXhwb3J0IHsgaXNVcmwgfTtcblxuLy8gSnVzdCBmb3IgdGVzdHMuLi4gV2Ugd2lsbCBnZXQgcmlkIG9mIHRoaXMgb24gdGhlIGJ1aWxkIHByb2Nlc3NcbmV4cG9ydCBjb25zdCBfX3Rlc3RfXyA9IHsgZ2V0UHdkLCBpc1VybCB9O1xuIl19