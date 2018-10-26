# s2t

Serverless speech-to-text 
- With automated scanning and classification of sensitive content
- Using ephemeral local storage
- <150 lines of code
- Can be developed and depoyed fully from a Chromebook

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

Record a flac file on mobile phone, upload to storage bucket, serverless workflow will kickoff that:
- Proccesses flac in speech to text API
- Uses local memory in GCF to write a text conversion
- Takes text conversion and kicks off a DLP scan
- Takes the outcome from the DLP scan and classifies the text log as either sensitive or non-sensitive
