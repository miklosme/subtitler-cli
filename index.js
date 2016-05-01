#!/usr/bin/env node

'use strict';

const program = require('commander');

program
  .version('1.0.0')
  .option('-l, --language [optional]', 'optional subtitle language', 'english')
  .parse(process.argv);

console.log('language: ', program.language);
