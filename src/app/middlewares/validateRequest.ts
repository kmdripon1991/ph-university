import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const ValidateRequest = (schema: AnyZodObject) => {
  // console.log(schema);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};
export default ValidateRequest;
