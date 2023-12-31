/* eslint-disable no-console */
import { Database } from '@src/infrastructure/database/Database';
import { Server } from '@src/infrastructure/server/Server';

import { MONGODB_URL } from '@src/config/database';

const PORT = process.env.PORT || 8080;

const db = new Database(MONGODB_URL);
db.connect();

const server = new Server();
server.start(PORT, () => {
  console.log(`The doggie dog server is running on port ${PORT}`);
});
