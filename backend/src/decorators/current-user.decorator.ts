import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { SafeUser, toSafeUser } from '../types/user.types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SafeUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    return toSafeUser(request['user'] as User);
  },
);
