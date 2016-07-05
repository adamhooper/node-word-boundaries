'use strict'

const split = require('../index').split
const expect = require('chai').expect

const S = ' '

describe('split', function() {
  function test(input, expectedOutput, message) {
    it("should split " + message, function() {
      expect(split(input)).to.deep.eq(expectedOutput)
    })
  }

  // Search http://www.unicode.org/reports/tr29/#Word_Boundaries: for the
  // commented quotes to see why a test belongs.

  test('', [], 'an empty string')

  // "Break at the start and end of text"
  test('a', [ 'a' ], 'a single-character string')

  // "Do not break within CRLF"
  test('a\r\nb', [ 'a', '\r\n', 'b' ], 'a CRLF')

  // "Otherwise break before and after Newlines"
  test('a\rb\nc', [ 'a', '\r', 'b', '\n', 'c' ], 'newlines (not CRLF)')

  test('A simple string', [ 'A', S, 'simple', S, 'string' ], 'a simple string')
  test('A 💩 string', [ 'A', S, '💩', S, 'string' ], 'a string with multi-char characters')
  test("the foo's bar", [ 'the', S, "foo's", S, 'bar' ], 'a string with a possessive apostrophe')
  test('the "foo" bar', [ 'the', S, '"', 'foo', '"', S, 'bar' ], 'a string with quotes')
  test("the 'foo' bar", [ 'the', S, "'", 'foo', "'", S, 'bar' ], 'a string with single quotes')
  test("the ``foo'' bar", [ 'the', S, '`', '`', 'foo', "'", "'", S, 'bar' ], 'a string with `` and \'\' quotes')
  test('Mr. Smith', [ 'Mr', '.', S, 'Smith' ], 'a string with a period')
  test('out-of-the-box', [ 'out', '-', 'of', '-', 'the', '-', 'box' ], 'a string with a hyphenated word')
  test('hello, there', [ 'hello', ',', S, 'there' ], 'a string with a comma')
  test(' $ ', [ S, '$', S ], 'a string containing no words')

  // TODO wait for newer ICU version
  //// "Do not break within emoji modifier sequences"
  //test('🤹🏿', [ '🤹🏿' ], 'an emoji modifier sequence')
  //
  //// "Do not break within emoji zwj sequences"
  //test('👨‍👨‍👦', [ '👨‍👨‍👦' ], 'a string with zwj emojis')

  // "Do not break within sequences"
  test('walk 1,000.000,003 miles', [ 'walk', S, '1,000.000,003', S, 'miles' ], 'a string with a punctuated numeral')

  // "The use of the apostrophe is ambiguous"
  test("the peoples' republic", [ 'the', S, 'peoples', "'", S, 'republic' ], 'a string with a plural-possessive apostrophe')

  // "Figure 1. Word Boundaries"
  test(
    'The quick (“brown”) fox can’t jump 32.3 feet, right?',
    [ 'The', S, 'quick', S, '(', '“', 'brown', '”', ')', S, 'fox', S,
      'can’t', S, 'jump', S, '32.3', S, 'feet', ',', S, 'right', '?' ],
    'the example string at http://www.unicode.org/reports/tr29/#Word_Boundaries'
  )
})
