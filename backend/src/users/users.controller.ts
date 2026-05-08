import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserResponse } from '../models/UserResponse';
import { UsersService } from './users.service';
import { JwtAuth } from '../decorators/jwt-auth.decorator';

@JwtAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: "Retourne l'utilisateur",
    type: UserResponse,
  })
  @ApiOperation({ summary: 'Informations sur un utilisateur' })
  @ApiNotFoundResponse({ description: "L'utilisateur n'existe pas" })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }
}
