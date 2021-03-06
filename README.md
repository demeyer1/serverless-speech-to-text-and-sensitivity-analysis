*Conceptual diagram* 

![Conceptual architecture, note actual implementation includes more steps](Screenshot%202018-10-30%20at%202.25.06%20PM.png "Description goes here")

# Serverless speech to text and sensitive data identification
Note: This code is intended as a sample only, and while it will build and run - it should not be run in production as-is without first reviewing for effiency and security. 

Serverless speech-to-text and sensitivity analysis benefits:
- Stateless, autoscaling, containers that will scale out to hundreds of audio uploads per minute
- Using Google neural network to identify language, then translate audio to speech in correct language
- Triggers secondar function to scan and classify sensitive content, and identify any regular expressions identified in advance
- Uses all ephemeral local storage or persistent storage, no DB required
- <150 lines of code per function/container
- Can be developed and depoyed fully from a Chromebook
- All web endpoints, no need to use CLI except upon deploying initial code
- All 1P events eliminates a signifigant amount of configuration and security 

To deploy:
- Enable all appropriate APIs (cloud Functions, Cloud Storage, Speech to Text, DLP)
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

