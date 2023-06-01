import { TeamId } from '../id/model';
import { Team } from './model';

export interface ITeamRepository {
  findById(id: TeamId): Promise<Team | undefined>;
  findAll(): Promise<Team[]>;
}
