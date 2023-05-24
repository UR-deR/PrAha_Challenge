import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllPairsResponse } from './response';
import { GetAllPairsUsecase } from '../../app/get-all-pairs/usecase';

@Controller('pair')
export class PairController {
  constructor(private readonly getAllPairsUsecase: GetAllPairsUsecase) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllPairsResponse })
  async getAllPairs() {
    const allPairs = await this.getAllPairsUsecase.do();
    const response = new GetAllPairsResponse(allPairs);
    return response;
  }
}
