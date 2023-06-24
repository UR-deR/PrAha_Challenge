import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllAttendeesResponse } from './response/getAllAttendeesResponse';
import { GetAllAttendeesUsecase } from '../../app/get-all-attendees/usecase';
import { AddNewAttendeeAdaptor } from './request/AddNewAttendeeAdaptor';
import { AddNewAttendeeUsecase } from '../../app/add-new-attendee/usecase';
import { AddNewAttendeeRequest } from './request/AddNewAttendeeRequest';

@Controller('attendee')
export class AttendeeController {
  constructor(
    private readonly getAllAttendeesUsecase: GetAllAttendeesUsecase,
    private readonly addNewAttendeeUsecase: AddNewAttendeeUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllAttendeesResponse })
  async getAllAttendees() {
    const allAttendees = await this.getAllAttendeesUsecase.do();
    const response = new GetAllAttendeesResponse(allAttendees);
    return response;
  }

  @Post()
  @ApiResponse({ status: 200 })
  async addNewAttendee(@Body() request: AddNewAttendeeRequest) {
    const command = AddNewAttendeeAdaptor.toCommand(request);
    await this.addNewAttendeeUsecase.do(command);
    //TODO: error handling
    return;
  }
}
