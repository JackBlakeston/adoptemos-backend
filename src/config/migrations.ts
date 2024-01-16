import { DB_URL } from '@src/config/databaseUrl';

const { MONGODB_NAME } = process.env;

export = {
  mongodb: {
    url: DB_URL,
    databaseName: MONGODB_NAME,
  },
  migrationsDir: 'lib/src/infrastructure/database/migrations',
  changelogCollectionName: 'testChangelog',
  migrationFileExtension: '.cjs',
  useFileHash: false,
};
