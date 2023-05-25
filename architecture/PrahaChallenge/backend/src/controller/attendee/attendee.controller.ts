import { Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllAttendeesResponse } from './response/getAllAttendeesResponse';
import { IAttendeeRepository } from '../../domain/attendee/repository';
import { PROVIDERS } from '../../constants';

export type AddNewAttendeeRequest = {
  name: string;
  email: string;
};

@Controller('attendee')
export class AttendeeController {
  constructor(
    @Inject(PROVIDERS.ATTENDEE_REPOSITORY)
    private readonly attendeeRepository: IAttendeeRepository,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: GetAllAttendeesResponse })
  async getAllAttendees() {
    const allAttendees = await this.attendeeRepository.findAll();
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
