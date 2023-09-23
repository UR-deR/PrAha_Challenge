import {
  SearchSpecificTaskStatusParticipantsParams,
  SearchSpecificTaskStatusParticipantsDto,
} from '../usecases/search-specific-task-status-participants.usecase';

export interface ISearchSpecificTaskStatusParticipants {
  execute: (
    params: SearchSpecificTaskStatusParticipantsParams,
  ) => Promise<SearchSpecificTaskStatusParticipantsDto>;
}
