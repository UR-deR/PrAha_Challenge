import { Inject } from '@nestjs/common';
import { ParticipantId, TaskId } from '../../domain/id/id';
import { TaskStatus } from '../../domain/task-status/task-status';
import { ISearchSpecificTaskStatusParticipants } from '../query-services/search-specific-task-status-participants';
import { INJECTION_TOKENS } from '../../injection-tokens';

export type SearchSpecificTaskStatusParticipantsParams = {
  condition: {
    taskId: TaskId;
    taskStatus: TaskStatus;
  }[];
};

export class SearchSpecificTaskStatusParticipantsDto {
  value: {
    taskId: TaskId;
    taskName: string;
    taskStatus: TaskStatus;
    participants: {
      id: ParticipantId;
      name: string;
    }[];
  }[];

  constructor(
    value: {
      taskId: TaskId;
      taskName: string;
      taskStatus: TaskStatus;
      participants: {
        id: ParticipantId;
        name: string;
      }[];
    }[],
  ) {
    this.value = value;
  }
}

export class SearchSpecificTaskStatusParticipantsUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.SEARCH_SPECIFIC_TASK_STATUS_PARTICIPANTS)
    private readonly searchSpecificTaskStatusParticipants: ISearchSpecificTaskStatusParticipants,
  ) {}

  async do(
    params: SearchSpecificTaskStatusParticipantsParams,
  ): Promise<SearchSpecificTaskStatusParticipantsDto> {
    const dto = await this.searchSpecificTaskStatusParticipants.execute(params);
    return dto;
  }
}
