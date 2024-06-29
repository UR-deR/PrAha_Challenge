import { Body, Controller, Get, Patch } from '@nestjs/common';
import { GetAllPairsUsecase } from '../../app/usecases/get-all-pairs.usecase';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllPairsResponse } from './response/get-all-pairs-response';
import {
  SwapPairMembersRequest,
  convertUsecaseParams,
} from './request/swap-pair-members-request';
import { SwapPairMembersUsecase } from '../../app/usecases/swap-pair-members.usecase';

@Controller('pair')
export class PairController {
  constructor(
    private readonly getAllPairsUsecase: GetAllPairsUsecase,
    private readonly swapPairMembersUsecase: SwapPairMembersUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllPairsResponse })
  async getAllPairs() {
    const allPairsDto = await this.getAllPairsUsecase.do();
    return new GetAllPairsResponse(allPairsDto);
  }

  @Patch()
  @ApiResponse({ status: 201 })
  async swapPairMembers(@Body() request: SwapPairMembersRequest) {
    const usecaseParams = convertUsecaseParams(request);
    await this.swapPairMembersUsecase.do(usecaseParams);
  }
}
