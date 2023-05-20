import { ApiProperty } from '@nestjs/swagger';
import { AllTeamsDto } from '../../usecase/get-all-teams/query-service';

export class GetAllTeamsResponse {
  @ApiProperty({ type: () => [Team] })
  all_teams: Team[];

  public constructor({ team }: AllTeamsDto) {
    this.all_teams = team;
  }
}

class Team {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
