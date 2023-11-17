const { spawn } = require('child_process');

const typescript = 'npm run typescript -s';
const dockerBuildQuiet = 'npm run docker-build-quiet -s';
const dockerUpQuiet = 'npm run docker-up-quiet -s';
const dockerPruneQuiet = 'npm run docker-image-prune-quiet -s';
const dockerStartQuiet = `${typescript} && ${dockerBuildQuiet} && ${dockerUpQuiet} && ${dockerPruneQuiet}`;
const nodemonProcess = spawn(dockerStartQuiet, { shell: true });

nodemonProcess.stdout.on('data', (data) => {
  const message = data.toString();
  const isNpmScriptMessage = message[1] === '>';
  if (!isNpmScriptMessage) console.log(message);
});

nodemonProcess.stderr.on('data', (data) => {
  console.error(`ERROR: ${data}`);
});
