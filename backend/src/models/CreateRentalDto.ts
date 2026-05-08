import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRentalDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Type(() => Number)
  @IsPositive()
  @ApiProperty()
  price: number;

  @Type(() => Number)
  @IsPositive()
  @ApiProperty()
  surface: number;
}
