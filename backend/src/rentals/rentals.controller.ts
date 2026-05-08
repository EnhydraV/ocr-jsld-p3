import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateRentalDto } from '../models/CreateRentalDto';
import { RentalListResponse } from '../models/RentalListResponse';
import { RentalResponse } from '../models/RentalResponse';
import type { SafeUser } from '../types/user.types';
import { MessageResponse } from '../models/MessageResponse';

@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: "L'utilisateur n'est pas authentifié",
})
@ApiBadRequestResponse({ description: 'Format des données invalide' })
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Liste des locations',
    type: RentalListResponse,
  })
  @ApiOperation({ summary: 'Liste des locations' })
  async list() {
    return Promise.resolve({ rentals: await this.rentalsService.findAll() });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Retourne la location', type: RentalResponse })
  @ApiOperation({ summary: 'Informations sur une location' })
  @ApiNotFoundResponse({ description: "La location n'existe pas" })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rental = await this.rentalsService.findOne(id);
    if (!rental) {
      throw new NotFoundException("La location n'existe pas");
    }
    return rental;
  }

  @Post()
  @ApiOperation({ summary: 'Créer une location' })
  @ApiCreatedResponse({
    description: 'Location créée',
    type: MessageResponse,
  })
  async create(@CurrentUser() user: SafeUser, @Body() data: CreateRentalDto) {
    return this.rentalsService.create(user, data);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiCreatedResponse({
    description: 'Location modifiée',
    type: MessageResponse,
  })
  @ApiForbiddenResponse({
    description: "L'utilisateur n'est pas autorisé à modifier cette location",
  })
  @ApiOperation({ summary: 'Modifier une location' })
  @ApiNotFoundResponse({ description: "La location n'existe pas" })
  async update(
    @CurrentUser() user: SafeUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateRentalDto,
  ) {
    return this.rentalsService.update(user, id, data);
  }
}
