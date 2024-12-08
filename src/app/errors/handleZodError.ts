import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path?.[issue.path.length - 1] || 'unknown',
    message: issue.message,
  }));

  return {
    statusCode,
    message: 'validation Error',
    errorSources,
  };
};

export default handleZodError;
