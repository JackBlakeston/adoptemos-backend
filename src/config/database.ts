const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, IS_PROD } = process.env;

const MONGODB_PROD_URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}?retryWrites=true&w=majority`;
// const MONGODB_DEV_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`;
const MONGODB_DEV_URL = `mongodb://root:123456@mongodb:27017/adoptemos-db?authSource=admin`;

export const MONGODB_URL = IS_PROD ? MONGODB_PROD_URL : MONGODB_DEV_URL;
