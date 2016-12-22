'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validate = require('./validate.js');

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
    (0, _validate.validate)([{ title: 'pathSrc', type: 'string', minLength: 1, required: true }, { title: 'dirname', type: 'string', minLength: 1, required: false }], null, pathSrc, dirname);

    var filename = !!dirname ? _path2.default.join(dirname, pathSrc) : _path2.default.resolve(pathSrc);
    return !_fs2.default.existsSync(filename) ? '' : _fs2.default.readFileSync(filename, 'utf8');
};
exports.readFile = readFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLmpzIl0sIm5hbWVzIjpbInJlYWRGaWxlIiwicGF0aFNyYyIsImRpcm5hbWUiLCJ0aXRsZSIsInR5cGUiLCJtaW5MZW5ndGgiLCJyZXF1aXJlZCIsImZpbGVuYW1lIiwiam9pbiIsInJlc29sdmUiLCJleGlzdHNTeW5jIiwicmVhZEZpbGVTeW5jIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBO0FBQ0E7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBc0I7QUFDbkMsNEJBQVMsQ0FDTCxFQUFFQyxPQUFPLFNBQVQsRUFBb0JDLE1BQU0sUUFBMUIsRUFBb0NDLFdBQVcsQ0FBL0MsRUFBa0RDLFVBQVUsSUFBNUQsRUFESyxFQUVMLEVBQUVILE9BQU8sU0FBVCxFQUFvQkMsTUFBTSxRQUExQixFQUFvQ0MsV0FBVyxDQUEvQyxFQUFrREMsVUFBVSxLQUE1RCxFQUZLLENBQVQsRUFHRyxJQUhILEVBR1NMLE9BSFQsRUFHa0JDLE9BSGxCOztBQUtBLFFBQU1LLFdBQVcsQ0FBQyxDQUFDTCxPQUFGLEdBQVksZUFBS00sSUFBTCxDQUFVTixPQUFWLEVBQW1CRCxPQUFuQixDQUFaLEdBQTBDLGVBQUtRLE9BQUwsQ0FBYVIsT0FBYixDQUEzRDtBQUNBLFdBQU8sQ0FBQyxhQUFHUyxVQUFILENBQWNILFFBQWQsQ0FBRCxHQUEyQixFQUEzQixHQUFnQyxhQUFHSSxZQUFILENBQWdCSixRQUFoQixFQUEwQixNQUExQixDQUF2QztBQUNILENBUkQ7UUFTU1AsUSxHQUFBQSxRIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBSZXR1cm5zIGZpbGUgaW4gcmF3IG1vZGVcbiAqIEBwYXJhbSAge3N0cmluZ30gcGF0aFNyY1xuICogQHBhcmFtICB7c3RyaW5nfSBkaXJuYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHJlYWRGaWxlID0gKHBhdGhTcmMsIGRpcm5hbWUpID0+IHtcbiAgICB2YWxpZGF0ZShbXG4gICAgICAgIHsgdGl0bGU6ICdwYXRoU3JjJywgdHlwZTogJ3N0cmluZycsIG1pbkxlbmd0aDogMSwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgeyB0aXRsZTogJ2Rpcm5hbWUnLCB0eXBlOiAnc3RyaW5nJywgbWluTGVuZ3RoOiAxLCByZXF1aXJlZDogZmFsc2UgfVxuICAgIF0sIG51bGwsIHBhdGhTcmMsIGRpcm5hbWUpO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSAhIWRpcm5hbWUgPyBwYXRoLmpvaW4oZGlybmFtZSwgcGF0aFNyYykgOiBwYXRoLnJlc29sdmUocGF0aFNyYyk7XG4gICAgcmV0dXJuICFmcy5leGlzdHNTeW5jKGZpbGVuYW1lKSA/ICcnIDogZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpO1xufTtcbmV4cG9ydCB7IHJlYWRGaWxlIH07XG4iXX0=