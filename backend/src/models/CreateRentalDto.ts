import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
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
}
