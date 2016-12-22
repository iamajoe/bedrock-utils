'use strict';
/* global describe it */

import { expect } from 'chai';
import { validate } from '../validate.js';

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('validate', () => {
    // validate
    describe('validate', () => {
        it('should error without schema', (done) => {
            try {
                validate(null, () => done('It should\'ve errored'), 'simple string');
            } catch (err) {
                done();
            }
        });

        it('should error without data', (done) => {
            try {
                validate([{ title: 'without-data', type: 'string' }], () => done('It should\'ve errored'));
            } catch (err) {
                done();
            }
        });

        it('should validate a simple string', (done) => {
            validate([{ type: 'string' }], (str) => {
                expect(str).to.be.a('string');
                expect(str).to.be.equal('simple string');
                done();
            }, 'simple string');
        });

        it('should validate a simple string without function', () => {
            validate([{ type: 'string' }], null, 'simple string');
        });

        it('should error with a number as string', (done) => {
            try {
                validate([{ type: 'string' }], () => done('It should\'ve errored'), 1);
            } catch (err) {
                done();
            }
        });

        it('should validate two in the arguments', (done) => {
            validate([
                { type: 'string' },
                { type: 'number' }
            ], (str, num) => {
                expect(str).to.be.a('string');
                expect(str).to.be.equal('simple string');
                expect(num).to.be.a('number');
                expect(num).to.be.equal(1);
                done();
            }, 'simple string', 1);
        });

        it('should validate one required argument', (done) => {
            validate([
                { type: 'string', required: true },
                { type: 'number', required: false }
            ], (str) => {
                expect(str).to.be.a('string');
                expect(str).to.be.equal('simple string');
                done();
            }, 'simple string');
        });
    });
});
