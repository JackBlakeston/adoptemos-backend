/* eslint-disable no-console */
import { Database } from '@src/infrastructure/database/Database';
import { Server } from '@src/infrastructure/server/Server';

import { DB_URL } from '@src/config/databaseUrl';
import { PORT } from '@src/config/port';

const db = new Database(DB_URL);
db.connect();

const server = new Server();
server.start(PORT, () => {
  console.log(`The doggie dog server is running on port ${PORT}`);
});
