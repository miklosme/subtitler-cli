const request = require('request');
const querystring = require('querystring');

function requestSubDB(params, callback) {
  const options = {
    url: 'http://api.thesubdb.com?',
    headers: {
      'User-Agent': 'SubDB/1.0 (Subtitler/1.0.0; https://github.com/CAPSLOCKUSER/subtitler-cli)'
    }
  };

  options.url += querystring.stringify(params);

  request(options, (error, response, body) => {
    callback(error, response, body);
  });
}

module.exports = requestSubDB;
