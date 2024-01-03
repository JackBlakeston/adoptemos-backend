import { config } from 'dotenv';

config();
const { PORT, APP_NAME } = process.env;

const nameExcludingServer = APP_NAME?.replace(/.\bserver\b/, '');
const formattedName = `${nameExcludingServer?.charAt(0).toUpperCase()}${nameExcludingServer?.slice(1)}`;

export default {
  openapi: '3.0.0',
  info: {
    title: `${formattedName} API`,
    description: `API docs for the ${formattedName} project`,
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${PORT}/`,
      description: 'Dev',
    },
  ],
};
