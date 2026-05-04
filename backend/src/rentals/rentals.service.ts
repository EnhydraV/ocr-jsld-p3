import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {CreateRentalDto} from '../models/CreateRentalDto';
import {SafeUser} from '../types/user.types';
import {Rental} from '@prisma/client';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findAll(): Promise<Rental[]> {
    return this.prisma.rental.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          }
        },
      },
    });
  }

  async findOne(id: number): Promise<Rental | null> {
    return this.prisma.rental.findFirst({
      where: {id: id},
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          }
        },
      },
    });
  }

  async create(user: SafeUser, data: CreateRentalDto): Promise<Rental> {
    const now = new Date();

    return this.prisma.rental.create({
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
  }
}
