import { Inject, Injectable } from '@nestjs/common';
import { IGetAllTeamsQueryService } from './query-service';
import { PROVIDERS } from '../../constants';

@Injectable()
export class GetAllTeamsUsecase {
  constructor(
    @Inject(PROVIDERS.GET_ALL_TEAMS_QUERY_SERVICE)
    private readonly getAllTeamsQuerySerivice: IGetAllTeamsQueryService,
  ) {}
  async do() {
    const teams = await this.getAllTeamsQuerySerivice.execute();
    return teams;
  }
}
