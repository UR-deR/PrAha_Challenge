import { Attendee } from '../../domain/attendee/model';
import { Email } from '../../domain/email/model';
import { IAttendeeRepository } from './../../domain/attendee/repository';
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
  const mockFindAll = jest.fn().mockReturnValue(Promise.resolve(attendees));
  const mockFindByEmail = jest.fn();
  const mockSave = jest.fn();
  const mockRepository = jest
    .fn<IAttendeeRepository, []>()
    .mockImplementation(() => ({
      findAll: mockFindAll,
      findByEmail: mockFindByEmail,
      save: mockSave,
    }));

  afterEach(() => {
    mockFindAll.mockClear();
  });

  test('AllAttendeesDtoを返す', () => {
    const getAllAttendeesUseCase = new GetAllAttendeesUsecase(mockRepository());
    // maybe this is not good way to assert.
    expect(getAllAttendeesUseCase.do()).resolves.toEqual(
      new GetAllAttendeesDto(attendees),
    );
  });
});
