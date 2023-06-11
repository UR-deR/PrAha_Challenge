import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssignmentStatusRequest {
  @ApiProperty()
  attendeeId: string;
  @ApiProperty()
  assignmentId: string;
  @ApiProperty()
  status: string;
}
