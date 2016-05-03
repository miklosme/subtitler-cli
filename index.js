#!/usr/bin/env node

'use strict';

require('colors');
const program = require('commander');

const getVideoFiles = require('./lib/get-video-files');
const getHash = require('./lib/get-hash');
const { requestSubDB, requestLanguageList } = require('./lib/request-subdb');
const saveSubtitle = require('./lib/save-subtitle');

program
  .version('1.0.0')
  .option('-l, --language [optional]', 'optional subtitle language', 'en')
  .option('-s, --languages [optional]', 'list all available language', false)
  .parse(process.argv);

if (program.languages) {
  requestLanguageList()
    .then(() => {
      process.exit();
    });
} else {
  console.log(`Search language: ${program.language.blue}`);

  getVideoFiles('./')
    .then(getHash)
    .then(hashes => requestSubDB(hashes, program.language))
    .then(saveSubtitle);
}
