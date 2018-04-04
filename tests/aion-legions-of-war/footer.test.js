import { expect } from 'chai';
import Nightmare from 'nightmare';
import { global } from './config';

let nightmare;
const baseURL = process.env.CAPPUCCINO_FUNC_URL;
const { defaultTimeout } = global;

describe('Mock Test', function () {
  it('mocky mock', function () {
    expect(1+2).to.equal(3);
  });
  it('mocky mock', function () {
    expect(1+1).to.equal(3);
  });
  it('mocky mock', function () {
    expect(2+2).to.equal(3);
  });
  it('mocky mock weee', function () {
    expect(2+2).to.equal(4);
  });
  it('goat goat', function () {
    expect(2+7).to.equal(9);
  });
});
