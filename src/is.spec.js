/* eslint-disable strict */'use strict';/* eslint-enable */
/* global describe it */

var expect = require('chai').expect;
var utils = require('./is.js');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('is', function () {
    // node
    describe('node', function () {
        it('should return true', function () {
            var result = utils.node();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        });

        it.skip('shouldn\'t return true', function () {
            // TODO: Stubs?
        });
    });

    // browser
    describe('browser', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.browser();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });

    // ie
    describe('ie', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.ie();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });

    // edge
    describe('edge', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.edge();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });

    // mobile
    describe('mobile', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.mobile();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });

    // touch
    describe('touch', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.mobile();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });

    // media
    describe('media', function () {
        it.skip('should return true', function () {
            // TODO: Stubs?
        });

        it('shouldn\'t return true', function () {
            var result = utils.media();

            expect(result).to.be.a('boolean');
            expect(result).to.equal(false);
        });
    });
});
