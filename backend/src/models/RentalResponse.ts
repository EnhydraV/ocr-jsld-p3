import { ApiProperty } from '@nestjs/swagger';
import { OwnerResponse } from './OwnerResponse';

export class RentalResponse {
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
  owner_id: number;

  @ApiProperty()
  owner: OwnerResponse;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
