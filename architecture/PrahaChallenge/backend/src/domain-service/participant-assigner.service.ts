import { Inject, Injectable } from '@nestjs/common';
import { IPairRepository } from '../domain/pair/pair-repository';
import { ITeamRepository } from '../domain/team/team-repository';
import { Participant } from '../domain/participant/participant';
import { Team } from '../domain/team/team';
import { Pair } from '../domain/pair/pair';
import { INJECTION_TOKENS } from '../injection-tokens';
import { IParticipantAssignmentRepository } from '../domain/participant-assignment/participant-assignment-repository';
import { ParticipantAssignment } from '../domain/participant-assignment/participant-assignment';

@Injectable()
export class ParticipantAssigner {
  public constructor(
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private PairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.TEAM_REPOSITORY)
    private TeamRepository: ITeamRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_ASSIGNMENT_REPOSITORY)
    private ParticipantAssignmentRepository: IParticipantAssignmentRepository,
  ) {}
  public async assign(newParticipant: Participant): Promise<void> {
    const fewestMemberTeam = await this.getFewestMemberTeam();

    const vacantPair = await this.getVacantPair(fewestMemberTeam);
    if (vacantPair) {
      await this.ParticipantAssignmentRepository.register(
        ParticipantAssignment.create(
          fewestMemberTeam.id,
          vacantPair.id,
          newParticipant.id,
        ),
      );
      return;
    }

    const newVacantPair = await this.createVacantPairInFewestMemberTeam(
      fewestMemberTeam,
      newParticipant,
    );

    await this.ParticipantAssignmentRepository.register(
      ParticipantAssignment.create(
        fewestMemberTeam.id,
        newVacantPair.id,
        newParticipant.id,
      ),
    );
  }

  private async getFewestMemberTeam(): Promise<Team> {
    const allTeams = await this.TeamRepository.findAll();

    const fewestMemberTeam = allTeams.reduce((prev, current) => {
      if (prev.participantIds.length < current.participantIds.length) {
        return prev;
      }
      return current;
    });

    return fewestMemberTeam;
  }

  private async getVacantPair(team: Team): Promise<Pair | null> {
    const participantAssingments =
      await this.ParticipantAssignmentRepository.findAllByTeamId(team.id);

    const pairIds = participantAssingments.map(({ pairId }) => pairId);

    for (const pairId of pairIds) {
      const pair = await this.PairRepository.findById(pairId);
      if (pair.isVacant) {
        return pair;
      }
    }
    return null;
  }

  private async createVacantPairInFewestMemberTeam(
    fewestMemberTeam: Team,
    newParticipant: Participant,
  ): Promise<Pair> {
    const [randomNotVacantPairId] = fewestMemberTeam.pairIds;
    const randomNotVacantPair = await this.PairRepository.findById(
      randomNotVacantPairId,
    );
    const [leavingMemberId] = randomNotVacantPair.pairMemberIds;
    const existingPairs = await this.PairRepository.findAll();
    const newVacantPair = Pair.create(
      [leavingMemberId, newParticipant.id],
      existingPairs,
    );

    await this.PairRepository.register(newVacantPair);

    await this.ParticipantAssignmentRepository.update(
      ParticipantAssignment.create(
        fewestMemberTeam.id,
        newVacantPair.id,
        leavingMemberId,
      ),
    );

    return newVacantPair;
  }
}
