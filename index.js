/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload and metadata.
 * @param {!Function} callback Callback function to signal completion.
 * https://cloud.google.com/speech-to-text/docs/basics
 * https://cloud.google.com/speech-to-text/docs/sync-recognize#speech-sync-recognize-nodejs
 */
 
// Creates a client
 
const Storage = require('@google-cloud/storage');
const storage = Storage();


const https = require('https');


/* 
****************************************
BEGINNING LOGIC HERE
****************************************
*/

exports.S2T2 = (event, callback) => {
  
var stor = event.data;
console.log('Processing file: ' + stor.name);
console.log('Processing location: ' + stor.bucket);
//var a = 'https://storage.cloud.google.com/new-audio/';
//var b = stor.name;
//var b += a;
//var filename = stor.bucket;
//var filename += b;
//var filename = a+b+c;
var filename = 'https://storage.cloud.google.com/new-audio/brooklyn.wav';
console.log('Processing concatenated location of the file:    ' + filename);

const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

const gcsUri = 'gs://new-audio/brooklyn2.flac';
console.log('Processing URI target:    ' + gcsUri);
const encoding = 'FLAC';
sampleRateHertz = 16000;
const languageCode = 'en-US';

//setup call
const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  uri: gcsUri,
};

const request = {
  config: config,
  audio: audio,
};

console.log(`entering client execution and creating the client service call`);

client
  .recognize(request)
  .then(data => {
    console.log(`Transcription underway`);  
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

console.log(`exiting client execution`);


  
callback();
};
