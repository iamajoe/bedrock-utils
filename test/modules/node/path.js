/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('../../../src/node/path.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('node/path', function () {
    // getPwd
    describe('getPwd', function () {
        it('should get absolute path of string', function () {
            var result = utils.getPwd('foo');

            expect(result).to.be.a('string');
            expect(result).to.contain('foo');
            expect(result[0]).to.equal('/');
        });

        it('should get absolute path of array', function () {
            var result = utils.getPwd(['foo', '/bar']);

            expect(result).to.be.an('array');
            expect(result).to.have.length(2);
            expect(result[0]).to.contain('foo');
            expect(result[0][0]).to.equal('/');
            expect(result[1]).to.equal('/bar');
        });

        it('should return if already absolute', function () {
            var result = utils.getPwd('/bar');

            expect(result).to.be.a('string');
            expect(result).to.equal('/bar');
        });

        it('should return if url', function () {
            var urls = ['http://www.google.com', 'http://google.com'];
            var result;

            urls.forEach(function (url) {
                result = utils.getPwd(url);

                expect(result).to.be.a('string');
                expect(result).to.equal(url);
            });
        });
    });
});
