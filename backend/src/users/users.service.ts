import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserResponse } from '../models/UserResponse';
import { NotFoundException } from '@nestjs/common';
import { toSafeUser } from '../types/user.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponse | null> {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
    });

    if (user === null) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }
    return toSafeUser(user);
  }
}
