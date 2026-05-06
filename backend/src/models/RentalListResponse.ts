import { ApiProperty } from '@nestjs/swagger';
import { RentalResponse } from './RentalResponse';

export class RentalListResponse {
  @ApiProperty({ type: () => RentalResponse, isArray: true })
  rentals: RentalResponse[];
}
