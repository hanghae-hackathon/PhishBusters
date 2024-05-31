require("dotenv").config();
const fs = require("fs");
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient({
  projectId: process.env.GOOGLE_API_PROJECT_ID,
});

async function transcribeAudio() {
  const fileName = "../../ai/sample.wav";
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString("base64");

  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  };
  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
}

transcribeAudio().catch(console.error);
