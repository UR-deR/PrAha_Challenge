import { TeamId } from '../team-id/model';
import { Team } from './model';

export interface ITeamRepository {
  findById(id: TeamId): Promise<Team | undefined>;
}
