import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRentalDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  picture: string;

  @IsPositive()
  @ApiProperty()
  price: number;

  @IsPositive()
  @ApiProperty()
  surface: number;
}
