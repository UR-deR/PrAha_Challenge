import { Attendee } from '../../domain/attendee/model';
import { Email } from '../../domain/email/model';
import { MockAttendeeRepository } from '../../mocks/repositories';
import { GetAllAttendeesDto, GetAllAttendeesUsecase } from './usecase';

const attendees: Attendee[] = [
  Attendee.create({
    name: 'name1',
    email: new Email('test1@test.com'),
  }),
  Attendee.create({
    name: 'name2',
    email: new Email('test2@test.com'),
  }),
];

describe('GetAllPairsUsecase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('AllAttendeesDtoを返す', () => {
    const mockAttendeeRepository = new MockAttendeeRepository();
    mockAttendeeRepository.findAll = jest.fn().mockResolvedValueOnce(attendees);
    const getAllAttendeesUseCase = new GetAllAttendeesUsecase(
      mockAttendeeRepository,
    );
    expect(getAllAttendeesUseCase.do()).resolves.toEqual(
      new GetAllAttendeesDto(attendees),
    );
  });
});
