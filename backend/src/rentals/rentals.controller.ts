import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateRentalDto } from '../models/CreateRentalDto';
import { RentalListDto } from '../models/RentalListDto';
import { RentalDto } from '../models/RentalDto';
import type { SafeUser } from '../types/user.types';

@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: "L'utilisateur n'est pas authentifié",
})
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retourne la liste de toutes les locations',
    type: RentalListDto,
  })
  async list() {
    return Promise.resolve({ rentals: await this.rentalsService.findAll() });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Retourne la location', type: RentalDto })
  @ApiNotFoundResponse({ description: "La location n'existe pas" })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rental = await this.rentalsService.findOne(id);
    if (!rental) {
      throw new NotFoundException("La location n'existe pas");
    }
    return rental;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Crée une nouvelle location',
    type: RentalDto,
  })
  async create(@CurrentUser() user: SafeUser, @Body() data: CreateRentalDto) {
    return this.rentalsService.create(user, data);
  }
}
