import { Request, Response } from 'express';

export const getMockRequest = <T extends object>(mock?: T): Request => {
  const req: Partial<Request> = {};
  req.body = mock ?? {};
  return req as Request;
};

export const getMockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
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
