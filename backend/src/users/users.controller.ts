import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../models/UserResponse';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: "L'utilisateur n'est pas authentifié",
})
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: "Retourne l'utilisateur",
    type: UserResponse,
  })
  @ApiNotFoundResponse({ description: "L'utilisateur n'existe pas" })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }
}
