import { IGetAllPairsQueryService } from './query-service';

export class GetAllPairsUsecase {
  constructor(private getAllPairsQuerySerivice: IGetAllPairsQueryService) {}
  async do() {
    const Pairs = await this.getAllPairsQuerySerivice.execute();
    return Pairs;
  }
}
