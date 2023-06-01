import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllAttendeesResponse } from './response/getAllAttendeesResponse';
import { GetAllAttendeesUsecase } from '../../app/get-all-attendees/usecase';

export type AddNewAttendeeRequest = {
  name: string;
  email: string;
};

@Controller('attendee')
export class AttendeeController {
  constructor(
    private readonly getAllAttendeesUsecase: GetAllAttendeesUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllAttendeesResponse })
  async getAllAttendees() {
    const allAttendees = await this.getAllAttendeesUsecase.do();
    const response = new GetAllAttendeesResponse(allAttendees);
    return response;
  }

  // @Post()
  // @ApiResponse({ status: 200 })
  // addNewAttendee(@Body() request: AddNewAttendeeRequest) {
  //   const command = AddNewAttendeeAdaptor.toCommand(request);
  //   const usecase = new AddNewAttendeeUsecase();
  //   usecase.do(command);
  //   return;
  // }
}
