import { Inject, Injectable } from '@nestjs/common';
import { IGetAllAttendeesQueryService } from './query-service';
import { PROVIDERS } from '../../constants';

@Injectable()
export class GetAllAttendeesUsecase {
  constructor(
    @Inject(PROVIDERS.GET_ALL_ATTENDEES_QUERY_SERVICE)
    private getAllAttendeesQuerySerivice: IGetAllAttendeesQueryService,
  ) {}
  async do() {
    const attendees = await this.getAllAttendeesQuerySerivice.execute();
    return attendees;
  }
}
