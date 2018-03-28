import { expect } from 'chai';
import getGlobalStats, { convertData, getPassPercent } from './global-stats';

//mocks
import mockData from '../../test/mocks/summary-all.mock';

// tests
describe('global-stats.js', function () {

  describe('convertData()', function () {
    it('It exists', function () {
      expect(convertData(mockData)).to.exist;
    });

    it('returns an obj', function () {
      expect(convertData(mockData)).is.an('object');
    });

    it('Equals the correct obj values', function () {
      expect(convertData(mockData)).to.deep.equal({ passes: 9, failures: 5, sites: 4, tests: 16 });
    });
  });

  describe('getPassPercent()', function () {
    it('returns a number', function () {
      expect(getPassPercent(4,5)).to.be.a('number');
    })

    const tests = [
      { assert: [5,5], expected: 50 },
      { assert: [60,29], expected: 67 },
      { assert: [1,5], expected: 17 },
      { assert: [0,50], expected: 0 },
      { assert: [0,0], expected: 0 },
      { assert: [15,0], expected: 100 },
      { assert: [125,8], expected: 94 },
      { assert: [5597,9076], expected: 38 },
      { assert: [1000,1000], expected: 50 },
    ];

    tests.forEach(test => {
      const { assert, expected } = test;
      it(`If given ${assert[0]} & ${assert[1]}, it returns ${expected}%`, function () {
        expect(getPassPercent(assert[0], assert[1])).to.equal(expected);
      });
    })
  });
});
