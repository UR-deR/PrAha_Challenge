import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllAttendeesResponse } from './response';
import { GetAllAttendeesUsecase } from '../../app/get-all-attendees/usecase';
import { GetAllAttendeesQueryService } from '../../infrastructure/query-service/get-all-attendees';

@Controller('attendee')
export class AttendeeController {
  @Get()
  @ApiResponse({ status: 200, type: GetAllAttendeesResponse })
  async getAllAttendees() {
    const usecase = new GetAllAttendeesUsecase(
      new GetAllAttendeesQueryService(),
    );
    const allAttendees = await usecase.do();
    const response = new GetAllAttendeesResponse(allAttendees);
    return response;
  }
}
