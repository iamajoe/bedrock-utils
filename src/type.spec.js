/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('./type.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('type', function () {
    // isArray
    describe('isArray', function () {
        it('should return true with an empty array', function () {
            var result = utils.isArray([]);

            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        });

        it('should return true with a full array', function () {
            var result = utils.isArray([1]);

            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        });

        it('shouldn\'t return true with empty', function () {
            var result = utils.isArray();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });

        it('shouldn\'t return true with a string', function () {
            var result = utils.isArray('foo');

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });

        it('shouldn\'t return true with an object', function () {
            var result = utils.isArray({ length: 1 });

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });
});
