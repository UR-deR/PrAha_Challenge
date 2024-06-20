import { ApiProperty } from '@nestjs/swagger';
import { GetAllParticipantsDto } from '../../../app/usecases/get-all-participants.usecase';

class Participant {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: string;

  constructor(id: string, name: string, email: string, status: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }
}

export class GetAllParticipantsResponse {
  @ApiProperty({ type: () => [Participant] })
  all_participants: Participant[];

  constructor(allParticipants: GetAllParticipantsDto) {
    this.all_participants = allParticipants.value;
  }
}
