'use strict';
/* global describe it */

import { expect } from 'chai';
import { getPwd } from '../path.js';

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('path', () => {
    // getPwd
    describe('getPwd', () => {
        it('should get absolute path of string', () => {
            const result = getPwd('foo');

            expect(result).to.be.a('string');
            expect(result).to.contain('foo');
            expect(result[0]).to.equal('/');
        });

        it('should get absolute path of array', () => {
            const result = getPwd(['foo', '/bar']);

            expect(result).to.be.an('array');
            expect(result).to.have.length(2);
            expect(result[0]).to.contain('foo');
            expect(result[0][0]).to.equal('/');
            expect(result[1]).to.equal('/bar');
        });

        it('should return if already absolute', () => {
            const result = getPwd('/bar');

            expect(result).to.be.a('string');
            expect(result).to.equal('/bar');
        });

        it('should return if url', () => {
            const urls = ['http://www.google.com', 'http://google.com'];
            let result;

            urls.forEach((url) => {
                result = getPwd(url);

                expect(result).to.be.a('string');
                expect(result).to.equal(url);
            });
        });
    });
});
