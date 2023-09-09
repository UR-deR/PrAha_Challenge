import { Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from '../injection-tokens';
import { IPairRepository } from '../domain/pair/pair-repository';
import { Team } from '../domain/team/team';
import { Pair } from '../domain/pair/pair';

export class VacantPairFinder {
  public constructor(
    @Inject(INJECTION_TOKENS.PAIR_REPOSITORY)
    private PairRepository: IPairRepository,
  ) {}
  public async find(team: Team): Promise<Pair[] | undefined> {
    const vacantPairs = [];
    for (const pairId of team.pairIds) {
      const pair = await this.PairRepository.findById(pairId);
      if (pair) {
        vacantPairs.push(pair);
      }
    }
    return vacantPairs.length > 0 ? vacantPairs : undefined;
  }
}
