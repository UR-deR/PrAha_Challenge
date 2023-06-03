import { AttendeeId, PairId } from '../id/model';
import { Pair } from './model';

export interface IPairRepository {
  findById(id: PairId): Promise<Pair>;
  findByIds(ids: PairId[]): Promise<Pair[]>;
  findAll(): Promise<Pair[]>;
  acceptNewAttendee(pair: Pair, attendeeId: AttendeeId): Promise<void>;
}
