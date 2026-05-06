import { Injectable } from '@nestjs/common';
import { SafeUser } from '../types/user.types';
import { MessageDto } from '../models/MessageDto';
import { PrismaService } from '../prisma.service';
import { MessageResponse } from '../models/MessageResponse';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    user: SafeUser,
    data: MessageDto,
  ): Promise<MessageResponse> {
    const now = new Date();

    await this.prisma.message.create({
      data: {
        message: data.message,
        rental: {
          connect: {
            id: data.rental_id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        created_at: now,
        updated_at: now,
      },
    });

    return { message: 'Message bien envoyé !' };
  }
}
