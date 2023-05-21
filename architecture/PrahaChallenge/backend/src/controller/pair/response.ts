import { ApiProperty } from '@nestjs/swagger';
import { AllPairsDto } from '../../app/get-all-pairs/query-service';

export class GetAllPairsResponse {
  @ApiProperty({ type: () => [Pair] })
  all_pairs: Pair[];

  public constructor({ pair }: AllPairsDto) {
    this.all_pairs = pair;
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
