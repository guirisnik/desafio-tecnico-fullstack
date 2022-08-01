import { NextFunction, Request, Response } from "express";
import { HttpException } from "../infrastructure/exceptions/http.exception";
import AuthService from "./auth.service";
import { StatusCodes } from "http-status-codes";

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.get("Authorization");

  try {
    AuthService.validate(authorization);
  } catch (error: unknown) {
    if (error instanceof HttpException)
      res.status(error.statusCode).send(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
}
