import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllTeamsResponse } from './response/get-all-teams-response';
import { GetAllTeamsUsecase } from '../../app/usecases/get-all-teams.usecase';

@Controller('team')
export class TeamController {
  constructor(private readonly getAllTeamsUsecase: GetAllTeamsUsecase) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllTeamsResponse })
  async getAllTeams() {
    const allTeamsDto = await this.getAllTeamsUsecase.do();
    return new GetAllTeamsResponse(allTeamsDto);
  }
}
