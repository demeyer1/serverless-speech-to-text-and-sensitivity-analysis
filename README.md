# s2t
Note: This code is intended as a sample only, it is not ready to be run in production. Do not run this in production.

Serverless speech-to-text and sensitivity analysis benefits:
- Stateless, autoscaling, containers that will scale out to hundreds of audio uploads per minute
- Using Google neural network to identify language, then translate audio to speech in correct language
- Then automatically spins up secondary containers via functions to scan and classify sensitive content
- Uses all ephemeral local storage or persistent storage, no DB required
- <150 lines of code per function/container
- Can be developed and depoyed fully from a Chromebook
- All web endpoints, no need to use CLI except upon deploying initial code
- All 1P events eliminates a signifigant amount of configuration and security 

To deploy:
- Enable all appropriate APIs
- Update service permissions 
- deploy function:      gcloud functions deploy S2T2 --trigger-bucket new-audio
- deploy function:      gcloud functions deploy DLPQuarantineGCS --trigger-bucket new-audio 

Products involved:
- Google Cloud storage
- Google Cloud functions
- Google Pub/Sub
- Google DLP API
- Google Speech to Text API

To test: record a flac file on mobile phone, upload to storage bucket, serverless workflow will kickoff that:
- Proccesses flac in speech to text API
- Uses local memory in GCF to write a text conversion to tmpfs, then exports tmpfs to a text log
- Takes text conversion and kicks off a DLP scan
- Takes the outcome from the DLP scan and classifies the text log as either sensitive or non-sensitive

