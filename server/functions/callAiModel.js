const { spawn } = require("child_process");
const path = require("node:path");

const aiRootPath = path.join(__dirname, "../../ai");
const scriptPath = path.join(aiRootPath, "phishingDetector.py");

const runPythonScript = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [scriptPath]);

    pythonProcess.stdin.write(fileBuffer);
    pythonProcess.stdin.end();

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(result.trim());
      }
    });
  });
};

module.exports = { runPythonScript };

//
// const audioFilePath = path.join(aiRootPath, 'sample.wav')
//
// if (!fs.existsSync(audioFilePath)) {
//     console.error('Audio file does not exist.');
//     process.exit(1);
// }
//
//
// const audioFileBuffer = fs.readFileSync(audioFilePath);
//
// runPythonScript(scriptPath, audioFileBuffer)
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
