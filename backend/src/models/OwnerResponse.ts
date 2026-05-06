import { ApiProperty } from '@nestjs/swagger';

export class OwnerResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
