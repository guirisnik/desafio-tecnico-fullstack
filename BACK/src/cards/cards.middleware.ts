import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { HttpException } from "../infrastructure/exceptions/http.exception";
import { Card, isCard, isCardRequest } from "./cards.dto";

export function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (isCardRequest(req.body)) return next();
  } catch (error: unknown) {
    if (error instanceof HttpException)
      res.status(error.statusCode).send(error);
  }
}

const enum Action {
  PUT = "Alterado",
  DELETE = "Removido",
}

export function loggerMiddleware(
  req: Request,
  res: Response<Card>,
  next: NextFunction
) {
  if (isCard(res.locals["card"])) {
    const now = DateTime.fromJSDate(new Date()).toFormat("dd/LL/yyyy HH:mm:ss");
    const { id, titulo } = res.locals["card"];
    const action: Action = req.method === "PUT" ? Action.PUT : Action.DELETE;
    console.log(`${now} - Card ${id} - ${titulo} - ${action}`);
  }
  res.status(200).json(res.locals["body"]);
}
