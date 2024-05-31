const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const { runPythonScript } = require("../functions/callAiModel");
const { speechToText } = require("../functions/callSpeechToText");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  runPythonScript(req.file.buffer)
    .then((fileSize) => {
      res.send({ fileSize });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

module.exports = router;
