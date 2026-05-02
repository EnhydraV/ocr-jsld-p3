import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../models/RegisterDto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserResponseDto } from '../models/UserResponseDto';
import { LoginResponseDto } from '../models/LoginResponseDto';
import { LoginDto } from '../models/LoginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscrire un utilisateur' })
  @ApiCreatedResponse({ description: "L'utilisateur a été inscrit" })
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
  @ApiOkResponse({
    description: "L'utilisateur est authentifié",
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Les identifiants sont incorrects' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return await this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: "Récupère l'utilisateur courant" })
  @ApiOkResponse({
    description: "Les données de l'utilisateur authentifié",
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "L'utilisateur n'est pas authentifié",
  })
  @ApiSecurity('bearer')
  @ApiBearerAuth()
  async me(@Request() req): Promise<Omit<User, 'password'>> {
    const { password, ...res } = req.user as User;
    return Promise.resolve(res);
  }
}
