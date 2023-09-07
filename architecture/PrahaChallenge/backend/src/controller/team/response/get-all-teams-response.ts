import { ApiProperty } from '@nestjs/swagger';
import { GetAllTeamsDto } from '../../../app/usecases/get-all-teams.usecase';

class Team {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  participants: {
    id: string;
    name: string;
    pair_id: string;
  }[];

  constructor(
    id: string,
    name: string,
    participants: {
      id: string;
      name: string;
      pair_id: string;
    }[],
  ) {
    this.id = id;
    this.name = name;
    this.participants = participants;
  }
}

export class GetAllTeamsResponse {
  @ApiProperty({ type: () => [Team] })
  all_teams: Team[];

  constructor(allTeam: GetAllTeamsDto) {
    this.all_teams = allTeam.value.map(
      (team) =>
        new Team(
          team.id,
          team.name,
          team.participants.map(({ pairId, ...rest }) => ({
            ...rest,
            pair_id: pairId,
          })),
        ),
    );
  }
}
