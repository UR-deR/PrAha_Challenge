import { Email } from '../email/model';
import { Attendee } from './model';

export interface IAttendeeRepository {
  findByEmail(email: Email): Promise<Attendee | null>;
  findAll(): Promise<Attendee[]>;
  insert(attendee: Attendee): Promise<void>;
}
