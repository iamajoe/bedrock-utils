/* :: import type {ReadFile} from "./_test/file.flow.js" */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
var readFile /* :: :ReadFile */ = function readFile(pathSrc, dirname) {
  var filename = !!dirname ? _path2.default.join(dirname, pathSrc) : _path2.default.resolve(pathSrc);
  return !_fs2.default.existsSync(filename) ? '' : _fs2.default.readFileSync(filename, 'utf8');
};

// ------------------------------------
// Export

exports.default = { readFile: readFile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLmpzIl0sIm5hbWVzIjpbInJlYWRGaWxlIiwicGF0aFNyYyIsImRpcm5hbWUiLCJmaWxlbmFtZSIsImpvaW4iLCJyZXNvbHZlIiwiZXhpc3RzU3luYyIsInJlYWRGaWxlU3luYyJdLCJtYXBwaW5ncyI6IkFBQVc7QUFDWDs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7O0FBTUEsSUFBTUEsU0FBUSxrQkFBUixHQUE2QixTQUE3QkEsUUFBNkIsQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0FBQ3JELE1BQU1DLFdBQVcsQ0FBQyxDQUFDRCxPQUFGLEdBQVksZUFBS0UsSUFBTCxDQUFVRixPQUFWLEVBQW1CRCxPQUFuQixDQUFaLEdBQTBDLGVBQUtJLE9BQUwsQ0FBYUosT0FBYixDQUEzRDtBQUNBLFNBQU8sQ0FBQyxhQUFHSyxVQUFILENBQWNILFFBQWQsQ0FBRCxHQUEyQixFQUEzQixHQUFnQyxhQUFHSSxZQUFILENBQWdCSixRQUFoQixFQUEwQixNQUExQixDQUF2QztBQUNILENBSEQ7O0FBS0E7QUFDQTs7a0JBRWUsRUFBRUgsa0JBQUYsRSIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi8vKiA6OiBpbXBvcnQgdHlwZSB7UmVhZEZpbGV9IGZyb20gXCIuL190ZXN0L2ZpbGUuZmxvdy5qc1wiICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFJldHVybnMgZmlsZSBpbiByYXcgbW9kZVxuICogQHBhcmFtICB7c3RyaW5nfSBwYXRoU3JjXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRpcm5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3QgcmVhZEZpbGUvKiA6OiA6UmVhZEZpbGUgKi8gPSAocGF0aFNyYywgZGlybmFtZSkgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gISFkaXJuYW1lID8gcGF0aC5qb2luKGRpcm5hbWUsIHBhdGhTcmMpIDogcGF0aC5yZXNvbHZlKHBhdGhTcmMpO1xuICAgIHJldHVybiAhZnMuZXhpc3RzU3luYyhmaWxlbmFtZSkgPyAnJyA6IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCBkZWZhdWx0IHsgcmVhZEZpbGUgfTtcbiJdfQ==