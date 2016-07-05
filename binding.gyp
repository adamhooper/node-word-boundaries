{
  "targets": [
    {
      "target_name": "find_word_boundaries",
      "sources": [ "src/find_word_boundaries.cc" ],
      "conditions": [
        ['OS=="linux"', {
          'cflags_cc': [
            '<!@(pkg-config icu-i18n --cflags)'
          ],
          'libraries': [
            '<!@(pkg-config icu-i18n --libs)'
          ]
        }]
      ]
    }
  ]
}
