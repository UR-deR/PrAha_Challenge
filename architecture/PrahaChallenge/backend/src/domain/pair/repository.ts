import { PairId } from '../id/model';
import { Pair } from './model';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
  findByIds(pairIds: PairId[]): Promise<Pair[]>;
  insert(pair: Pair): Promise<void>;
  update(pair: Pair): Promise<void>;
  delete(pair: Pair): Promise<void>;
}
