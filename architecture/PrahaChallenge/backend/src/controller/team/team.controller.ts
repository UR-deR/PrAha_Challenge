import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllTeamsResponse } from './response';
import { GetAllTeamsUsecase } from '../../usecase/get-all-teams/usecase';
import { GetAllTeamQueryService } from '../../infrastructure/query-service/get-all-teams';

@Controller('team')
export class TeamController {
  @Get()
  @ApiResponse({ status: 200, type: GetAllTeamsResponse })
  async getAllTeams() {
    const usecase = new GetAllTeamsUsecase(new GetAllTeamQueryService());
    const allTeams = await usecase.do();
    const response = new GetAllTeamsResponse(allTeams);
    return response;
  }
}
