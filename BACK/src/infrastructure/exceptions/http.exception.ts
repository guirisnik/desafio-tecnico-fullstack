import { StatusCodes } from "http-status-codes";

export class HttpException {
  constructor(
    readonly statusCode: StatusCodes,
    readonly message: string | string[]
  ) {}
}

export class BadRequestException extends HttpException {
  readonly name = "BadRequestException";
  constructor(readonly message: string | string[]) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundException extends HttpException {
  readonly name = "NotFoundException";
  constructor(readonly message: string | string[]) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class UnauthorizedException extends HttpException {
  readonly name = "UnauthorizedException";
  constructor(readonly message: string | string[]) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
