const wav = require("wav");
const fs = require("node:fs");

function convertToMono(inputFile, outputFile) {
  const reader = new wav.Reader();

  reader.on("format", function (format) {
    if (format.channels === 1) {
      console.log("The file is already mono. No conversion needed.");
      return;
    }

    console.log("Converting to mono...");

    const writer = new wav.FileWriter(outputFile, {
      channels: 1, // 모노 채널
      sampleRate: format.sampleRate,
      bitDepth: format.bitDepth,
    });

    reader.pipe(writer);

    writer.on("finish", function () {
      console.log(`Converted ${inputFile} to mono and saved as ${outputFile}`);
    });
  });

  fs.createReadStream(inputFile).pipe(reader);
}

module.exports = { convertToMono };
