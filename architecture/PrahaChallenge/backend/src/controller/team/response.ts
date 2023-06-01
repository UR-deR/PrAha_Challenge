import { ApiProperty } from '@nestjs/swagger';
import { GetAllTeamsDto } from '../../app/get-all-teams/usecase';

export class GetAllTeamsResponse {
  @ApiProperty({ type: () => [Team] })
  all_teams: Team[];

  public constructor({ value }: GetAllTeamsDto) {
    this.all_teams = value;
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
