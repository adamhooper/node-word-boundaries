'use strict'

const find_word_boundaries = require('bindings')('find_word_boundaries').find_word_boundaries

module.exports = {
  find_word_boundaries: find_word_boundaries,

  split: (s) => {
    if (s.length === 0) return []

    const indexes = find_word_boundaries(s)
    const ret = new Array(indexes.length - 1)
    for (let i = 0; i < ret.length; i++) {
      ret[i] = s.slice(indexes[i], indexes[i + 1])
    }

    return ret
  }
}
