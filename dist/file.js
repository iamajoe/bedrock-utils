'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -----------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @param  {string} dirname
 * @return {string}
 */
var readFile = function readFile(pathSrc, dirname) {

    var filename = !!dirname ? _path2.default.join(dirname, pathSrc) : _path2.default.resolve(pathSrc);
    return !_fs2.default.existsSync(filename) ? '' : _fs2.default.readFileSync(filename, 'utf8');
};
exports.readFile = readFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLmpzIl0sIm5hbWVzIjpbInJlYWRGaWxlIiwicGF0aFNyYyIsImRpcm5hbWUiLCJmaWxlbmFtZSIsImpvaW4iLCJyZXNvbHZlIiwiZXhpc3RzU3luYyIsInJlYWRGaWxlU3luYyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFHQTtBQUNBOztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQXNCOztBQU1uQyxRQUFNQyxXQUFXLENBQUMsQ0FBQ0QsT0FBRixHQUFZLGVBQUtFLElBQUwsQ0FBVUYsT0FBVixFQUFtQkQsT0FBbkIsQ0FBWixHQUEwQyxlQUFLSSxPQUFMLENBQWFKLE9BQWIsQ0FBM0Q7QUFDQSxXQUFPLENBQUMsYUFBR0ssVUFBSCxDQUFjSCxRQUFkLENBQUQsR0FBMkIsRUFBM0IsR0FBZ0MsYUFBR0ksWUFBSCxDQUFnQkosUUFBaEIsRUFBMEIsTUFBMUIsQ0FBdkM7QUFDSCxDQVJEO1FBU1NILFEsR0FBQUEsUSIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogUmV0dXJucyBmaWxlIGluIHJhdyBtb2RlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHBhdGhTcmNcbiAqIEBwYXJhbSAge3N0cmluZ30gZGlybmFtZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCByZWFkRmlsZSA9IChwYXRoU3JjLCBkaXJuYW1lKSA9PiB7XG4gICAgdmFsaWRhdGUoW1xuICAgICAgICB7IHRpdGxlOiAncGF0aFNyYycsIHR5cGU6ICdzdHJpbmcnLCBtaW5MZW5ndGg6IDEsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIHsgdGl0bGU6ICdkaXJuYW1lJywgdHlwZTogJ3N0cmluZycsIG1pbkxlbmd0aDogMSwgcmVxdWlyZWQ6IGZhbHNlIH1cbiAgICBdLCBudWxsLCBwYXRoU3JjLCBkaXJuYW1lKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gISFkaXJuYW1lID8gcGF0aC5qb2luKGRpcm5hbWUsIHBhdGhTcmMpIDogcGF0aC5yZXNvbHZlKHBhdGhTcmMpO1xuICAgIHJldHVybiAhZnMuZXhpc3RzU3luYyhmaWxlbmFtZSkgPyAnJyA6IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKTtcbn07XG5leHBvcnQgeyByZWFkRmlsZSB9O1xuIl19