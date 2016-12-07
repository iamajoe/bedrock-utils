/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('./string.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('string', function () {
    // normalize
    describe('normalize', function () {
        it('should return a string', function () {
            var result = utils.normalize('foo');

            expect(result).to.be.a('string');
            expect(result).to.equal('foo');
        });

        it('should return empty if no string', function () {
            var result = utils.normalize();

            expect(result).to.be.a('string');
            expect(result).to.equal('');
        });

        it('should normalize string', function () {
            ['foo ', ' foo', ' foo '].forEach(function (val) {
                var result = utils.normalize(val);

                expect(result).to.be.a('string');
                expect(result).to.equal('foo');
            });
        });
    });

    // dashize
    describe('dashize', function () {
        it('should return a string', function () {
            var result = utils.dashize('foo');

            expect(result).to.be.a('string');
            expect(result).to.equal('foo');
        });

        it('should return empty if no string', function () {
            var result = utils.dashize();

            expect(result).to.be.a('string');
            expect(result).to.equal('');
        });

        it('should dashize string', function () {
            ['foo_bar foobar foo', 'foo_bar-foobar Foo'].forEach(function (val) {
                var result = utils.dashize(val);

                expect(result).to.be.a('string');
                expect(result).to.equal('foo_bar-foobar-foo');
            });
        });
    });

    // camelcase
    describe('camelcase', function () {
        // string.camelcase('foo_bar-foobar Foo'); // will return "fooBarFoobarFoo"
        it('should return a string', function () {
            var result = utils.camelcase('foo');

            expect(result).to.be.a('string');
            expect(result).to.equal('foo');
        });

        it('should return empty if no string', function () {
            var result = utils.camelcase();

            expect(result).to.be.a('string');
            expect(result).to.equal('');
        });

        it('should camelcase string', function () {
            ['foo_bar foobar foo', 'foo_bar-foobar Foo'].forEach(function (val) {
                var result = utils.camelcase(val);

                expect(result).to.be.a('string');
                expect(result).to.equal('fooBarFoobarFoo');
            });
        });
    });
});
