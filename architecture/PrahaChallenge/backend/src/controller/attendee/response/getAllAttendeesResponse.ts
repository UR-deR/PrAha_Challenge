import { ApiProperty } from '@nestjs/swagger';
import { GetAllAttendeesDto } from '../../../app/get-all-attendees/usecase';

class Attendee {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: string;

  public constructor(id: string, name: string, email: string, status: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }
}

export class GetAllAttendeesResponse {
  @ApiProperty({ type: () => [Attendee] })
  all_attendees: Attendee[];

  constructor(allAttendees: GetAllAttendeesDto) {
    this.all_attendees = allAttendees.value;
  }
}
