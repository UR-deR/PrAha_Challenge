import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { IPairRepository } from '../../domain/pair/repository';
import { Pair } from '../../domain/pair/model';

type Dto = {
  id: string;
  name: string;
}[];

export class GetAllPairsDto {
  public readonly value: Dto;
  constructor(pairs: Pair[]) {
    this.value = pairs.map(({ id, name }) => ({
      id: id.value,
      name: name.value,
    }));
  }
}

@Injectable()
export class GetAllPairsUsecase {
  constructor(
    @Inject(PROVIDERS.TEAM_REPOSITORY)
    private pairRepository: IPairRepository,
  ) {}
  async do() {
    const pairs = await this.pairRepository.findAll();
    return new GetAllPairsDto(pairs);
  }
}
