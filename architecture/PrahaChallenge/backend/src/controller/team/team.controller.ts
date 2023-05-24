import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllTeamsResponse } from './response';
import { GetAllTeamsUsecase } from '../../app/get-all-teams/usecase';

@Controller('team')
export class TeamController {
  constructor(private readonly getAllTeamsUsecase: GetAllTeamsUsecase) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllTeamsResponse })
  async getAllTeams() {
    const allTeams = await this.getAllTeamsUsecase.do();
    const response = new GetAllTeamsResponse(allTeams);
    return response;
  }
}
