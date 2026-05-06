import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from '../models/RegisterDto';
import { LoginDto } from '../models/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { SafeUser, toSafeUser } from '../types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async register(data: RegisterDto) {
    // Vérifier que l'email n'est pas déjà en base de données
    if ((await this.findByEmail(data.email)) !== null) {
      throw new BadRequestException('This email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const now = new Date();

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        created_at: now,
        updated_at: now,
      },
    });

    return await this.login(toSafeUser(user));
  }

  async validateUser(data: LoginDto): Promise<SafeUser> {
    const user = await this.findByEmail(data.email);

    /**
     *  Si l'utilisateur est dans la base et que le hash en base de données
     *  correspond au mot de passe entrée, l'authentification est valide.
     *  https://docs.nestjs.com/security/encryption-and-hashing#hashing
     **/

    if (user && (await bcrypt.compare(data.password, user.password))) {
      return toSafeUser(user);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: SafeUser) {
    const payload = { email: user.email, sub: user.id };
    return Promise.resolve({
      token: this.jwtService.sign(payload),
    });
  }
}
