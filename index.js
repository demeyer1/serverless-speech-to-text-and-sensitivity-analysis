/**
 * https://cloud.google.com/speech-to-text/docs/basics
 * https://cloud.google.com/speech-to-text/docs/sync-recognize#speech-sync-recognize-nodejs
 * https://cloud.google.com/nodejs/docs/reference/storage/1.6.x/Bucket 
 */
  
const Storage = require('@google-cloud/storage');
const storage = Storage();
const fs = require('fs');
const https = require('https');

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
    console.log('Transcriprtion 2: ' + transcription);
    //this is the beginning of writing to text to temporary container storage
    var logger = fs.createWriteStream('/tmp/log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
    });
    logger.write(transcription);
    logger.end();

    //begin moving the text output to a bucket
    var storage2 = require('@google-cloud/storage')();
    var logBucket = storage2.bucket('quarantine2');
    
    logBucket.upload('/tmp/log.txt', function(err, file, apiResponse) {
    // this is actually working
    console.log(`Moved the file text output to a new storage bucket`);
    });
      
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
console.log(`COMPLETED: exiting client execution`);
 
callback();
};
