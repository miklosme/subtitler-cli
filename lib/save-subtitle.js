const path = require('path');

function saveSubtitle(filePath, language) {
  const dir = path.dirname(filePath);
  const filename = path.basename(filePath, path.extname(filePath));

  var options = {
    action: 'download',
    language: language
  }

  // Get file hash.
  exports.getHash(filePath, function (hash) {
    if (hash) {
      options.hash = hash;

      // Make a call to the api to download the file.
      exports.call(options, function(error, response, body) {

        // Handle error.
        if (response.statusCode == 404) {
          return console.log('Error: Subtitle not found.');
        }

        // Write to a file if success.
        if (!error && response.statusCode == 200) {
          fs.writeFile(dir + '/' + filename + '.srt', body, 'utf8', function (err) {
            if (err) return console.log(err);

            // Show a success message.
            console.log('Successfully downloaded subtitle for ' + filename + '.');
          });
        }
      });
    }
  })
}

module.exports = saveSubtitle;
