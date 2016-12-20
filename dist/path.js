/* :: import type {IsUrl, GetPwd} from "./_test/path.flow.js" */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
var isUrl /* :: :IsUrl */ = function isUrl(url) {
    return !!/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);
};

/**
 * Gets pwd path
 * @param  {string|array} src
 * @return {string|array}
 */
var getPwd /* :: :GetPwd */ = function getPwd(src) {
    var newSrc = src;

    if (src && typeof src === 'string') {
        if (isUrl(src)) {
            return src;
        }

        var pwd = process.env.PWD;
        if (pwd === undefined || pwd === null || typeof pwd !== 'string') {
            return src;
        }

        newSrc = src[0] !== '/' ? _path2.default.join(pwd, src) : src;
    } else if (src && (0, _isArray2.default)(src) /* :: && Array.isArray(src) */) {
            newSrc = src.map(function (val) {
                return getPwd(val);
            });
        }

    return newSrc;
};

// ------------------------------------
// Export

exports.default = { isUrl: isUrl, getPwd: getPwd };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRoLmpzIl0sIm5hbWVzIjpbImlzVXJsIiwidXJsIiwidGVzdCIsImdldFB3ZCIsInNyYyIsIm5ld1NyYyIsInB3ZCIsInByb2Nlc3MiLCJlbnYiLCJQV0QiLCJ1bmRlZmluZWQiLCJqb2luIiwibWFwIiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBVztBQUNYOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxNQUFLLGVBQUwsR0FBdUIsU0FBdkJBLEtBQXVCLENBQUNDLEdBQUQ7QUFBQSxXQUFTLENBQUMsQ0FBRSw4RUFBOEVDLElBQTlFLENBQW1GRCxHQUFuRixDQUFaO0FBQUEsQ0FBN0I7O0FBRUE7Ozs7O0FBS0EsSUFBTUUsT0FBTSxnQkFBTixHQUF5QixTQUF6QkEsTUFBeUIsQ0FBQ0MsR0FBRCxFQUFTO0FBQ3BDLFFBQUlDLFNBQVNELEdBQWI7O0FBRUEsUUFBSUEsT0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBMUIsRUFBb0M7QUFDaEMsWUFBSUosTUFBTUksR0FBTixDQUFKLEVBQWdCO0FBQUUsbUJBQU9BLEdBQVA7QUFBYTs7QUFFL0IsWUFBTUUsTUFBTUMsUUFBUUMsR0FBUixDQUFZQyxHQUF4QjtBQUNBLFlBQUlILFFBQVFJLFNBQVIsSUFBcUJKLFFBQVEsSUFBN0IsSUFBcUMsT0FBT0EsR0FBUCxLQUFlLFFBQXhELEVBQWtFO0FBQzlELG1CQUFPRixHQUFQO0FBQ0g7O0FBRURDLGlCQUFVRCxJQUFJLENBQUosTUFBVyxHQUFaLEdBQW1CLGVBQUtPLElBQUwsQ0FBVUwsR0FBVixFQUFlRixHQUFmLENBQW5CLEdBQXlDQSxHQUFsRDtBQUNILEtBVEQsTUFTTyxJQUFJQSxPQUFPLHVCQUFRQSxHQUFSLENBQVgsQ0FBdUIsOEJBQXZCLEVBQXVEO0FBQzFEQyxxQkFBU0QsSUFBSVEsR0FBSixDQUFRO0FBQUEsdUJBQU9ULE9BQU9VLEdBQVAsQ0FBUDtBQUFBLGFBQVIsQ0FBVDtBQUNIOztBQUVELFdBQU9SLE1BQVA7QUFDSCxDQWpCRDs7QUFtQkE7QUFDQTs7a0JBRWUsRUFBRUwsWUFBRixFQUFTRyxjQUFULEUiLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovLyogOjogaW1wb3J0IHR5cGUge0lzVXJsLCBHZXRQd2R9IGZyb20gXCIuL190ZXN0L3BhdGguZmxvdy5qc1wiICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2lzQXJyYXkuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogSXMgdXJsXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzVXJsLyogOjogOklzVXJsICovID0gKHVybCkgPT4gISEoLyhodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdyopPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlIVxcLVxcL10pKT8vLnRlc3QodXJsKSk7XG5cbi8qKlxuICogR2V0cyBwd2QgcGF0aFxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBzcmNcbiAqIEByZXR1cm4ge3N0cmluZ3xhcnJheX1cbiAqL1xuY29uc3QgZ2V0UHdkLyogOjogOkdldFB3ZCAqLyA9IChzcmMpID0+IHtcbiAgICBsZXQgbmV3U3JjID0gc3JjO1xuXG4gICAgaWYgKHNyYyAmJiB0eXBlb2Ygc3JjID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoaXNVcmwoc3JjKSkgeyByZXR1cm4gc3JjOyB9XG5cbiAgICAgICAgY29uc3QgcHdkID0gcHJvY2Vzcy5lbnYuUFdEO1xuICAgICAgICBpZiAocHdkID09PSB1bmRlZmluZWQgfHwgcHdkID09PSBudWxsIHx8IHR5cGVvZiBwd2QgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc3JjO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3U3JjID0gKHNyY1swXSAhPT0gJy8nKSA/IHBhdGguam9pbihwd2QsIHNyYykgOiBzcmM7XG4gICAgfSBlbHNlIGlmIChzcmMgJiYgaXNBcnJheShzcmMpLyogOjogJiYgQXJyYXkuaXNBcnJheShzcmMpICovKSB7XG4gICAgICAgIG5ld1NyYyA9IHNyYy5tYXAodmFsID0+IGdldFB3ZCh2YWwpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U3JjO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IGRlZmF1bHQgeyBpc1VybCwgZ2V0UHdkIH07XG4iXX0=