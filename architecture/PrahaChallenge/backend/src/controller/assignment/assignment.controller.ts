import { Body, Controller, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateAssignmentStatusAdaptor } from './request/UpdateAssignmentStatusAdaptor';
import { UpdateAssignmentStatusUsecase } from '../../app/update-assignment-status/usecase';
import { UpdateAssignmentStatusRequest } from './request/UpdateAssignmentStatusRequest';

@Controller('assignment')
export class AssignmentController {
  constructor(
    private readonly updateAssignmentStatusUsecase: UpdateAssignmentStatusUsecase,
  ) {}

  @Patch()
  @ApiResponse({ status: 200 })
  async updateAssignmentStatus(@Body() request: UpdateAssignmentStatusRequest) {
    const command = UpdateAssignmentStatusAdaptor.toCommand(request);
    await this.updateAssignmentStatusUsecase.do(command);
    return;
  }
}
