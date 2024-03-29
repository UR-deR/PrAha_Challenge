import { PairId, ParticipantId, TeamId } from '../id/id';
import { ParticipantAssignment } from './participant-assignment';

export interface IParticipantAssignmentRepository {
  upsert(participantAssignment: ParticipantAssignment): Promise<void>;
  findAllByTeamId(teamId: TeamId): Promise<ParticipantAssignment[]>;
  findAllByPairId(pairId: PairId): Promise<ParticipantAssignment[]>;
  findByParticipantId(
    participantId: ParticipantId,
  ): Promise<ParticipantAssignment>;
  delete(participantId: ParticipantId): Promise<void>;
}
