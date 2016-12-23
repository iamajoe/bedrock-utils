'use strict';
/* global describe it before after beforeEach afterEach */

import { expect } from 'chai';
import { __test__ as module } from '../validate.stub.js';

// --------------------------------
// Variables

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('validate.stub', () => {
    // validate.stub
    describe('validate.stub', () => {
        it('should work without errors', () => {
            module.validate();
        });

        it('should call the function with arguments passed', (done) => {
            module.validate(null, (str) => {
                expect(str).to.be.a('string');
                expect(str).to.be.equal('simple string');
                done();
            }, 'simple string');
        });
    });
});
