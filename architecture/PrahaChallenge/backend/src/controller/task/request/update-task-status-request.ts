import { ApiProperty } from '@nestjs/swagger';
import { UpdateTaskStatusParams } from '../../../app/usecases/update-task-status.usecase';
import { ParticipantId, TaskId } from '../../../domain/id/id';
import { TaskStatus } from '../../../domain/task-status/task-status';

export class UpdateTaskStatusRequest {
  @ApiProperty()
  user_id: string; //for simplicity, request body has user_id. In real world, cookie has user_id.
  @ApiProperty()
  task_id: string;
  @ApiProperty()
  new_status: string;
}

export const convertRequestIntoUsecaseParams = (
  request: UpdateTaskStatusRequest,
): UpdateTaskStatusParams => {
  return {
    participantId: new ParticipantId(request.user_id),
    taskId: new TaskId(request.task_id),
    newStatus: TaskStatus.valueOf(request.new_status),
  };
};
