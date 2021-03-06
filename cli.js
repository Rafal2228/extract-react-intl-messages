#!/usr/bin/env node
'use strict'
const meow = require('meow')
const fn = require('.')

const cli = meow(
  `
  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output          Output directory [require: true]
  -l, --locales         locales [require: true]
  -f, --format          json | yaml [default: json]
  -d, --default-locale  default locale
  --flat                json [default: true] | yaml [default: false]
  --delimiter           json | yaml [default: .]

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
`,
  {
    boolean: ['flat'],
    strings: ['output', 'locales', 'format', 'delimiter'],
    alias: {
      o: 'output',
      l: 'locales',
      f: 'format',
      d: 'default-locale'
    },
    default: {
      format: 'json',
      delimiter: '.'
    }
  }
)

const { output, locales } = cli.flags

if (!output) {
  console.log('ERROR: required output')
  process.exit(1)
}

if (!locales || typeof locales !== 'string') {
  console.log('ERROR: required locales')
  process.exit(1)
}

const localesMap = locales.split(',')

fn(localesMap, cli.input[0], output, cli.flags)
