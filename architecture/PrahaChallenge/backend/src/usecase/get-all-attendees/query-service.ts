import { AttendeeStatus } from '../../domain/attendee-status/model';
import { Email } from '../../domain/email/model';

export class AllAttendeesDto {
  constructor(
    public readonly attendee: {
      id: number;
      name: string;
      email: Email;
      status: AttendeeStatus;
    }[],
  ) {}
}
export interface IGetAllAttendeesQueryService {
  execute(): Promise<AllAttendeesDto>;
}
