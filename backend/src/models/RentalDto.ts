import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from './OwnerDto';

export class RentalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  surface: number;

  @ApiProperty()
  owner: OwnerDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
