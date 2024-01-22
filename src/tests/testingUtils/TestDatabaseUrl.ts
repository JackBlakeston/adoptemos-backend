const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, IS_DOCKER } = process.env;

const TEST_DB_DEV_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_PORT}/test-db?authSource=admin`;
const TEST_DB_CI_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/test-db?authSource=admin`;
export const TEST_DB_URL = IS_DOCKER === 'true' ? TEST_DB_CI_URL : TEST_DB_DEV_URL;
