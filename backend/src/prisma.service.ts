import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const adapter = new PrismaMariaDb({
      connectionLimit: 10,
      host: configService.get('DB_HOST') as string,
      port: configService.get('DB_PORT')
        ? parseInt(configService.get('DB_PORT') as string)
        : undefined,
      user: configService.get('DB_USER') as string,
      password: configService.get('DB_PASSWORD') as string,
      database: configService.get('DB_NAME') as string,
      ssl: false,
      allowPublicKeyRetrieval: true,
    });

    super({ adapter });
  }
}
