import { MockAttendeeRepository } from '../../mocks/repositories';
import { Email } from '../email/model';
import { DuplicatedEmailChecker } from './duplicated-email-checker';
import { Attendee } from './model';

describe('DuplicatedEmailChecker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('同じEmailを持つ参加者が存在する場合、isDuplicatedはtrueを返す', () => {
    const mockAttendeeRepository = new MockAttendeeRepository();
    const attendee = Attendee.create({
      name: 'test',
      email: new Email('test@test.com'),
    });
    mockAttendeeRepository.findByEmail = jest
      .fn()
      .mockResolvedValueOnce(attendee);
    const duplicatedEmailChecker = new DuplicatedEmailChecker(
      mockAttendeeRepository,
    );
    expect(
      duplicatedEmailChecker.isDuplicated(new Email('test@test.com')),
    ).resolves.toBeTruthy();
  });

  test('同じEmailを持つ参加者が存在しない場合、isDuplicatedはfalseを返す', () => {
    const mockAttendeeRepository = new MockAttendeeRepository();
    mockAttendeeRepository.findByEmail = jest.fn().mockResolvedValueOnce(null);
    const duplicatedEmailChecker = new DuplicatedEmailChecker(
      mockAttendeeRepository,
    );
    expect(
      duplicatedEmailChecker.isDuplicated(new Email('test@test.com')),
    ).resolves.toBeFalsy();
  });
});
