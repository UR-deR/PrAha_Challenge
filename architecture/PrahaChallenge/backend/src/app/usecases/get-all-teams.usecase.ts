import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { Participant } from '../../domain/participant/participant';
import { IParticipantRepository } from '../../domain/participant/participant-repository';
import { ITeamRepository } from '../../domain/team/team-repository';
import { Team } from '../../domain/team/team';
import { Pair } from '../../domain/pair/pair';
import { IPairRepository } from '../../domain/pair/pair-repository';

type TeamDto = {
  id: string;
  name: string;
  participants: {
    id: string;
    name: string;
    pairId: string;
  }[];
}[];

export class GetAllTeamsDto {
  public readonly value: TeamDto;

  constructor(
    allTeams: Team[],
    allPairs: Pair[],
    allParticipants: Participant[],
  ) {
    this.value = allTeams.map((team) => ({
      id: team.id.value,
      name: team.name.value.toString(),
      participants: team.participantIds.map((participantId) => {
        const participant = allParticipants.find((participant) =>
          participant.id.equals(participantId),
        );

        if (!participant) {
          throw new Error(`
            Participant not found. participantId: ${participantId.value}
          `);
        }

        const pair = allPairs.find((pair) =>
          pair.pairMemberIds.find((pairMemberId) =>
            pairMemberId.equals(participantId),
          ),
        );

        if (!pair) {
          throw new Error(`
            Pair not found. participantId: ${participantId.value}
          `);
        }

        return {
          id: participant.id.value,
          name: participant.name,
          pairId: pair.id.value,
        };
      }),
    }));
  }
}

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.TEAM_REPOSITORY)
    private readonly TeamRepository: ITeamRepository,
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private readonly PairRepository: IPairRepository,
    @Inject(INJECTION_TOKENS.PARTICIPANT_REPOSITORY)
    private readonly ParticipantRepository: IParticipantRepository,
  ) {}
  //TODO: QueryServiceを使う
  public async do(): Promise<GetAllTeamsDto> {
    const allTeams = await this.TeamRepository.findAll();
    const allPairs = await this.PairRepository.findAll();
    const allParticipants = await this.ParticipantRepository.findAll();
    return new GetAllTeamsDto(allTeams, allPairs, allParticipants);
  }
}
