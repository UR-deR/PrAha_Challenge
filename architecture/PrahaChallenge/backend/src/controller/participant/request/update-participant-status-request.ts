import { ApiProperty } from '@nestjs/swagger';

export class UpdateParticipantStatusRequest {
  @ApiProperty()
  participant_id: string;
  @ApiProperty()
  status: string;
}
