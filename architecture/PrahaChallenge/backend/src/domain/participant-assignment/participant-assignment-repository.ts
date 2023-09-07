import { ParticipantId, TeamId } from '../id/id';
import { ParticipantAssignment } from './participant-assignment';

export interface IParticipantAssignmentRepository {
  register(participantAssignment: ParticipantAssignment): Promise<void>;
  update(participantAssignment: ParticipantAssignment): Promise<void>;
  findAllByTeamId(teamId: TeamId): Promise<ParticipantAssignment[]>;
  findByParticipantId(
    participantId: ParticipantId,
  ): Promise<ParticipantAssignment>;
}
