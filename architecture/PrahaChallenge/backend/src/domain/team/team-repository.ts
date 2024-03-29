import { PairId, TeamId } from '../id/id';
import { Team } from './team';

export interface ITeamRepository {
  findAll(): Promise<Team[]>;
  findFewestMemberTeam(): Promise<Team>;
  findByPairId(pairId: PairId): Promise<Team | undefined>;
  save(team: Team): Promise<void>;
  findById(id: TeamId): Promise<Team | undefined>;
}
