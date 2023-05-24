import { Email } from './../../domain/email/model';
import {
  AllAttendeesDto,
  IGetAllAttendeesQueryService,
} from '../../app/get-all-attendees/query-service';
import prisma from '../client/prisma-client';
import { AttendeeStatus } from '../../domain/attendee-status/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllAttendeesQueryService
  implements IGetAllAttendeesQueryService
{
  async execute(): Promise<AllAttendeesDto> {
    const attendees = await prisma.attendee.findMany({
      include: {
        status: true,
      },
    });

    return new AllAttendeesDto(
      attendees.map(({ id, name, email, status }) => {
        const attendeeStatus =
          Object.values(AttendeeStatus).find(
            (attendeeStatus) => attendeeStatus === status.name,
          ) ??
          (() => {
            throw new Error(`Invalid attendee status. given: ${status.name}`);
          })();

        return {
          id: id,
          name: name,
          email: new Email(email),
          status: attendeeStatus,
        };
      }),
    );
  }
}
