import { Email } from '../email/email';
import { ParticipantId } from '../id/id';
import { Participant } from './participant';

export interface IParticipantRepository {
  findAll(): Promise<Participant[]>;
  findById(id: ParticipantId): Promise<Participant | null>;
  findByIds(ids: ParticipantId[]): Promise<Participant[]>;
  findByEmail(email: Email): Promise<Participant | null>;
  save(Participant: Participant): Promise<void>;
}
