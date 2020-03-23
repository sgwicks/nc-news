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
  it('Converts the created_at key into a javscript Date object', () => {
    const arr = [{ object: 1, created_at: 1511354163389 },
    { object: 2, created_at: 1511354163466 },
    { object: 3, created_at: 1511354163570 }]

    expect(formatDates(arr)[0].created_at).to.be.an.instanceOf(Date)
    expect(formatDates(arr)[1].created_at).to.be.an.instanceOf(Date)
    expect(formatDates(arr)[2].created_at).to.be.an.instanceOf(Date)
  })
  it('Doesn\'t mutate the original objects', () => {
    const arr = [{ object: 1, created_at: 1511354163389 },
    { object: 2, created_at: 1511354163466 },
    { object: 3, created_at: 1511354163570 }]

    formatDates(arr)

    expect(arr[0]).to.eql({ object: 1, created_at: 1511354163389 })
  })
});

describe('makeRefObj', () => { });

describe('formatComments', () => { });
