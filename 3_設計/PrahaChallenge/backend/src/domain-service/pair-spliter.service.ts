import { Inject } from '@nestjs/common';
import { ParticipantId, TeamId } from '../domain/id/id';
import { INJECTION_TOKENS } from '../injection-tokens';
import { IPairRepository } from '../domain/pair/pair-repository';
import { IParticipantAssignmentRepository } from '../domain/participant-assignment/participant-assignment-repository';
import { Pair } from '../domain/pair/pair';
import { ParticipantAssignment } from '../domain/participant-assignment/participant-assignment';

export class PairSplitter {
  public constructor(
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private pairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private participantAssignmentRepository: IParticipantAssignmentRepository,
  ) {}
  public async split(
    teamId: TeamId,
    participantIdToTransfer: ParticipantId,
    participantIdFromElseWhere: ParticipantId,
  ): Promise<void> {
    const allPairs = await this.pairRepository.findAll();
    const newPair = Pair.create(
      [participantIdToTransfer, participantIdFromElseWhere],
      allPairs,
    );

    await this.pairRepository.register(newPair);

    await Promise.all(
      newPair.pairMemberIds.map((participantId) =>
        this.participantAssignmentRepository.upsert(
          ParticipantAssignment.create(teamId, newPair.id, participantId),
        ),
      ),
    );
  }
}
