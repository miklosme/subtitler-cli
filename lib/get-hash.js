const fs = require('fs');
const crypto = require('crypto');
const Buffer = require('buffer').Buffer;

const READ_SIZE = 64 * 1024;

function getHash(filePath, callback) {
  fs.open(filePath, 'r', (err, fd) => {
    if (err) {
      console.log(err);
      return;
    }

    fs.stat(filePath, (err, stats) => {
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

          callback(hash);
        });
      });
    });
  });
}

module.exports = getHash;
