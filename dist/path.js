'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPwd = exports.isUrl = undefined;

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
exports.isUrl = isUrl;

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
exports.getPwd = getPwd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRoLmpzIl0sIm5hbWVzIjpbImlzVXJsIiwidXJsIiwidGVzdCIsImdldFB3ZCIsInNyYyIsIm5ld1NyYyIsInB3ZCIsInByb2Nlc3MiLCJlbnYiLCJQV0QiLCJ1bmRlZmluZWQiLCJqb2luIiwibWFwIiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUdBO0FBQ0E7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxHQUFELEVBQVM7QUFFbkIsV0FBTyxDQUFDLENBQUUsOEVBQThFQyxJQUE5RSxDQUFtRkQsR0FBbkYsQ0FBVjtBQUNILENBSEQ7UUFJU0QsSyxHQUFBQSxLOztBQUVUOzs7Ozs7QUFLQSxJQUFNRyxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsR0FBRCxFQUFTOztBQVFwQixRQUFJQyxTQUFTRCxHQUFiOztBQUVBLFFBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ04sZUFBT0EsR0FBUDtBQUNIOztBQUVELFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQ3pCLFlBQUlKLE1BQU1JLEdBQU4sQ0FBSixFQUFnQjtBQUFFLG1CQUFPQSxHQUFQO0FBQWE7O0FBRS9CLFlBQU1FLE1BQU1DLFFBQVFDLEdBQVIsQ0FBWUMsR0FBeEI7QUFDQSxZQUFJSCxRQUFRSSxTQUFSLElBQXFCSixRQUFRLElBQTdCLElBQXFDLE9BQU9BLEdBQVAsS0FBZSxRQUF4RCxFQUFrRTtBQUM5RCxtQkFBT0YsR0FBUDtBQUNIOztBQUVEQyxpQkFBVUQsSUFBSSxDQUFKLE1BQVcsR0FBWixHQUFtQixlQUFLTyxJQUFMLENBQVVMLEdBQVYsRUFBZUYsR0FBZixDQUFuQixHQUF5Q0EsR0FBbEQ7QUFDSCxLQVRELE1BU08sSUFBSSx1QkFBUUEsR0FBUixDQUFKLEVBQWtCO0FBQ3JCQyxpQkFBU0QsSUFBSVEsR0FBSixDQUFRO0FBQUEsbUJBQU9ULE9BQU9VLEdBQVAsQ0FBUDtBQUFBLFNBQVIsQ0FBVDtBQUNIOztBQUVELFdBQU9SLE1BQVA7QUFDSCxDQTVCRDtRQTZCU0YsTSxHQUFBQSxNIiwiZmlsZSI6InBhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2lzQXJyYXkuanMnO1xuaW1wb3J0IHsgdmFsaWRhdGUgfSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIElzIHVybFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1VybCA9ICh1cmwpID0+IHtcbiAgICB2YWxpZGF0ZShbeyB0aXRsZTogJ3VybCcsIHR5cGU6ICdzdHJpbmcnIH1dLCBudWxsLCB1cmwpO1xuICAgIHJldHVybiAhISgvKGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3Kik/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiUhXFwtXFwvXSkpPy8udGVzdCh1cmwpKTtcbn07XG5leHBvcnQgeyBpc1VybCB9O1xuXG4vKipcbiAqIEdldHMgcHdkIHBhdGhcbiAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gc3JjXG4gKiBAcmV0dXJuIHtzdHJpbmd8YXJyYXl9XG4gKi9cbmNvbnN0IGdldFB3ZCA9IChzcmMpID0+IHtcbiAgICB2YWxpZGF0ZShbXG4gICAgICAgIHsgdGl0bGU6ICdzcmMnLCBhbnlPZjogW1xuICAgICAgICAgICAgeyB0eXBlOiAnc3RyaW5nJywgbWluTGVuZ3RoOiAxIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiB7IHR5cGU6ICdzdHJpbmcnIH0gfVxuICAgICAgICBdIH1cbiAgICBdLCBudWxsLCBzcmMpO1xuXG4gICAgbGV0IG5ld1NyYyA9IHNyYztcblxuICAgIGlmICghc3JjKSB7XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzcmMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChpc1VybChzcmMpKSB7IHJldHVybiBzcmM7IH1cblxuICAgICAgICBjb25zdCBwd2QgPSBwcm9jZXNzLmVudi5QV0Q7XG4gICAgICAgIGlmIChwd2QgPT09IHVuZGVmaW5lZCB8fCBwd2QgPT09IG51bGwgfHwgdHlwZW9mIHB3ZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBzcmM7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdTcmMgPSAoc3JjWzBdICE9PSAnLycpID8gcGF0aC5qb2luKHB3ZCwgc3JjKSA6IHNyYztcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoc3JjKSkge1xuICAgICAgICBuZXdTcmMgPSBzcmMubWFwKHZhbCA9PiBnZXRQd2QodmFsKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NyYztcbn07XG5leHBvcnQgeyBnZXRQd2QgfTtcbiJdfQ==