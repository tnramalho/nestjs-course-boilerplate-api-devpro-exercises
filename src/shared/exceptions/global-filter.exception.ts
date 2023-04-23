import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const INTERNAL_SERVER_ERROR = 'Internal server error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      statusCode,
      message: error['response']?.message || INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
