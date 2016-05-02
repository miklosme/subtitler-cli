#!/usr/bin/env node

'use strict';

const program = require('commander');
require('colors');

const getVideoFiles = require('./lib/get-video-files');
const getHash = require('./lib/get-hash');
const requestSubDB = require('./lib/request-subdb.js');

program
  .version('1.0.0')
  .option('-l, --language [optional]', 'optional subtitle language', 'english')
  .parse(process.argv);

console.log('language: ', program.language);

getVideoFiles('./')
  .then(getHash)
  //.then(hashes => {
  //  hashes.forEach(hash => {
  //    console.log(hash.green);
  //  });
  //});
  .then(hashes => requestSubDB(hashes, program.language))
  .then(response => {
    console.log(response.statusCode);
    //response.forEach(res => {
    //  console.log('Response:', res)
    //});
  })
  //.then(saveSubtitles);
