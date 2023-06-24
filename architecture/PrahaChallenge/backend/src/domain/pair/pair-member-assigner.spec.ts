import {
  MockPairRepository,
  MockTeamRepository,
} from '../../mocks/repositories';
import { Attendee } from '../attendee/model';
import { Email } from '../email/model';
import { AttendeeId, PairId } from '../id/model';
import { PairName } from '../pair-name/model';
import { TeamName } from '../team-name/model';
import { Team } from '../team/model';
import { Pair } from './model';
import { PairMemberAssigner } from './pair-member-assigner';

const testData = {
  team: {
    teamWithLeastAttendees: Team.create({
      name: new TeamName(2),
      pairIds: ['pair4', 'pair5'].map((pairId) => new PairId(pairId)),
    }),
    getAllTeams: function () {
      return [
        Team.create({
          name: new TeamName(1),
          pairIds: ['pair1', 'pair2', 'pair3'].map(
            (pairId) => new PairId(pairId),
          ),
        }),
      ].concat(this.teamWithLeastAttendees);
    },
  },
  pair: {
    pairWithLeastAttendees: Pair.create({
      name: new PairName('c'),
      pairMemberAttendeeIds: ['attendeeId4', 'attendeeId5'].map(
        (attendeeId) => new AttendeeId(attendeeId),
      ),
    }),
    getPairsByIds: function () {
      return [
        Pair.create({
          name: new PairName('a'),
          pairMemberAttendeeIds: [
            'attendeeId1',
            'attendeeId2',
            'attendeeId3',
          ].map((attendeeId) => new AttendeeId(attendeeId)),
        }),
      ].concat(this.pairWithLeastAttendees);
    },
  },
  attendee: {
    newAttendee: Attendee.create({
      name: 'test',
      email: new Email('test@test.com'),
    }),
  },
} as const;

describe('PairMemberAssigner', () => {
  const mockTeamRepository = new MockTeamRepository();
  const mockPairRepository = new MockPairRepository();
  let pairMemberAssigner: PairMemberAssigner;

  beforeEach(() => {
    mockTeamRepository.findAll = jest
      .fn()
      .mockResolvedValue(testData.team.getAllTeams());
    mockPairRepository.findByIds = jest
      .fn()
      .mockResolvedValue(testData.pair.getPairsByIds());
    pairMemberAssigner = new PairMemberAssigner(
      mockTeamRepository,
      mockPairRepository,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('人数が最も少ないチームの中の、人数が最も少ないペアに新規参加者が配属される', async () => {
    const spiedGetPairWithLeastAttendees = jest.spyOn(
      pairMemberAssigner as any,
      'getPairWithLeastAttendees',
    );
    await pairMemberAssigner.assign(testData.attendee.newAttendee);
    expect(spiedGetPairWithLeastAttendees).toHaveBeenCalledWith(
      testData.team.teamWithLeastAttendees,
    );
    expect(mockPairRepository.update).toHaveBeenCalledWith(
      testData.pair.pairWithLeastAttendees.addAttendee(
        testData.attendee.newAttendee.id,
      ),
    );
  });
});
