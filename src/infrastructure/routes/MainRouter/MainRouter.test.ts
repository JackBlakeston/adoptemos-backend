import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';

describe('MainRouter', () => {
  describe('constructor', () => {
    describe('WHEN creating an instance', () => {
      const mainRouter = new MainRouter();

      it('should set the router prop with an express router', () => {
        expect(mainRouter.router).toBeDefined();
      });

      it('should set the base route', () => {
        const routerStack = mainRouter.router.stack;
        expect(routerStack[0].route.path).toEqual('/');
      });
    });
  });
});
