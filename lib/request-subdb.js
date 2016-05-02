const request = require('request-promise');

function requestSubDB(hashes, language) {
  const everyHash = hashes.map(hash => requestSubDBSingle(hash, language));
  return Promise.all(everyHash);
}

function requestSubDBSingle(hash, language) {
  const options = {
    uri: 'http://api.thesubdb.com',
    qs: {
      hash,
      language,
      action: 'download',
    },
    headers: {
      'User-Agent': 'SubDB/1.0 (Subtitler/1.0.0; https://github.com/CAPSLOCKUSER/subtitler-cli)',
    },
    //resolveWithFullResponse: true,
  };
  return request(options);
}

module.exports = requestSubDB;
