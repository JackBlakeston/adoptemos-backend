import { Request } from 'express';
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
