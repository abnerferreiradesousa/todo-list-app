import { ZodError } from "zod";
import { Request, Response } from "express";
import { ErrorRequestHandler } from "express";
import { ErrorTypes, errorCatalog } from '../errors/catalog';


const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next,
) => {

  if(err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message });
  }

  const messageAsErrorTYpe = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorTYpe];

  if(mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }

  console.error(err);
  return res.status(500).json({ message: err.message });
}

export default errorHandler;