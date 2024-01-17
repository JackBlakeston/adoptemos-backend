import { runStyledScript } from './scripUtils/styledScript.js';
import { runShellCommand } from './scripUtils/runShellCommand.js';

const command = process.argv[2];
const isFromContainer = process.argv[3] === '--container';

const runMigrations = async () => {
  const shellCommand = isFromContainer
    ? `node scripts/buildMigrations.js && npx migrate-mongo ${command} -f lib/src/config/migrations.cjs`
    : `docker exec adoptemos-server node scripts/buildMigrations.js && docker exec adoptemos-server npx migrate-mongo ${command} -f lib/src/config/migrations.cjs`;
  await runShellCommand(shellCommand);
};

runStyledScript({
  startMsg: 'Running database migrations...',
  successMsg: 'Database migrations complete',
  failMessage: 'There was an error running database migrations',
  script: runMigrations,
});
