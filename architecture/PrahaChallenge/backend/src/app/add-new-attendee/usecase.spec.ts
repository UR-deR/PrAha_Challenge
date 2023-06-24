import { DuplicatedEmailChecker } from '../../domain/attendee/duplicated-email-checker';
import { Email } from '../../domain/email/model';
import { PairMemberAssigner } from '../../domain/pair/pair-member-assigner';
import {
  MockAttendeeRepository,
  MockPairRepository,
  MockTeamRepository,
} from '../../mocks/repositories';

import { AddNewAttendeeUsecase } from './usecase';

describe('AddNewAttendeeUseCase', () => {
  class MockDuplicatedEmailChecker extends DuplicatedEmailChecker {
    public constructor() {
      super(MockAttendeeRepository());
    }
  }

  class MockPairMemberAssigner extends PairMemberAssigner {
    public constructor() {
      super(MockTeamRepository(), MockPairRepository());
    }
  }

  beforeAll(() => {
    MockPairMemberAssigner.prototype.assign = jest
      .fn()
      .mockResolvedValueOnce(void 0);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('新規参加者のメールアドレスが既に登録されている場合、エラーが返される', () => {
    MockDuplicatedEmailChecker.prototype.isDuplicated = jest
      .fn()
      .mockResolvedValueOnce(true);

    const usecase = new AddNewAttendeeUsecase(
      new MockDuplicatedEmailChecker(),
      new MockAttendeeRepository(),
      new MockPairMemberAssigner(),
    );

    expect(
      usecase.do({ name: 'test', email: new Email('test@test.com') }),
    ).rejects.toThrowError(`Duplicated email: test@test.com`);
  });

  test('新規参加者のメールアドレスが既に登録されていない場合、AttendeeRepositoryにinsertされる', async () => {
    const mockAttendeeRepository = new MockAttendeeRepository();

    const usecase = new AddNewAttendeeUsecase(
      new MockDuplicatedEmailChecker(),
      mockAttendeeRepository,
      new MockPairMemberAssigner(),
    );
    MockDuplicatedEmailChecker.prototype.isDuplicated = jest
      .fn()
      .mockResolvedValueOnce(false);

    await usecase.do({
      name: 'test',
      email: new Email('test@test.com'),
    });
    expect(mockAttendeeRepository.insert).toBeCalled();
  });

  test('新規参加者のメールアドレスが既に登録されていない場合、ペアに配属される', async () => {
    const mockPairMemberAssigner = new MockPairMemberAssigner();

    const usecase = new AddNewAttendeeUsecase(
      new MockDuplicatedEmailChecker(),
      new MockAttendeeRepository(),
      mockPairMemberAssigner,
    );
    MockDuplicatedEmailChecker.prototype.isDuplicated = jest
      .fn()
      .mockResolvedValueOnce(false);

    await usecase.do({
      name: 'test',
      email: new Email('test@test.com'),
    });
    expect(mockPairMemberAssigner.assign).toBeCalled();
  });
});
