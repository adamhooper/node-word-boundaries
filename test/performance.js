#!/usr/bin/env node

'use strict'

const fs = require('fs')
const find_word_boundaries = require('../index').find_word_boundaries

console.log('Loading and splitting some documents')

let t1 = new Date()

function filenameToString(filename) {
  return fs.readFileSync(filename, 'utf-8')
}

const rawInputDocuments = [
  filenameToString(__filename),
  filenameToString(__dirname + '/split-spec.js'),
  filenameToString(__dirname + '/../README.md'),
  filenameToString(__dirname + '/../LICENSE'),
  filenameToString(__dirname + '/../package.json'),
  filenameToString(__dirname + '/../src/find_word_boundaries.cc')
]

// Rather than include the complete works of Shakespeare, let's just copy the
// documents a few times

const documents = []

for (let i = 0; i < 10000; i++) {
  documents.push(rawInputDocuments[i % rawInputDocuments.length])
}

console.log('Loaded %d documents in %dms. (This is not what we are optimizing)', documents.length, new Date() - t1)

console.log('Finding boundaries in %d documents...', documents.length)

t1 = new Date()

documents.forEach(function(document) {
  find_word_boundaries(document)
})

console.log('Found boundaries in %d documents in %dms.', documents.length, new Date() - t1)
