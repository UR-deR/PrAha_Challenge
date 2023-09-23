import { UpdateTaskStatusUsecase } from './../../app/usecases/update-task-status.usecase';
import { Body, Controller, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '@nestjs/swagger';
import { UpdateTaskStatusRequest } from './request/update-task-status-request';
import { SearchSpecificTaskStatusParticipantsRequest } from './request/search-specific-task-status-participants-request';
import { SearchSpecificTaskStatusParticipantsUsecase } from '../../app/usecases/search-specific-task-status-participants.usecase';
import { SearchSpecificTaskStatusParticipantsResponse } from './response/search-specific-task-status-participants-response';

@Controller('task')
export class TaskController {
  constructor(
    private readonly updateTaskStatusUsecase: UpdateTaskStatusUsecase,
    private readonly searchSpecificTaskStatusParticipantsUsecase: SearchSpecificTaskStatusParticipantsUsecase,
  ) {}

  @Patch()
  @ApiResponse({ status: 201 })
  async updateTaskStatus(@Body() request: UpdateTaskStatusRequest) {
    await this.updateTaskStatusUsecase.do(
      UpdateTaskStatusRequest.toUsecaseParams(request),
    );
    return;
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: SearchSpecificTaskStatusParticipantsResponse,
  })
  async searchSpecificTaskStatusParticipants(
    @Body() request: SearchSpecificTaskStatusParticipantsRequest,
  ) {
    const response = await this.searchSpecificTaskStatusParticipantsUsecase.do(
      SearchSpecificTaskStatusParticipantsRequest.toUsecaseParams(request),
    );

    return new SearchSpecificTaskStatusParticipantsResponse(response);
  }
}
