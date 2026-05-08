import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientInitializationError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const { statusCode, message } = this.resolveKnownError(exception);
      return response
        .status(statusCode)
        .json({ statusCode, message, error: 'Database Error' });
    }

    this.logger.error(
      'Impossible de joindre la base de données',
      exception.message,
    );
    const err = new InternalServerErrorException();
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(err.getResponse());
  }

  private resolveKnownError(exception: Prisma.PrismaClientKnownRequestError): {
    statusCode: number;
    message: string;
  } {
    switch (exception.code) {
      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Ressource introuvable',
        };
      case 'P2002':
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'Cette ressource existe déjà',
        };
      case 'P2003':
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Référence invalide',
        };
      default:
        this.logger.error(
          `Erreur Prisma non gérée : ${exception.code}`,
          exception.message,
        );
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erreur interne',
        };
    }
  }
}
