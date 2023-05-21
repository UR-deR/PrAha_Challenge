import { prismaMock } from '../../singleton';
import { AllAttendeesDto } from './query-service';
import { GetAllAttendeesUsecase } from './usecase';
import { GetAllAttendeesQueryService } from '../../infrastructure/query-service/get-all-attendees';
import { Email } from '../../domain/email/model';
import { AttendeeStatus } from '../../domain/attendee-status/model';
import { Prisma } from '@prisma/client';

describe('GetAllAttendeesUsecase', () => {
  test('AllAttendeesDtoを返す', () => {
    const getAllAttendeesUseCase = new GetAllAttendeesUsecase(
      new GetAllAttendeesQueryService(),
    );

    const mockAttendees: Prisma.attendeesGetPayload<{
      include: {
        status: true;
      };
    }>[] = [
      {
        id: 1,
        name: 'a',
        email: 'a@test.com',
        pair_id: 1,
        status_id: 2,
        status: {
          id: 2,
          name: 'ACTIVE',
        },
      },
      {
        id: 2,
        name: 'b',
        email: 'b@test.com',
        pair_id: 1,
        status_id: 1,
        status: {
          id: 1,
          name: 'RESIGNED',
        },
      },
    ];

    prismaMock.attendees.findMany.mockResolvedValue(mockAttendees);

    expect(getAllAttendeesUseCase.do()).resolves.toEqual(
      new AllAttendeesDto([
        {
          id: 1,
          name: 'a',
          email: new Email('a@test.com'),
          status: AttendeeStatus.ACTIVE,
        },
        {
          id: 2,
          name: 'b',
          email: new Email('b@test.com'),
          status: AttendeeStatus.RESIGNED,
        },
      ]),
    );
  });
});
