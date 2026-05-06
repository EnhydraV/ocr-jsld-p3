import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsPositive()
  rental_id: number;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  user_id: number;
}
