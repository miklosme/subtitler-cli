const fs = require('fs');

function saveSubtitle(subtitles) {
  const everySubtitle = subtitles.map(subtitle => new Promise(resolve => {
    saveSubtitleSinge(subtitle, resolve);
  }));
  return Promise.all(everySubtitle);
}

function saveSubtitleSinge({ statusCode, filename, body }, onDone) {
  if (statusCode >= 400) {
    if (statusCode === 404) {
      console.log(`Sorry, there is no subtitle for ${filename.red} in the requested language.`);
      return;
    }
    console.log(`Could not download subtitle for ${filename.red}. Error: ${statusCode}`);
    return;
  }

  fs.writeFile(`${filename}.srt`, body, 'utf8', err => {
    if (err) {
      return console.log(err);
    }

    console.log(`Successfully downloaded subtitle for ${filename.green}!`);
    return onDone();
  });
}

module.exports = saveSubtitle;
