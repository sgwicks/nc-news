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

describe.only('makeRefObj', () => {
  it('returns an object', () => {
    const articles = [
      { title: 'How to Code', article_id: 1 },
      { title: 'Why Code', article_id: 2 },
      { title: 'Coding for Philosophers', article_id: 3 }
    ]

    expect(makeRefObj(articles)).to.be.an('Object')
  })
  it('turns article titles into keys, and article_ids into values', () => {
    const articles = [
      { title: 'How to Code', article_id: 1 },
      { title: 'Why Code', article_id: 2 },
      { title: 'Coding for Philosophers', article_id: 3 }
    ]

    expect(makeRefObj(articles)).to.include.keys(
      'How to Code',
      'Why Code',
      'Coding for Philosophers'
    )
    expect(makeRefObj(articles)['How to Code']).to.equal(1)
    expect(makeRefObj(articles)['Why Code']).to.equal(2)
    expect(makeRefObj(articles)['Coding for Philosophers']).to.equal(3)
  })
  it('Doesn\'t mutate the original objects', () => {
    const articles = [
      { title: 'How to Code', article_id: 1 },
      { title: 'Why Code', article_id: 2 },
      { title: 'Coding for Philosophers', article_id: 3 }
    ]

    makeRefObj(articles)

    expect(articles[0]).to.eql({ title: 'How to Code', article_id: 1 })
  })
});

describe('formatComments', () => { });
