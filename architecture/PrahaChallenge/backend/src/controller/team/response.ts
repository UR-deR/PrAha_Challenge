import { ApiProperty } from '@nestjs/swagger';
import { AllTeamsDto } from '../../app/get-all-teams/query-service';

export class GetAllTeamsResponse {
  @ApiProperty({ type: () => [Team] })
  all_teams: Team[];

  public constructor({ teams }: AllTeamsDto) {
    this.all_teams = teams;
  }
}

class Team {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
