import { ApiProperty } from '@nestjs/swagger';
import { TaskId } from '../../../domain/id/id';
import { TaskStatus } from '../../../domain/task-status/task-status';
import { SearchSpecificTaskStatusParticipantsParams } from '../../../app/usecases/search-specific-task-status-participants.usecase';

export class SearchSpecificTaskStatusParticipantsRequest {
  condition: {
    task_id: string;
    task_status: string;
  }[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        task_id: {
          type: 'string',
        },
        task_status: {
          type: 'string',
        },
      },
    },
  })
  static toUsecaseParams(
    request: SearchSpecificTaskStatusParticipantsRequest,
  ): SearchSpecificTaskStatusParticipantsParams {
    return {
      condition: request.condition.map((condition) => {
        return {
          taskId: new TaskId(condition.task_id),
          taskStatus: TaskStatus.valueOf(condition.task_status),
        };
      }),
    };
  }
}
