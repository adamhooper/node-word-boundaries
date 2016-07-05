'use strict'

const find_word_boundaries = require('../index').find_word_boundaries
const expect = require('chai').expect

describe('find_word_boundaries', () => {
  it('should work with an empty string', () => {
    expect(find_word_boundaries('')).to.deep.eq([])
  })

  it('should find boundaries', () => {
    expect(find_word_boundaries('foo bar')).to.deep.eq([ 0, 3, 4, 7 ])
  })

  // The other tests are in split-spec.js, because it's easier to read
})
