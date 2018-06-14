// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
const express = require('express');
const app = express();

// Your Google Cloud Platform project ID
const projectId = 'af93dfaf54cf1232e2bcbfd237da291d254ef82f';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});


// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'km';

// Translates some text into Russian
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });