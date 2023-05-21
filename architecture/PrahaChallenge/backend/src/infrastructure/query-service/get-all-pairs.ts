import {
  AllPairsDto,
  IGetAllPairsQueryService,
} from '../../app/get-all-pairs/query-service';
import prisma from '../client/prisma-client';

export class GetAllPairsQueryService implements IGetAllPairsQueryService {
  async execute(): Promise<AllPairsDto> {
    const pairs = await prisma.pairs.findMany();
    return new AllPairsDto(pairs);
  }
}
