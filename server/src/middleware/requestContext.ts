import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export function requestContext(req: Request, res: Response, next: NextFunction) {
  req.id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11);
  next();
}
