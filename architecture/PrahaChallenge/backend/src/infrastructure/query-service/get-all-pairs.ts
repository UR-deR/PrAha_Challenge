import { Injectable } from '@nestjs/common';
import {
  AllPairsDto,
  IGetAllPairsQueryService,
} from '../../app/get-all-pairs/query-service';
import prisma from '../client/prisma-client';

@Injectable()
export class GetAllPairsQueryService implements IGetAllPairsQueryService {
  async execute(): Promise<AllPairsDto> {
    const pairs = await prisma.pair.findMany();
    return new AllPairsDto(pairs);
  }
}
