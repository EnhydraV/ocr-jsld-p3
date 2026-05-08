import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { SafeUser } from '../types/user.types';
import { MessageDto } from '../models/MessageDto';
import { MessageResponse } from '../models/MessageResponse';

@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: "L'utilisateur n'est pas authentifié",
})
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Envoie un message',
    type: MessageResponse,
  })
  @ApiOperation({ summary: 'Envoyer un message' })
  @ApiBadRequestResponse({ description: 'Format des données invalide' })
  async message(@CurrentUser() user: SafeUser, @Body() data: MessageDto) {
    return this.messagesService.sendMessage(user, data);
  }
}
