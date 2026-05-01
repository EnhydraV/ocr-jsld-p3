import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    return this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        created_at: now,
        updated_at: now,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    /**
     *  Si l'utilisateur est dans la base et que le hash en base de données
     *  correspond au mot de passe entrée, l'authentification est valide.
     *  https://docs.nestjs.com/security/encryption-and-hashing#hashing
     **/

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
