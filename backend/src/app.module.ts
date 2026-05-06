import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { RentalsModule } from './rentals/rentals.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: '',
            module: AuthModule,
          },
          {
            path: '',
            module: UsersModule,
          },
          {
            path: '',
            module: RentalsModule,
          },
          {
            path: '',
            module: MessagesModule,
          },
        ],
      },
    ]),
    RentalsModule,
    MessagesModule,
  ],
})
export class AppModule {}
