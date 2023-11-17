const { spawn } = require('child_process');

const nodemonCliCommand = 'nodemon --watch ./ --ext ts,json,js --exec npm run time:docker-start-quiet -s';

const nodemonProcess = spawn(nodemonCliCommand, { shell: true });

nodemonProcess.stdout.on('data', (data) => {
  const message = data.toString();
  const isNpmScriptMessage = message[1] === '>';
  if (!isNpmScriptMessage) console.log(message);
});

nodemonProcess.stderr.on('data', (data) => {
  console.error(`ERROR: ${data}`);
});

nodemonProcess.on('close', (code) => {
  console.log(`nodemon process exited with code ${code}`);
});
