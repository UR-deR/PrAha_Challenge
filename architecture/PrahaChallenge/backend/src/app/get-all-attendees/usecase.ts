import { IGetAllAttendeesQueryService } from './query-service';

export class GetAllAttendeesUsecase {
  constructor(
    private getAllAttendeesQuerySerivice: IGetAllAttendeesQueryService,
  ) {}
  async do() {
    const Attendees = await this.getAllAttendeesQuerySerivice.execute();
    return Attendees;
  }
}
