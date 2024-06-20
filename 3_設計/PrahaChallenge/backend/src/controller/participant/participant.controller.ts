import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GetAllParticipantsUsecase } from '../../app/usecases/get-all-participants.usecase';
import { GetAllParticipantsResponse } from './response/get-all-participants-response';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterNewParticipantRequest } from './request/register-new-participant-request';
import { RegisterNewParticipantUsecase } from '../../app/usecases/register-new-participant.usecase';
import { UpdateParticipantStatusRequest } from './request/update-participant-status-request';
import { UpdateParticipantStatusUsecase } from '../../app/usecases/update-participant-status.usecase';
import { ParticipantId } from '../../domain/id/id';
import { ParticipantStatus } from '../../domain/participant/participant-status';

@Controller('participant')
export class ParticipantController {
  constructor(
    private readonly getAllParticipantsUsecase: GetAllParticipantsUsecase,
    private readonly registerNewParticipantUsecase: RegisterNewParticipantUsecase,
    private readonly updateParticipantStatusUsecase: UpdateParticipantStatusUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllParticipantsResponse })
  async getAllParticipants() {
    const allParticipantsDto = await this.getAllParticipantsUsecase.do();
    return new GetAllParticipantsResponse(allParticipantsDto);
  }

  @Post()
  @ApiResponse({ status: 201 })
  async addNewAttendee(@Body() request: RegisterNewParticipantRequest) {
    //TODO:requestのバリデーションを行う
    await this.registerNewParticipantUsecase.do(request);
    return;
  }

  @Patch()
  @ApiResponse({ status: 201 })
  async updateParticipantStatus(
    @Body() request: UpdateParticipantStatusRequest,
  ) {
    await this.updateParticipantStatusUsecase.do({
      participantId: new ParticipantId(request.participant_id),
      newParticipantStatus: ParticipantStatus.valueOf(request.status),
    });
    return;
  }
}
