import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';

describe('MainRouter', () => {
  describe('constructor', () => {
    describe('WHEN creating an instance', () => {
      it('should set the router prop with an express router', () => {
        const mainRouter = new MainRouter();

        expect(mainRouter.router.route).toBeDefined();
      });
    });
  });
});
