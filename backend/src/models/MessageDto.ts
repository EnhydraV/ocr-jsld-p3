import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  rental_id: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  user_id: number;
}
