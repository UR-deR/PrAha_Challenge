import { Pair } from './model';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
}
