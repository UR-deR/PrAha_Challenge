import { PairId } from '../id/model';
import { Pair } from './model';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
  findByIds(pairIds: PairId[]): Promise<Pair[]>;
  update(pair: Pair): Promise<void>;
}
