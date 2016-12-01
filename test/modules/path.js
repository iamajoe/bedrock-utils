/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('../../src/path.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('path', function () {
    // isUrl
    describe('isUrl', function () {
        it('should be true', function () {
            var urls = [
                'http://www.google.com',
                'http://google.com',
                'https://www.google.com',
                'https://google.com'
            ];
            var result;

            urls.forEach(function (url) {
                result = utils.isUrl(url);

                expect(result).to.be.a('boolean');
                expect(result).to.equal(true);
            });
        });

        it('shouldn\'t be true', function () {
            var urls = [
                'www.google.com',
                'google.com',
                '/www.google.com',
                '/google.com',
                '/bar'
            ];
            var result;

            urls.forEach(function (url) {
                result = utils.isUrl(url);

                expect(result).to.be.a('boolean');
                expect(result).to.equal(false);
            });
        });
    });
});
