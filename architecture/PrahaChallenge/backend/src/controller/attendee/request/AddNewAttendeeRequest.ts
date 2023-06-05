import { ApiProperty } from '@nestjs/swagger';

export class AddNewAttendeeRequest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
