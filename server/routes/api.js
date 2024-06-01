const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const { runPythonScript } = require("../functions/callAiModel");
const { speechToText } = require("../functions/callSpeechToText");
const { getOpenAIResponse } = require("../functions/callOpenAI");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/prompt", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send({ error: "Prompt is required" });
    }

    const response = await getOpenAIResponse(prompt);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.post("/speech_to_text", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  speechToText(req.file.buffer)
    .then((transcription) => {
      res.send({ transcription });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

router.post("/phishing_detection", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const transcript = await speechToText(req.file.buffer);

    // 모델 정확도 향상 후 tobe-implement
    // const model_result = await runPythonScript(transcript);

    const gpt_result = await getOpenAIResponse(transcript);

    res.send({
      transcript,
      model_result: null,
      chat_gpt: gpt_result[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err?.details });
  }
});

module.exports = router;
