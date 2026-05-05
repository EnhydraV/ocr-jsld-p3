import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'password'>;

export function toSafeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  void password;
  return safeUser;
}
