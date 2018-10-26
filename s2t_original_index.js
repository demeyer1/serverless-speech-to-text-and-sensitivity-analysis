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

exports.S2T = (event, callback) => {
  
var stor = event.data;
console.log('Processing file: ' + stor.name);
console.log('NOW Processing location: ' + stor.bucket);
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



// this was the archived index2.js as well
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload and metadata.
 * @param {!Function} callback Callback function to signal completion.
 */
const speech = require('@google-cloud/speech');
const fs = require('fs');
 
// Creates a client
const client = new speech.SpeechClient();
 
const Storage = require('@google-cloud/storage');
const storage = Storage();


const https = require('https');

function getImage(url, callback) {
    https.get(url, res => {
        // Initialise an array
        const bufs = [];

        // Add the data to the buffer collection
        res.on('data', function (chunk) {
            bufs.push(chunk)
        });

        // This signifies the end of a request
        res.on('end', function () {
            // We can join all of the 'chunks' of the image together
            const data = Buffer.concat(bufs);

            // Then we can call our callback.
            callback(null, data);
        });
    })
    // Inform the callback of the error.
    .on('error', callback);
};





/* 
****************************************
BEGINNING LOGIC HERE
****************************************
*/

exports.S2T = (event, callback) => {
  
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





  
callback();
};


// THIS WAS THE PACKAGE.JSON for both
{
  "name": "s2te",
  "version": "0.0.1", 
  "private": true,
  "license": "Apache-2.0",
  "author": "Google Inc.",
  "repository": {
    "type": "git",
    "url": "https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git"
  },
  "engines": {
    "node": ">=4.3.2"
  },
  "scripts": {
    "lint": "repo-tools lint",
    "pretest": "npm run lint",
    "test": "ava -T 20s --verbose test/*.test.js"
  },
  "dependencies": {
    "@google-cloud/debug-agent": "^2.3.0",
    "@google-cloud/speech": "^2.1.1",
    "@google-cloud/dlp": "^0.3.0",
    "@google-cloud/storage": "^1.5.1",
    "@google-cloud/pubsub": "0.16.4",
    "pug": "2.0.0-rc.4",
    "safe-buffer": "5.1.1"
  },
  "devDependencies": {
    "@google-cloud/nodejs-repo-tools": "2.1.3",
    "@google-cloud/pubsub": "^0.15.0",
    "ava": "0.24.0",
    "proxyquire": "1.8.0",
    "sinon": "4.1.2",
    "supertest": "^3.0.0",
    "uuid": "^3.1.0"
  },
  "cloud-repo-tools": {
    "requiresKeyFile": true,
    "requiresProjectId": true,
    "requiredEnvVars": [
      "BASE_URL"
    ]
  }
}









