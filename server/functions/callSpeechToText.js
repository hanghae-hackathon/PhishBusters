require("dotenv").config();
const speech = require("@google-cloud/speech");
const path = require("node:path");
const { GoogleAuth } = require("google-auth-library");

async function speechToText(audioBuffer) {
  const keyFilePath = path.join(__dirname, "../key.google.json");

  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });

  const audioBytes = audioBuffer.toString("base64");

  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: "LINEAR16",
    // languageCode: "en-US",
    languageCode: "ko-KR",
  };

  const request = {
    audio: audio,
    config: config,
  };

  const client = new speech.SpeechClient({ auth });

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");

  return transcription;
}

module.exports = { speechToText };
