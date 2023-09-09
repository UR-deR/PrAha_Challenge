import { ApiProperty } from '@nestjs/swagger';
import { GetAllPairsDto } from '../../../app/usecases/get-all-pairs.usecase';

class Pair {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  participants: {
    id: string;
    name: string;
  }[];

  constructor(
    id: string,
    name: string,
    participants: {
      id: string;
      name: string;
    }[],
  ) {
    this.id = id;
    this.name = name;
    this.participants = participants;
  }
}

export class GetAllPairsResponse {
  @ApiProperty({ type: () => [Pair] })
  all_pairs: Pair[];

  constructor(allpair: GetAllPairsDto) {
    this.all_pairs = allpair.value;
  }
}
