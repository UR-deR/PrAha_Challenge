import { UpdateTaskStatusUsecase } from './../../app/usecases/update-task-status.usecase';
import { Body, Controller, Patch } from '@nestjs/common';

import { ApiResponse } from '@nestjs/swagger';
import {
  UpdateTaskStatusRequest,
  convertRequestIntoUsecaseParams,
} from './request/update-task-status-request';

@Controller('task')
export class TaskController {
  constructor(
    private readonly updateTaskStatusUsecase: UpdateTaskStatusUsecase,
  ) {}

  @Patch()
  @ApiResponse({ status: 201 })
  async updateTaskStatus(@Body() request: UpdateTaskStatusRequest) {
    await this.updateTaskStatusUsecase.do(
      convertRequestIntoUsecaseParams(request),
    );
    return;
  }
}
