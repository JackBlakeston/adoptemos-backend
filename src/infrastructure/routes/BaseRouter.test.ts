import express, { Router } from 'express';
import { BaseRouter, Route } from './BaseRouter';
import { HttpMethods } from './Routes.types';
import { MockController, MockEntity, MockRepositoryImpl } from 'src/fixtures/ClassMocks';
import { MockModel } from 'src/fixtures/ModelMocks';

const { Get, Post } = HttpMethods;

const assertBoundRouterHandlerEqualToMockFunction = (boundHandler: () => void, mockFunction: () => void) => {
  expect(boundHandler.toString()).toEqual(mockFunction.bind({}).toString());
};

describe('BaseRouter', () => {
  const mockUrl = '/mock';
  const mockGetHandler = jest.fn();
  const mockValidateHandler = jest.fn();
  const mockPostHandler = jest.fn();
  const mockRoutes: Route[] = [
    [Get, mockUrl, mockGetHandler],
    [Post, mockUrl, mockValidateHandler, mockPostHandler],
  ];
  class MockRouter extends BaseRouter<MockEntity, MockController> {
    constructor() {
      super(new MockController(new MockRepositoryImpl(MockModel)));
      this.createRoutes(mockRoutes);
    }
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('extended to create a router', () => {
    describe('WHEN creating an entity', () => {
      it('should call the correct method of express router with the correct parameters', async () => {
        const mockExpressRouterGet = jest.fn();
        const mockExpressRouterPost = jest.fn();
        jest.spyOn(express, 'Router').mockImplementation(() => {
          return { get: mockExpressRouterGet, post: mockExpressRouterPost } as unknown as Router;
        });

        new MockRouter();

        const [getUrl, getHandlerFunction] = mockExpressRouterGet.mock.calls[0];
        expect(getUrl).toBe(mockUrl);
        assertBoundRouterHandlerEqualToMockFunction(getHandlerFunction, mockGetHandler);
        const [postUrl, validateHandlerFunction, postHandlerFunction] = mockExpressRouterPost.mock.calls[0];
        expect(postUrl).toBe(mockUrl);
        assertBoundRouterHandlerEqualToMockFunction(validateHandlerFunction, mockValidateHandler);
        assertBoundRouterHandlerEqualToMockFunction(postHandlerFunction, mockPostHandler);
      });
    });
  });
});
