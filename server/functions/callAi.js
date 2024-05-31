const { spawn } = require('child_process');

const runPythonScript = (scriptPath, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [scriptPath, ...args]);

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

runPythonScript("../../ai/hello.py", ['--name', 'Alice'])
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });
