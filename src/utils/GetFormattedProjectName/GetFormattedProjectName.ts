const { APP_NAME } = process.env;

export const getFormattedProjectName = () => {
  if (!APP_NAME || APP_NAME === 'undefined') return 'API';

  const serverKeywordRegex = /.\bserver\b/;
  const nameExcludingServer = APP_NAME?.replace(serverKeywordRegex, '');
  const nameWithSpaces = nameExcludingServer?.replace('-', ' ');

  return `${nameWithSpaces?.charAt(0).toUpperCase()}${nameWithSpaces?.slice(1)}`;
};
