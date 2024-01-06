import { runStyledScript } from './scripUtils/styledScript.js';
import { runShellCommand } from './scripUtils/runShellCommand.js';

const command = process.argv[2];

const buildDockerImage = async () => {
  await runShellCommand('source .env && docker build -t $APP_NAME -f dockerfiles/Dockerfile.dev .');
};
const startDockerContainers = async () => {
  await runShellCommand('docker-compose up -d');
};
const stopDockerContainers = async () => {
  await runShellCommand('docker-compose down');
};

if (command === 'build') {
  runStyledScript({
    startMsg: 'Building docker image...',
    successMsg: 'Docker image build success',
    failMessage: 'Error building docker image',
    script: buildDockerImage,
    timerInterval: 100,
  });
}
if (command === 'up') {
  runStyledScript({
    startMsg: 'Starting docker containers...',
    successMsg: 'Docker containers started successfully',
    failMessage: 'Error starting docker containers',
    script: startDockerContainers,
  });
}
if (command === 'down') {
  runStyledScript({
    startMsg: 'Stopping docker containers...',
    successMsg: 'Docker containers stopped successfully',
    failMessage: 'Error stopping docker containers',
    script: stopDockerContainers,
  });
}
