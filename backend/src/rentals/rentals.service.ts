import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRentalDto } from '../models/CreateRentalDto';
import { SafeUser } from '../types/user.types';
import { RentalResponse } from '../models/RentalResponse';
import { MessageResponse } from '../models/MessageResponse';
import { mkdir, writeFile } from 'fs/promises';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class RentalsService {
  private readonly logger = new Logger(RentalsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RentalResponse[]> {
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

  async findOne(id: number): Promise<RentalResponse | null> {
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

  async uploadedFileToURL(picture: Express.Multer.File) {
    const basePath = 'uploads/rentals/';
    const frontend = '../frontend/';
    const filename = `${randomUUID()}${extname(picture.originalname)}`;
    try {
      await mkdir(`${frontend}${basePath}`, { recursive: true });
      await writeFile(`${frontend}${basePath}${filename}`, picture.buffer);
    } catch (err) {
      this.logger.error("Impossible d'écrire le fichier uploadé", err);
      throw new InternalServerErrorException(
        "Erreur lors de l'enregistrement du fichier",
      );
    }
    return '/' + basePath + filename;
  }

  async create(
    user: SafeUser,
    data: CreateRentalDto,
    picture: Express.Multer.File,
  ): Promise<MessageResponse> {
    const now = new Date();

    const pictureUrl = await this.uploadedFileToURL(picture);

    await this.prisma.rental.create({
      data: {
        name: data.name,
        picture: pictureUrl,
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
    picture?: Express.Multer.File,
  ): Promise<MessageResponse> {
    const rental = await this.findOne(id);
    if (rental === null) {
      throw new NotFoundException('No rental found');
    }
    if (rental.owner.id !== user.id) {
      throw new ForbiddenException('Forbidden');
    }

    let pictureUrl: undefined | string = undefined;
    if (picture) {
      pictureUrl = await this.uploadedFileToURL(picture);
    }

    await this.prisma.rental.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        surface: data.surface,
        updated_at: new Date(),
        picture: pictureUrl,
      },
    });

    return { message: 'Rental updated!' };
  }
}
