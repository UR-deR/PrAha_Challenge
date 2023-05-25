import { Attendee as AttendeeModel } from './../../../domain/attendee/model';
import { ApiProperty } from '@nestjs/swagger';
import { AttendeeStatus } from '../../../domain/attendee-status/model';

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

export class GetAllAttendeesResponse {
  @ApiProperty({ type: () => [Attendee] })
  all_attendees: Attendee[];

  constructor(allAttendees: AttendeeModel[]) {
    this.all_attendees = allAttendees.map(({ id, name, email, status }) => {
      return new Attendee(id.value, name, email.value, status);
    });
  }
}
