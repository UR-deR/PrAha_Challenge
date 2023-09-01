import { Inject, Injectable } from '@nestjs/common';
import { IPairRepository } from '../pair/repository';
import { Team } from './model';
import { PROVIDERS } from '../../constants';
import { Pair } from '../pair/model';

@Injectable()
export class FewestMemberPairGetter {
  public constructor(
    @Inject(PROVIDERS.PAIR_REPOSITORY)
    private pairRepository: IPairRepository,
  ) {}
  public async get(team: Team): Promise<Pair> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    const fewestMemberPair = pairs.reduce((acc, pair) => {
      return acc.pairMemberAttendeeIds.length <
        pair.pairMemberAttendeeIds.length
        ? acc
        : pair;
    });
    return fewestMemberPair;
  }
}
