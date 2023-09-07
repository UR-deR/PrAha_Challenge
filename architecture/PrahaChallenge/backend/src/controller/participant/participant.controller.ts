import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetAllParticipantsUsecase } from '../../app/usecases/get-all-participants.usecase';
import { GetAllParticipantsResponse } from './response/get-all-participants-response';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterNewParticipantRequest } from './request/register-new-participant-request';
import { RegisterNewParticipantUsecase } from '../../app/usecases/register-new-participant.usecase';

@Controller('participant')
export class ParticipantController {
  constructor(
    private readonly getAllParticipantsUsecase: GetAllParticipantsUsecase,
    private readonly registerNewParticipantUsecase: RegisterNewParticipantUsecase,
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
}
