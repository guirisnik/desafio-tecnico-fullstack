import { Router } from "express";
import { HttpException } from "../infrastructure/exceptions/http.exception";
import { Card, CardRequest, CardResponse } from "./cards.dto";
import { loggerMiddleware, validationMiddleware } from "./cards.middleware";
import CardService from "./cards.service";
import { StatusCodes } from "http-status-codes";

const router = Router({ caseSensitive: true });

router.get<string, any, CardResponse[]>("/", async (_req, res) => {
  const cards = await CardService.findAll();
  res.status(StatusCodes.OK).json(cards);
});

router.post<string, any, CardResponse, CardRequest>(
  "/",
  validationMiddleware,
  async (req, res) => {
    const createdCard = await CardService.create(req.body);
    res.status(StatusCodes.CREATED).json(createdCard);
  }
);

router.put<{ id: string }, CardResponse | HttpException, CardRequest>(
  "/:id",
  validationMiddleware,
  async (req, res, next) => {
    try {
      const updatedCard = await CardService.update(req.params.id, req.body);
      res.locals.body = updatedCard;
      res.locals.card = updatedCard;
    } catch (error: unknown) {
      if (error instanceof HttpException)
        res.status(error.statusCode).send(error);
    }
    next();
  },
  loggerMiddleware
);

router.delete<{ id: string }, CardResponse | HttpException>(
  "/:id",
  async (req, res, next) => {
    try {
      const deletedCard = await CardService.delete(req.params.id);
      const remainingCards = await CardService.findAll();
      res.locals.card = deletedCard;
      res.locals.body = remainingCards;
    } catch (error: unknown) {
      if (error instanceof HttpException)
        res.status(error.statusCode).send(error);
    }
    next();
  },
  loggerMiddleware
);

const CardsController = Router({ caseSensitive: true });

export default CardsController.use("/cards", router);
