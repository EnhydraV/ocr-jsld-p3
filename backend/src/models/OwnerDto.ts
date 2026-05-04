import { ApiProperty } from '@nestjs/swagger';

export class OwnerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
