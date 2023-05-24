import { Inject, Injectable } from '@nestjs/common';
import { IGetAllPairsQueryService } from './query-service';
import { PROVIDERS } from '../../constants';

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    @Inject(PROVIDERS.GET_ALL_PAIRS_QUERY_SERVICE)
    private getAllPairsQuerySerivice: IGetAllPairsQueryService,
  ) {}
  async do() {
    const pairs = await this.getAllPairsQuerySerivice.execute();
    return pairs;
  }
}
