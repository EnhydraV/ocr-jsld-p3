import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export const JwtAuth = () =>
  applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiUnauthorizedResponse({
      description: "L'utilisateur n'est pas authentifié",
    }),
    ApiSecurity('bearer'),
    ApiBearerAuth(),
  );
