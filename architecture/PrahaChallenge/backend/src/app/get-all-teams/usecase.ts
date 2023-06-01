import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { Team } from '../../domain/team/model';
import { ITeamRepository } from '../../domain/team/repository';

type Dto = {
  id: string;
  name: string;
}[];

export class GetAllTeamsDto {
  public readonly value: Dto;
  constructor(teams: Team[]) {
    this.value = teams.map(({ id, name }) => ({
      id: id.value,
      name: name.value.toString(),
    }));
  }
}

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    @Inject(PROVIDERS.TEAM_REPOSITORY)
    private readonly teamRepository: ITeamRepository,
  ) {}
  async do() {
    const teams = await this.teamRepository.findAll();
    return new GetAllTeamsDto(teams);
  }
}
