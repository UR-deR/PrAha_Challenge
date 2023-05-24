import { Injectable } from '@nestjs/common';
import {
  AllTeamsDto,
  IGetAllTeamsQueryService,
} from '../../app/get-all-teams/query-service';
import prisma from '../client/prisma-client';

@Injectable()
export class GetAllTeamsQueryService implements IGetAllTeamsQueryService {
  async execute(): Promise<AllTeamsDto> {
    const teams = await prisma.team.findMany();
    return new AllTeamsDto(teams);
  }
}
