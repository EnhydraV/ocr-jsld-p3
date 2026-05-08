import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { SafeUser } from '../types/user.types';
import { MessageDto } from '../models/MessageDto';
import { MessageResponse } from '../models/MessageResponse';
import { JwtAuth } from '../decorators/jwt-auth.decorator';

@JwtAuth()
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
