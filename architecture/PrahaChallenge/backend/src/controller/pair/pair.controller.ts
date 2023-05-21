import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllPairsResponse } from './response';
import { GetAllPairsUsecase } from '../../usecase/get-all-pairs/usecase';
import { GetAllPairsQueryService } from '../../infrastructure/query-service/get-all-pairs';

@Controller('pair')
export class PairController {
  @Get()
  @ApiResponse({ status: 200, type: GetAllPairsResponse })
  async getAllPairs() {
    const usecase = new GetAllPairsUsecase(new GetAllPairsQueryService());
    const allPairs = await usecase.do();
    const response = new GetAllPairsResponse(allPairs);
    return response;
  }
}
