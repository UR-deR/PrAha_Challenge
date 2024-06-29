import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllTeamsResponse } from './response/get-all-teams-response';
import { GetAllTeamsUsecase } from '../../app/usecases/get-all-teams.usecase';
import {
  SwapTeamPairRequest,
  convertUsecaseParams,
} from './request/swap-team-pair-request';
import { SwapTeamPairUsecase } from '../../app/usecases/swap-team-pair.usecase';

@Controller('team')
export class TeamController {
  constructor(
    private readonly getAllTeamsUsecase: GetAllTeamsUsecase,
    private readonly swapTeamPairUsecase: SwapTeamPairUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllTeamsResponse })
  async getAllTeams() {
    const allTeamsDto = await this.getAllTeamsUsecase.do();
    return new GetAllTeamsResponse(allTeamsDto);
  }

  @Patch()
  @ApiResponse({ status: 201 })
  async swapPairMembers(@Body() request: SwapTeamPairRequest) {
    const usecaseParams = convertUsecaseParams(request);
    await this.swapTeamPairUsecase.do(usecaseParams);
  }
}
