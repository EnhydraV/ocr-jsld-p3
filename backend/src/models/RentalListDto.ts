import { ApiProperty } from '@nestjs/swagger';
import { RentalDto } from './RentalDto';

export class RentalListDto {
  @ApiProperty({ type: () => RentalDto, isArray: true })
  rentals: RentalDto[];
}
