import { Team } from './model';

export interface ITeamRepository {
  findById(id: number): Promise<Team | undefined>;
}
