describe('getFormattedProjectName()', () => {
  const oldEnv = process.env;

  afterEach(() => {
    process.env = oldEnv;
    jest.resetModules();
  });

  const getTestFunction = async (mockedAppName?: string) => {
    process.env.APP_NAME = mockedAppName;
    return await import('@src/utils/GetFormattedProjectName/GetFormattedProjectName');
  };

  describe('WHEN "server" keyword is present in APP_NAME', () => {
    it('should format project name correctly', async () => {
      const { getFormattedProjectName } = await getTestFunction('foo-server');
      const formattedName = getFormattedProjectName();
      expect(formattedName).toEqual('Foo');
    });
  });

  describe('WHEN APP_NAME is nullish', () => {
    it('should return a string that says "API"', async () => {
      const { getFormattedProjectName } = await getTestFunction();

      const formattedName = getFormattedProjectName();

      expect(formattedName).toEqual('API');
    });
  });

  describe('WHEN APP_NAME does not contain the "server" keyword', () => {
    it('should return the same name', async () => {
      const { getFormattedProjectName } = await getTestFunction('foo-bar');

      const formattedName = getFormattedProjectName();

      expect(formattedName).toEqual('Foo bar');
    });
  });
});
