/* eslint-disable no-console */
import { MONGODB_URL } from './config/database';
import { Database } from './infrastructure/database/Database';
import { AdoptemosServer } from './infrastructure/server/Server';

const server = new AdoptemosServer();
server.configureRoutes();

const db = new Database(MONGODB_URL);
db.connect();

const PORT = process.env.PORT || 8080;
server.start(PORT, () => {
  console.log(`The doggie dog server is running on port ${PORT}`);
});
