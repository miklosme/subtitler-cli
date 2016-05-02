const readdir = require('fs-readdir-promise');
const isVideo = require('is-video');

function getVideoFiles(path) {
  return readdir(path)
    .then(files => files.filter(isVideo));
}

module.exports = getVideoFiles;
