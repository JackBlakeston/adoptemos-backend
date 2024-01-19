import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

interface GetMockRequestArgs {
  mockBody?: AnyObj;
  mockHeaders?: IncomingHttpHeaders;
}

export const getMockRequest = ({ mockHeaders, mockBody }: GetMockRequestArgs): Request => {
  const req: Partial<Request> = {};
  req.body = mockBody ?? {};
  req.headers = mockHeaders ?? {};
  return req as Request;
};

export const getMockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.header = jest.fn().mockReturnValue(res);
  return res as Response;
};

export const getSuccessResponseObject = <T>(data: T) => {
  return {
    data,
    success: true,
  };
};

export const getErrorResponseObject = (message: string) => {
  return {
    message,
    success: false,
  };
};
