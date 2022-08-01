import { Router } from "express";
import * as jwt from "jsonwebtoken";
import {
  HttpException,
  UnauthorizedException,
} from "../infrastructure/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { AuthRequest, AuthResponse } from "./auth.dto";
import AuthService from "./auth.service";

const AuthController = Router({ caseSensitive: true });

AuthController.post<string, any, AuthResponse | HttpException, AuthRequest>(
  "/login",
  (req, res) => {
    try {
      const authResponse = AuthService.authenticate(req.body);
      res.status(StatusCodes.OK).json(authResponse);
    } catch (error: unknown) {
      if (error instanceof HttpException)
        res.status(error.statusCode).send(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default AuthController;
