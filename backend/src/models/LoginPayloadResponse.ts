import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadResponse {
  @ApiProperty()
  token: string;
}
