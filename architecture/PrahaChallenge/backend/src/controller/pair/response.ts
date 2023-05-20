import { ApiProperty } from '@nestjs/swagger';
import { AllPairsDto } from '../../usecase/get-all-pairs/query-service';

export class GetAllPairsResponse {
  @ApiProperty({ type: () => [Pair] })
  allPairs: Pair[];

  public constructor(allPairs: AllPairsDto) {
    this.allPairs = allPairs.pair.map(({ id, name }) => new Pair(id, name));
  }
}

class Pair {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
