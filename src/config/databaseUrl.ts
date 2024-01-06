const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, ENVIRONMENT, MONGODB_PORT, MONGODB_NAME } = process.env;

const DB_URL_PROD = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}?retryWrites=true&w=majority`;
const DB_URL_DEV = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`;

const isProd = ENVIRONMENT === 'prod';

export const DB_URL = isProd ? DB_URL_PROD : DB_URL_DEV;
