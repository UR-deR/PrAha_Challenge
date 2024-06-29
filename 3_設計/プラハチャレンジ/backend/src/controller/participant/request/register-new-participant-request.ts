import { ApiProperty } from '@nestjs/swagger';

export class RegisterNewParticipantRequest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
