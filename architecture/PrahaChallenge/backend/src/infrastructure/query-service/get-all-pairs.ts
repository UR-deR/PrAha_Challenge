import {
  AllPairsDto,
  IGetAllPairsQueryService,
} from '../../usecase/get-all-pairs/query-service';
import { prisma } from '../client/prisma-client';

export class GetAllPairQueryService implements IGetAllPairsQueryService {
  async execute(): Promise<AllPairsDto> {
    const pairs = await prisma.pairs.findMany();
    return new AllPairsDto(
      pairs.map(({ id, name }) => ({
        id,
        name,
      })),
    );
  }
}
