import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { SafeUser } from '../types/user.types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SafeUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    const { password, ...res } = request['user'] as User;
    console.log(res);
    // Pour supprimer l'erreur eslint
    void password;
    return res;
  },
);
