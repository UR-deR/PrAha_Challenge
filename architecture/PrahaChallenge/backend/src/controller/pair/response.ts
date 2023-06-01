import { ApiProperty } from '@nestjs/swagger';
import { GetAllPairsDto } from '../../app/get-all-pairs/usecase';

export class GetAllPairsResponse {
  @ApiProperty({ type: () => [Pair] })
  all_pairs: Pair[];

  public constructor({ value }: GetAllPairsDto) {
    this.all_pairs = value;
  }
}

class Pair {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
