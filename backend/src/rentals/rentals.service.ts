import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRentalDto } from '../models/CreateRentalDto';
import { SafeUser } from '../types/user.types';
import { RentalDto } from '../models/RentalDto';
import { MessageResponse } from '../models/MessageResponse';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RentalDto[]> {
    return this.prisma.rental.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<RentalDto | null> {
    return this.prisma.rental.findFirst({
      where: { id: id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(
    user: SafeUser,
    data: CreateRentalDto,
  ): Promise<MessageResponse> {
    const now = new Date();

    await this.prisma.rental.create({
      data: {
        name: data.name,
        picture: data.picture,
        description: data.description,
        price: data.price,
        surface: data.surface,
        created_at: now,
        updated_at: now,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return { message: 'Rental created!' };
  }

  async update(
    user: SafeUser,
    id: number,
    data: CreateRentalDto,
  ): Promise<MessageResponse> {
    const rental = await this.findOne(id);
    if (rental === null) {
      throw new NotFoundException('No rental found');
    }
    if (rental.owner.id !== user.id) {
      throw new ForbiddenException('Forbidden');
    }

    const now = new Date();
    await this.prisma.rental.update({
      where: { id: id },
      data: {
        name: data.name,
        picture: data.picture,
        description: data.description,
        price: data.price,
        surface: data.surface,
        updated_at: now,
      },
    });

    return { message: 'Rental updated!' };
  }
}
