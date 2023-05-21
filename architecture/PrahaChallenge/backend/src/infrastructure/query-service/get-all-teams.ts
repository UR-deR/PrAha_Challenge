import {
  AllTeamsDto,
  IGetAllTeamsQueryService,
} from '../../app/get-all-teams/query-service';
import prisma from '../client/prisma-client';

export class GetAllTeamQueryService implements IGetAllTeamsQueryService {
  async execute(): Promise<AllTeamsDto> {
    const teams = await prisma.teams.findMany();
    return new AllTeamsDto(teams);
  }
}
