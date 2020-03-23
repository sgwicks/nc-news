const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('Given an array, returns a NEW array of the same length', () => {
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

describe('makeRefObj', () => {
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

describe.only('formatComments', () => {
  it('Returns a new array of the same length', () => {
    const comments = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }]

    const articleRef = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2,
    }

    expect(formatComments(comments, articleRef)).to.be.an('Array')
    expect(formatComments(comments, articleRef)).to.have.lengthOf(3)
    expect(formatComments(comments, articleRef)).not.to.equal(comments)
  })
  it('Renames created_by key to author', () => {
    const comments = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }]

    const articleRef = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2,
    }

    expect(formatComments(comments, articleRef)[0].author).to.equal('butter_bridge')
    expect(formatComments(comments, articleRef)[0]).not.to.include.keys('created_by')
  })
  it('Does not mutate the original objects', () => {
    const comments = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }]

    const articleRef = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2,
    }

    formatComments(comments, articleRef)

    expect(comments[0]).to.eql({
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    })

  })
  it('Replaces {belongs_to: title} with article_id key and value', () => {
    const comments = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }]

    const articleRef = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2,
    }

    expect(formatComments(comments, articleRef)[0].article_id).to.equal(1)
    expect(formatComments(comments, articleRef)[1].article_id).to.equal(2)
  })



});
