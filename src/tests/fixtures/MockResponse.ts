import { Response } from 'express';

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
