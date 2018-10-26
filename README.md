# s2t

Serverless speech-to-text 
- With automated scanning and classification of sensitive content
- Using ephemeral local storage
- <150 lines of code
- Can be developed and depoyed fully from a Chromebook

To deploy:
- Enable all appropriate APIs
- Update service permissions (https://photos.app.goo.gl/tHcgNTiRTGF6jDLV7)
- deploy function:      gcloud functions deploy S2T2 --trigger-bucket new-audio

Flow:
1/ Upload flac file to storage bucket
2/ Send file to speech to text ML
