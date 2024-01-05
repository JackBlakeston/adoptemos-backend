import swaggerAutogenDocument from '@src/docs/swaggerAutogen.json';

const { APP_NAME, API_URL } = process.env;
const getFormattedProjectName = () => {
  const serverKeywordRegex = /.\bserver\b/;
  const nameExcludingServer = APP_NAME?.replace(serverKeywordRegex, '');
  return `${nameExcludingServer?.charAt(0).toUpperCase()}${nameExcludingServer?.slice(1)}`;
};

const getInfo = () => {
  const projectName = getFormattedProjectName();

  return {
    title: `${projectName} API`,
    description: `API docs for the ${projectName} project`,
    version: '1.0.0',
  };
};

export const getSwaggerDocument = () => {
  return {
    info: getInfo(),
    servers: [
      {
        url: API_URL,
        description: 'API url',
      },
    ],
    ...swaggerAutogenDocument,
  };
};
