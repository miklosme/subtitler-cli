#!/usr/bin/env node

'use strict';

const fs = require('fs');
const program = require('commander');
const isVideo = require('is-video');
const getHash = require('./lib/get-hash');
require('colors');

program
  .version('1.0.0')
  .option('-l, --language [optional]', 'optional subtitle language', 'english')
  .parse(process.argv);

console.log('language: ', program.language);

fs.readdirSync('./')
  .filter(isVideo)
  .forEach(videoFile => {
    getHash('./' + videoFile, (file => hash => {

      console.log(videoFile.green);
      console.log(hash.red);
    })(videoFile));
  });
