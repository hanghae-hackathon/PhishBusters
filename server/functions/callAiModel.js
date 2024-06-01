const { spawn } = require("child_process");
const path = require("node:path");

const aiRootPath = path.join(__dirname, "../../ai");
const scriptPath = path.join(aiRootPath, "phishingDetector_combine.py");

const runPythonScript = (text) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [scriptPath, "--text", text]);

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
