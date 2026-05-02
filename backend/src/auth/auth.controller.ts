import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../models/RegisterDto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {User} from "@prisma/client";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscrire un utilisateur' })
  @ApiResponse({ status: 201, description: "L'utilisateur a été inscrit" })
  @ApiBadRequestResponse({
    description:
      "Les données sont incomplètes ou invalides, ou l'email existe déjà",
  })
  async register(@Body() data: RegisterDto): Promise<any> {
    return await this.authService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiResponse({ status: 200, description: "L'utilisateur est authentifié" })
  @ApiUnauthorizedResponse({ description: 'Les identifiants sont incorrects' })
  async login(@Request() req) {
    return await this.authService.login(req.user as User);
  }
}
