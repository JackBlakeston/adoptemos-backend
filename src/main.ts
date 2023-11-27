/* eslint-disable no-console */
import { MONGODB_URL } from './config/database';
import { Database } from './infrastructure/database/Database';
import { Server } from './infrastructure/server/Server';

const PORT = process.env.PORT || 8080;

const db = new Database(MONGODB_URL);
db.connect();

const server = new Server();
server.start(PORT, () => {
  console.log(`The doggie dog server is running on port ${PORT}`);
});
