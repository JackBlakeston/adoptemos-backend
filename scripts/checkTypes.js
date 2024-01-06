import { runStyledScript } from './scripUtils/styledScript.js';
import { runShellCommand } from './scripUtils/runShellCommand.js';

const checkTypes = async () => {
  await runShellCommand('npx tsc --pretty');
};

runStyledScript({
  startMsg: 'Running typescript check',
  successMsg: 'Typescript check passed',
  failMessage: 'Typescript check failed',
  script: checkTypes,
});
