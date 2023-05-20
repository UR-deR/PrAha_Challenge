import { IGetAllTeamsQueryService } from './query-service';

export class GetAllTeamsUsecase {
  constructor(private getAllTeamsQuerySerivice: IGetAllTeamsQueryService) {}
  async do() {
    const teams = await this.getAllTeamsQuerySerivice.execute();
    return teams;
  }
}
