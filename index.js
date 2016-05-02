#!/usr/bin/env node

'use strict';

const program = require('commander');
require('colors');

const getVideoFiles = require('./lib/get-video-files');
const getHash = require('./lib/get-hash');

program
  .version('1.0.0')
  .option('-l, --language [optional]', 'optional subtitle language', 'english')
  .parse(process.argv);

console.log('language: ', program.language);

/*fs.readdirSync('./')
  .filter(isVideo)
  .forEach(videoFile => {
    getHash('./' + videoFile)
      .then(hash => {
        console.log(videoFile.green);
        console.log(hash.red);
      })
      .then();
  });*/

getVideoFiles('./')
  .then(getHash)
  .then(hashes => {
    hashes.forEach(hash => {
      console.log(hash.green);
    });
  });
  //.then(requestSubDB)
  //.then(saveSubtitles);
