// https://cloud.google.com/speech-to-text/docs/reference/rest/v1/speech/recognize
// https://audio.online-convert.com/convert-to-flac
// https://www.giftofspeed.com/base64-encoder/

// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');
// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'public/raw/working.flac';
const filename = '/Users/leykamthong/Downloads/1529029641314.wav'
const encoding = 'LINEAR16';
const sampleRateHertz = 44100;
const languageCode = 'km';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {

    const response = data[0];
    console.log(response);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: `, transcription);
  })
  .catch(err => {
    console.error('ERROR:', err);
  })


  