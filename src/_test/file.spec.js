'use strict';
/* global describe it */

import { expect } from 'chai';
import { readFile } from '../file.js';

const config = './data/config.json';

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('file', () => {
    // readFile
    describe('readFile', () => {
        it('should load file', () => {
            let result = readFile(config, __dirname);

            expect(result).to.be.a('string');

            result = JSON.parse(result);
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['foo', 'data']);
            expect(result.data).to.be.an('array');
        });

        it.skip('should load file without dirname', () => {
            let result = readFile(config);

            expect(result).to.be.a('string');

            result = JSON.parse(result);
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['foo', 'data']);
            expect(result.data).to.be.an('array');
        });

        it('should be false if file doesn\'t exit', () => {
            const result = readFile('/bar');

            expect(result).to.be.a('string');
            expect(result).to.equal('');
        });
    });
});
