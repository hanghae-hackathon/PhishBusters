const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const runPythonScript = (scriptPath, fileBuffer) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [scriptPath]);

        pythonProcess.stdin.write(fileBuffer);
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            } else {
                resolve(`Python script completed successfully with code ${code}`);
            }
        });
    });
};

const aiRootPath = path.join(__dirname, '../../ai');

const audioFilePath = path.join(aiRootPath, 'sample.wav')

if (!fs.existsSync(audioFilePath)) {
    console.error('Audio file does not exist.');
    process.exit(1);
}


const scriptPath =  path.join(aiRootPath, 'phishingDetector.py');
const audioFileBuffer = fs.readFileSync(audioFilePath);

runPythonScript(scriptPath, audioFileBuffer)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });
