import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../models/RegisterDto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserResponse } from '../models/UserResponse';
import { LoginDto } from '../models/LoginDto';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { SafeUser } from '../types/user.types';
import { LoginPayloadResponse } from '../models/LoginPayloadResponse';
import { JwtAuth } from '../decorators/jwt-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscrire un utilisateur' })
  @ApiOkResponse({
    description: "L'utilisateur a été inscrit",
    type: LoginPayloadResponse,
  })
  @ApiBadRequestResponse({
    description:
      "Les données sont incomplètes ou invalides, ou l'email existe déjà",
  })
  async register(@Body() data: RegisterDto): Promise<LoginPayloadResponse> {
    return await this.authService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiOkResponse({
    description: "L'utilisateur est authentifié",
    type: LoginPayloadResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Les identifiants sont incorrects' })
  @ApiBody({ type: LoginDto })
  async login(@CurrentUser() user: SafeUser): Promise<any> {
    return await this.authService.login(user);
  }

  @JwtAuth()
  @Get('me')
  @ApiOperation({ summary: "Récupère l'utilisateur courant" })
  @ApiOkResponse({
    description: "Les données de l'utilisateur authentifié",
    type: UserResponse,
  })
  async me(@CurrentUser() user: SafeUser): Promise<SafeUser> {
    return Promise.resolve(user);
  }
}
