import { RequestHandler } from 'express';

export type CorsMiddleware = (allowedOrigins?: string[]) => RequestHandler;

export const corsMiddleware: CorsMiddleware = (allowedOrigins) => (req, res, next) => {
  const origin = req.headers.origin;

  if (!allowedOrigins) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  const isAllowedOrigin = origin && allowedOrigins?.includes(origin);
  if (isAllowedOrigin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
