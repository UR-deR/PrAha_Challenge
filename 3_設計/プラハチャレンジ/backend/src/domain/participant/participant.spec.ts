import { Email } from '../email/email';
import { ParticipantId } from '../id/id';
import { Participant } from './participant';
import { ParticipantStatus } from './participant-status';

describe('create', () => {
  it('should return Participant', () => {
    expect(
      Participant.create({
        name: 'hoge',
        email: new Email('example@example.com'),
      }),
    ).toBeInstanceOf(Participant);
  });
});

describe('reconstruct', () => {
  it('should return Participant', () => {
    expect(
      Participant.reconstruct({
        id: new ParticipantId('hoge'),
        name: 'hoge',
        email: new Email('example@example.com'),
        status: ParticipantStatus.ACTIVE,
      }),
    ).toBeInstanceOf(Participant);
  });
});

describe('updateStatus', () => {
  it('should return Participant that is resigned', () => {
    const resignedParticipant = Participant.reconstruct({
      id: new ParticipantId('hoge'),
      name: 'hoge',
      email: new Email('example@example.com'),
      status: ParticipantStatus.ACTIVE,
    }).updateStatus(ParticipantStatus.RESIGNED);
    expect(
      resignedParticipant.status.equals(ParticipantStatus.RESIGNED),
    ).toBeTruthy();
  });
});
