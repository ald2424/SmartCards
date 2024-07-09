import { Request, Response, NextFunction } from 'express';

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default errorHandler;