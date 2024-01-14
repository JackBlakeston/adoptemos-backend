import { runStyledScript } from './scripUtils/styledScript.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { __dirname } from './scripUtils/dirname.js';
import { format } from 'date-fns';
import { formatCamelcase } from './scripUtils/formatCamelcase.js';

const migrationName = process.argv[2];
const formattedName = formatCamelcase(migrationName);

const getMigrationFileContent = (formattedDate, formattedTime) => `import { Db } from 'mongodb';

// ${formattedName}
// Created on ${formattedDate} at ${formattedTime}
export = {
  async up(db: Db) {
    await db.collection('');
  },

  async down(db: Db) {
    await db.collection('');
  },
};
`;

const createMigration = async () => {
  if (!migrationName) {
    throw new Error('Migration name was not provided');
  }
  if (migrationName.match(/[-_]/)) {
    throw new Error('Migration name must be in camelcase');
  }

  const formattedDate = format(new Date(), 'MMM dd, yyyy');
  const formattedTime = format(new Date(), 'hh:mm');
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '').split('.')[0];

  const fileName = `${timestamp}_${migrationName}.ts`;

  const migrationContent = getMigrationFileContent(formattedDate, formattedTime);

  const migrationsDir = join(__dirname, '..', 'src', 'infrastructure', 'database', 'migrations');
  if (!existsSync(migrationsDir)) {
    mkdirSync(migrationsDir, { recursive: true });
  }

  const filePath = join(migrationsDir, fileName);
  writeFileSync(filePath, migrationContent);
  console.log(`Migration file created: ${filePath}`);
};

runStyledScript({
  startMsg: `Creating migration with name '${formattedName}'`,
  successMsg: 'Migration created',
  failMessage: 'There was an error creating the migration',
  shouldBubbleError: true,
  script: createMigration,
});
