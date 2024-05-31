const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");
const { runPythonScript } = require("../functions/callAiModel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/phishingDetection", upload.single("audio"), async (req, res) => {
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
