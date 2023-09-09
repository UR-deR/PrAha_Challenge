import { Controller, Get } from '@nestjs/common';
import { GetAllPairsUsecase } from '../../app/usecases/get-all-pairs.usecase';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllPairsResponse } from './response/get-all-pairs-response';

@Controller('pair')
export class PairController {
  constructor(private readonly getAllPairsUsecase: GetAllPairsUsecase) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllPairsResponse })
  async getAllPairs() {
    const allPairsDto = await this.getAllPairsUsecase.do();
    return new GetAllPairsResponse(allPairsDto);
  }
}
