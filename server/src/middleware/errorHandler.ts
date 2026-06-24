import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('[SERVER_ERROR]', err);
  res.status(500).json({
    status: 'ERROR',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected security audit block or system error has occurred.'
  });
}
