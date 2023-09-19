import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { PairId, TeamId } from '../../domain/id/id';
import { IParticipantAssignmentRepository } from '../../domain/participant-assignment/participant-assignment-repository';
import { ITeamRepository } from '../../domain/team/team-repository';

export class SwapTeamPairUsecaseParam {
  constructor(
    public readonly pairId: PairId,
    public readonly newTeamId: TeamId,
  ) {}
}

@Injectable()
export class SwapTeamPairUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private readonly participantAssignmentRepository: IParticipantAssignmentRepository,
    @Inject(INJECTION_TOKENS.TEAM_REPOSITORY)
    private readonly teamRepository: ITeamRepository,
  ) {}
  public async do({
    pairId,
    newTeamId,
  }: SwapTeamPairUsecaseParam): Promise<void> {
    const oldTeam = await this.teamRepository.findByPairId(pairId);

    if (!oldTeam) {
      throw new Error(`Team not found for pair ${pairId.toString()}`);
    }
    const newTeam = await this.teamRepository.findById(newTeamId);

    if (!newTeam) {
      throw new Error(`Team not found for id ${newTeamId.toString()}`);
    }

    const participantAssignments =
      await this.participantAssignmentRepository.findAllByPairId(pairId);

    const participantIds = participantAssignments.map(
      ({ participantId }) => participantId,
    );

    oldTeam.removePairs([pairId]).removeMembers(participantIds);
    newTeam.acceptNewPairs([pairId]).acceptNewMembers(participantIds);

    await Promise.all(
      participantAssignments.map((participantAssignment) =>
        this.participantAssignmentRepository.upsert({
          ...participantAssignment,
          teamId: newTeamId,
        }),
      ),
    );
  }
}
