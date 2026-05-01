import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: { name: string; email: string; password: string },
  ): Promise<User> {
    console.log(data);
    return await this.authService.register(
      data.name,
      data.email,
      data.password,
    );
  }
}
