import { Participant } from './../domain/participant/participant';
import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../injection-tokens';
import { IParticipantAssignmentRepository } from '../domain/participant-assignment/participant-assignment-repository';
import { ITeamRepository } from '../domain/team/team-repository';
import { IPairRepository } from '../domain/pair/pair-repository';
import { VacantPairFinder } from './vacant-pair-finder.service';
import { ParticipantId } from '../domain/id/id';
import { Team } from '../domain/team/team';
import { ParticipantAssignment } from '../domain/participant-assignment/participant-assignment';
import { Pair } from '../domain/pair/pair';
import { PairSplitter } from './pair-spliter.service';

@Injectable()
export class InactiveParticipantRemover {
  public constructor(
    @Inject(INJECTION_TOKENS.TEAM_REPOSITORY)
    private readonly teamRepository: ITeamRepository,
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private readonly pairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private readonly participantAssignmentRepository: IParticipantAssignmentRepository,
    private readonly vacantPairFinder: VacantPairFinder,
    private readonly pairSplitter: PairSplitter,
  ) {}
  public async remove(inactiveParticipant: Participant): Promise<void> {
    const inactiveParticipantAssignment =
      await this.participantAssignmentRepository.findByParticipantId(
        inactiveParticipant.id,
      );

    const team = await this.teamRepository.findById(
      inactiveParticipantAssignment.teamId,
    );

    if (!team) {
      throw new Error(
        `Team not found. id: ${inactiveParticipantAssignment.teamId.toString()}`,
      );
    }

    if (!team.canRemoveMember) {
      //TODO throw exception to notify administrator via email
      console.log(
        "Can't remove member from team because team has only three members.",
      );
      return;
    }

    const pair = await this.pairRepository.findById(
      inactiveParticipantAssignment.pairId,
    );

    if (!pair) {
      throw new Error(
        `Pair not found. id: ${inactiveParticipantAssignment.pairId.toString()}`,
      );
    }

    console.debug(`pair.canRemoveMember: ${pair.canRemoveMember}`);

    if (pair.canRemoveMember) {
      await this.removeInactiveParticipantFromTeamAndPair(
        inactiveParticipantAssignment,
      );
    } else {
      await this.transferActiveParticipantToVacantPair(
        team,
        pair,
        inactiveParticipant.id,
      );

      await this.removeInactiveParticipantFromTeamAndPair(
        inactiveParticipantAssignment,
      );

      await this.pairRepository.delete(pair);
    }
  }

  private async transferActiveParticipantToVacantPair(
    team: Team,
    pair: Pair,
    inactiveParticipantId: ParticipantId,
  ): Promise<void> {
    const activeParticipantId = this.getActiveParticipantIdFromPair(
      pair,
      inactiveParticipantId,
    );

    const vacantPairs = await this.vacantPairFinder.find(team);

    if (vacantPairs) {
      const [vacantPair] = vacantPairs.filter(
        (vacantPair) => !vacantPair.id.equals(pair.id),
      );
      await this.participantAssignmentRepository.upsert(
        ParticipantAssignment.create(
          team.id,
          vacantPair.id,
          activeParticipantId,
        ),
      );
      console.debug(
        `Transfered active participant to vacant pair. teamId: ${team.id.toString()}, vacantPairId: ${vacantPair.id.toString()}, activeParticipantId: ${activeParticipantId.toString()}`,
      );
    } else {
      const [nonVacantPairId] = team.pairIds;
      const nonVacantPair = await this.pairRepository.findById(nonVacantPairId);
      if (!nonVacantPair) {
        throw new Error(`Pair not found. id: ${nonVacantPairId.toString()}`);
      }
      const [participantIdToTransfer] = nonVacantPair.pairMemberIds;
      await this.pairSplitter.split(
        team.id,
        participantIdToTransfer,
        activeParticipantId,
      );
    }
  }

  private getActiveParticipantIdFromPair(
    pair: Pair,
    inactiveParticipantId: ParticipantId,
  ): ParticipantId {
    const [activeParticipantId] = pair.pairMemberIds.filter(
      (pairMemberId) => !pairMemberId.equals(inactiveParticipantId),
    );
    return activeParticipantId;
  }

  private async removeInactiveParticipantFromTeamAndPair(
    inactiveParticipantAssignment: ParticipantAssignment,
  ): Promise<void> {
    await this.participantAssignmentRepository.delete(
      inactiveParticipantAssignment,
    );
  }
}
