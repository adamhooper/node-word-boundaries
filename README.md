Word Boundaries
===============

The _task_ is simple: take a String as input, and return an Array of every word
boundary.

This tokenizer implements the
[Unicode 8.0 Text Segmentation Algorithm](http://www.unicode.org/reports/tr29/).
That makes it valid for English and European languages; but it's terrible for
Chinese, Japanese, and other languages that do not have any characters between
words.

Usage
-----

You may need to install a prerequisite: `apt-get install libicu-dev` or
`dnf install libicu-devel`. (Node itself depends on ICU; you just need the
development headers.)

Add it to your project: `npm install --save node-word-boundaries`

Then use it:

    const word_boundaries = require('word-boundaries')
    const text = 'See Jack run.'
    const boundaries = word_boundaries.find_indexes(text)
    console.log(boundaries) // 0, 3, 4, 8, 9, 12, 13
    const parts = word_boundaries.split(text)
    console.log(parts) // 'See', ' ', 'Jack', ' ', 'run', '.'

Boundary indices are pretty standard in C-like languages. As a refresher: they
point to the spaces _between_ characters in a String. Visually:

     S e e   J a c k   r u n .
    ^ - - ^ ^ - - - ^ ^ - - ^ ^
    0   2   4   6   8  10  12
      1   3   5   7   9  11  13

Constraints
-----------

The input must be a valid Unicode. In particular, a string like `\uDC00\uD800`
is invalid (it's a low surrogate followed by a high surrogate); that will cause
undefined behavior. (This constraint is true of most programs that deal with
Strings.)

Developing
----------

Download, `npm install`, and run `npm run prepublish` to generate data files.

Run `mocha -w` in the background as you implement features. Write tests in
`test` and code in `lib`.

TODO
----

Pull requests are welcome! In particular, this library could use:

* More unit tests: we really don't test much here
* Options: especially those suggested at http://www.unicode.org/reports/tr29
* Optimization: we have zillions of function calls and allocations

LICENSE
-------

AGPL-3.0. This project is (c) Overview Services Inc. and Adam Hooper. Please
contact both should you desire a more permissive license.
