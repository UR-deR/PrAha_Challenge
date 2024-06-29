import { Inject, Injectable } from '@nestjs/common';
import { IPairRepository } from '../domain/pair/pair-repository';
import { ITeamRepository } from '../domain/team/team-repository';
import { Participant } from '../domain/participant/participant';
import { INJECTION_TOKENS } from '../injection-tokens';
import { IParticipantAssignmentRepository } from '../domain/participant-assignment/participant-assignment-repository';
import { ParticipantAssignment } from '../domain/participant-assignment/participant-assignment';
import { VacantPairFinder } from './vacant-pair-finder.service';
import { PairSplitter } from './pair-spliter.service';

@Injectable()
export class ParticipantAssigner {
  public constructor(
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private pairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.TEAM_REPOSITORY)
    private teamRepository: ITeamRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private participantAssignmentRepository: IParticipantAssignmentRepository,
    private readonly vacantPairFinder: VacantPairFinder,
    private readonly pairSplitter: PairSplitter,
  ) {}
  public async assign(newParticipant: Participant): Promise<void> {
    const fewestMemberTeam = await this.teamRepository.findFewestMemberTeam();
    const vacantPair = await this.vacantPairFinder.find(fewestMemberTeam);

    if (vacantPair) {
      await this.participantAssignmentRepository.upsert(
        ParticipantAssignment.create(
          fewestMemberTeam.id,
          vacantPair[0].id,
          newParticipant.id,
        ),
      );
    } else {
      const [nonvacantPairId] = fewestMemberTeam.pairIds;
      const nonvacantPair = await this.pairRepository.findById(nonvacantPairId);
      if (!nonvacantPair) {
        throw new Error(`Pair not found. id: ${nonvacantPairId.toString()}`);
      }

      await this.pairSplitter.split(
        fewestMemberTeam.id,
        nonvacantPair.pairMemberIds[0],
        newParticipant.id,
      );
    }
  }
}
