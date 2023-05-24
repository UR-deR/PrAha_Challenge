import { ApiProperty } from '@nestjs/swagger';
import { AllAttendeesDto } from '../../../app/get-all-attendees/query-service';
import { AttendeeStatus } from '../../../domain/attendee-status/model';

export class GetAllAttendeesResponse {
  @ApiProperty({ type: () => [Attendee] })
  all_attendees: Attendee[];

  constructor(allAttendeesDto: AllAttendeesDto) {
    this.all_attendees = allAttendeesDto.attendee.map(({ email, ...rest }) => ({
      email: email.value,
      ...rest,
    }));
  }
}

class Attendee {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: AttendeeStatus;

  public constructor(
    id: string,
    name: string,
    email: string,
    status: AttendeeStatus,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }
}
