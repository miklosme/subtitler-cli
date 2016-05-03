const request = require('request');
const qs = require('querystring');

const USER_AGENT = 'SubDB/1.0 (Subtitler/1.0.0; https://github.com/CAPSLOCKUSER/subtitler-cli)';

function requestSubDB(hashes, language) {
  const everyHash = hashes.map(({ hash, filename }) => new Promise(resolve => {
    requestSubDBSingle(hash, filename, language, resolve);
  }));
  return Promise.all(everyHash);
}

function requestSubDBSingle(hash, filename, language, onDone) {
  const query = qs.stringify({
    action: 'download',
    hash,
    language,
  });
  const options = {
    url: `http://api.thesubdb.com?${query}`,
    headers: {
      'User-Agent': USER_AGENT,
    },
  };

  return request(options, (error, response, body) => {
    if (error) {
      throw (error);
    }

    onDone({
      statusCode: response.statusCode,
      filename,
      body,
    });
  });
}

function requestLanguageList() {
  const options = {
    url: 'http://api.thesubdb.com/?action=languages',
    headers: {
      'User-Agent': USER_AGENT,
    },
  };

  return new Promise(resolve => {
    request(options, (error, response, languages) => {
      if (error) {
        throw (error);
      }

      if (response.statusCode >= 400) {
        console.log(`There was an error. (${response.statusCode.toString().red})`);
        return;
      }

      console.log(`Available languages: ${languages.yellow}`);
      resolve();
    });
  });
}

module.exports = {
  requestSubDB,
  requestLanguageList,
};
