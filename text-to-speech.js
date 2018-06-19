const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

const client = new textToSpeech.TextToSpeechClient();

// client
//   .listVoices({})
//   .then(results => {
//     const voices = results[0].voices;

//     console.log('Voices:');
//     voices.forEach(voice => {
//       console.log(`Name: ${voice.name}`);
//       console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
//       console.log(
//         `  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`
//       );
//       console.log(`  Supported languages:`);
//       voice.languageCodes.forEach(languageCode => {
//         console.log(`    ${languageCode}`);
//       });
//     });
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'Hello';
const outputFile = 'public/voices/output.mp3';

const request = {
  input: {text: text},
  voice: {languageCode: 'en', ssmlGender: 'FEMALE'},
  audioConfig: {audioEncoding: 'MP3'},
};

client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  fs.writeFile(outputFile, response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log(`Audio content written to file: ${outputFile}`);
  });
});


