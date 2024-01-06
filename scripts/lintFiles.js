import { runStyledScript } from './scripUtils/styledScript.js';
import { runShellCommand } from './scripUtils/runShellCommand.js';

const lintFiles = async () => {
  const shouldFixLintErrors = process.argv.includes('--fix');

  await runShellCommand(`npx eslint .${shouldFixLintErrors ? ' --fix' : ''}`);
};

runStyledScript({
  startMsg: 'Linting files',
  successMsg: 'Lint passed',
  failMessage: 'Linting errors found',
  script: lintFiles,
});
