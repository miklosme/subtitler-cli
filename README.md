# subtitler-cli

This is a simple command line program for downloading subtitles.

Usage: just command `subtitler` in a directory, and this program will download subtitles for every video in the folder.

It uses [SubDB](http://thesubdb.com/) which is a great subtitle API.

## Install

You will need `Node >= 6` and `NPM`.

`npm install -g subtitler-cli`

## Usage

In command line, `cd` to the folder.

### basic (language is English by default)
`subtitler`

### other language
`subtitler --language fr` or `subtitler -l fr`

*Check [SubDB](http://thesubdb.com/) for language statistics.*

### list supported languages
`subtitler --languages` or `subtitler -s`

## Licence
MIT
