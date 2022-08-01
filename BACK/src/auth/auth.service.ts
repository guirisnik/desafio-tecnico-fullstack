import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../infrastructure/exceptions/http.exception";
import { AuthRequest, AuthResponse } from "./auth.dto";
import "./string.extension";

const PRIVATE_KEY = "secretPrivateKey";

const AuthService = {
  authenticate(authRequest: AuthRequest): AuthResponse {
    if (authRequest.login === "letscode" && authRequest.senha === "lets@123") {
      const token = jwt.sign(authRequest, PRIVATE_KEY);
      return { access_token: token, token_type: "Bearer" };
    } else
      throw new UnauthorizedException(
        "Username and/or password were incorrect"
      );
  },

  validate(authorization: string | undefined | null) {
    if (!authorization)
      throw new UnauthorizedException("No authorization was provided");

    const token = authorization.extractBearerToken();
    if (!token) throw new UnauthorizedException("No token was sent");

    try {
      const result = jwt.verify(token, PRIVATE_KEY);
      return result;
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError)
        throw new UnauthorizedException("Invalid token");
    }
  },
};

export default AuthService;
