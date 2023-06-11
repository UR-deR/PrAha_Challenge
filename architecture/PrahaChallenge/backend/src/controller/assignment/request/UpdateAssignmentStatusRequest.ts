import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssignmentStatusRequest {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  attendeeId: string;
  @ApiProperty()
  assignmentId: string;
  @ApiProperty()
  status: string;
}
