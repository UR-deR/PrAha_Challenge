import { Email } from '../email/model';
import { AttendeeId } from '../id/model';
import { Attendee } from './model';

export interface IAttendeeRepository {
  findById(id: AttendeeId): Promise<Attendee | null>;
  findByIds(ids: AttendeeId[]): Promise<Attendee[]>;
  findByEmail(email: Email): Promise<Attendee | null>;
  findAll(): Promise<Attendee[]>;
  insert(attendee: Attendee): Promise<void>;
}
