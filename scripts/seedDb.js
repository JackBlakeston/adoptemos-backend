import { runStyledScript } from './scripUtils/styledScript.js';
import { runShellCommand } from './scripUtils/runShellCommand.js';

const seedDb = async () => {
  await runShellCommand(
    'docker exec adoptemos-server node scripts/buildSeeds.js && docker exec adoptemos-server node lib/src/infrastructure/database/seeds/seedDb.js',
  );
};

runStyledScript({
  startMsg: 'Seeding db',
  successMsg: 'Db was seeded successfully',
  failMessage: 'There was an error while seeding the db',
  script: seedDb,
});
