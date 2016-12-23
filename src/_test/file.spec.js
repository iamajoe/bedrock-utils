'use strict';
/* global describe it before after beforeEach afterEach */

import { expect } from 'chai';
import { __test__ as module } from '../file.js';

// --------------------------------
// Variables

const config = './data/config.json';

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('file', () => {
    // readFile
    describe('readFile', () => {
        it('should load file', () => {
            let result = module.readFile(config, __dirname);

            expect(result).to.be.a('string');

            result = JSON.parse(result);
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['foo', 'data']);
            expect(result.data).to.be.an('array');
        });

        it.skip('should load file without dirname', () => {
            let result = module.readFile(config);

            expect(result).to.be.a('string');

            result = JSON.parse(result);
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['foo', 'data']);
            expect(result.data).to.be.an('array');
        });

        it('should be false if file doesn\'t exit', () => {
            const result = module.readFile('/bar');

            expect(result).to.be.a('string');
            expect(result).to.equal('');
        });
    });
});
