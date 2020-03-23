const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('Given an empty array, returns a NEW array of the same length', () => {
    const arr = [{ object: 1, created_at: 1511354163389 },
    { object: 2, created_at: 1511354163466 },
    { object: 3, created_at: 1511354163570 }]

    expect(formatDates(arr)).to.be.an('Array')
    expect(formatDates(arr)).to.have.lengthOf(3)
    expect(formatDates(arr)).not.to.equal(arr)

  })
});

describe('makeRefObj', () => { });

describe('formatComments', () => { });
