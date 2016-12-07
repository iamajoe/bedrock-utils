/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('./file.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('node/file', function () {
    // readFile
    describe('readFile', function () {
        it('should load file', function () {
            var result = utils.readFile('../../test/data/config.json', __dirname);

            expect(result).to.be.a('string');

            result = JSON.parse(result);
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['foo', 'data']);
            expect(result.data).to.be.an('array');
        });

        it('should be false if file doesn\'t exit', function () {
            var result = utils.readFile('/bar');

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });
});
