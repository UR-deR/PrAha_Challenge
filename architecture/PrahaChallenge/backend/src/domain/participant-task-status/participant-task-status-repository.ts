import { ParticipantId, TaskId } from '../id/id';
import { ParticipantTaskStatus } from './participant-task-status';

export interface IParticipantTaskStatusRepository {
  find: (
    participantId: ParticipantId,
    taskId: TaskId,
  ) => Promise<ParticipantTaskStatus | undefined>;
  update: (participantTaskStatus: ParticipantTaskStatus) => Promise<void>;
}
