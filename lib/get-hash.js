/* eslint-disable no-shadow */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Buffer = require('buffer').Buffer;

const KILO_BYTE = 1024;
const READ_SIZE = 64 * KILO_BYTE;

function getHash(files) {
  const everyHash = files.map(file => new Promise(resolve => {
    getHashSingle(file, resolve);
  }));
  return Promise.all(everyHash);
}

function getHashSingle(filename, onDone) {
  const filenameWithutExt = path.basename(filename, path.extname(filename));
  fs.open(filename, 'r', (err, fd) => {
    fs.stat(filename, (err, stats) => {
      const size = stats.size;
      const buffer = new Buffer(READ_SIZE);
      const md5 = crypto.createHash('md5');

      // Read the first 64k of the video file.
      fs.read(fd, buffer, 0, READ_SIZE, 0, (err, bytesRead, buffer) => {
        md5.update(buffer);

        // Read the last 64kb.
        fs.read(fd, buffer, 0, READ_SIZE, size - READ_SIZE, () => {
          md5.update(buffer);

          // Create a hash.
          const hash = md5.digest('hex');

          onDone({
            filename: filenameWithutExt,
            hash,
          });
        });
      });
    });
  });
}

module.exports = getHash;
