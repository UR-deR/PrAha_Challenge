import { AttendeeId, PairId } from '../id/model';
import { PairName } from '../pair-name/model';

type ConstructorArgs = {
  id: PairId;
  name: PairName;
  pairMemberAttendeeIds: AttendeeId[];
};

export class Pair {
  public readonly id: PairId;
  public readonly name: PairName;
  public readonly pairMemberAttendeeIds: AttendeeId[];

  public static readonly MAX_ATTENDEE_COUNT = 3;
  public static readonly MIN_ATTENDEE_COUNT = 2;

  private constructor({ id, name, pairMemberAttendeeIds }: ConstructorArgs) {
    if (
      pairMemberAttendeeIds.length < Pair.MIN_ATTENDEE_COUNT ||
      pairMemberAttendeeIds.length > Pair.MAX_ATTENDEE_COUNT
    ) {
      throw new Error(
        `Invalid attendee count. given: ${pairMemberAttendeeIds.length}`,
      );
    }
    this.id = id;
    this.name = name;
    this.pairMemberAttendeeIds = pairMemberAttendeeIds;
  }

  public static create(args: Omit<ConstructorArgs, 'id'>): Pair {
    return new Pair({
      id: PairId.generate(),
      ...args,
    });
  }

  public static reconstruct(args: ConstructorArgs): Pair {
    return new Pair({
      ...args,
    });
  }

  private changeAttendees({
    pairMemberAttendeeIds,
  }: Pick<ConstructorArgs, 'pairMemberAttendeeIds'>): Pair {
    return new Pair({
      id: this.id,
      name: this.name,
      pairMemberAttendeeIds,
    });
  }

  public removeAttendee(attendeeId: AttendeeId): Pair {
    const pairMemberAttendeeIds = this.pairMemberAttendeeIds.filter(
      (pairMemberAttendeeId) => pairMemberAttendeeId.value !== attendeeId.value,
    );
    return this.changeAttendees({ pairMemberAttendeeIds });
  }

  public acceptAttendee(attendeeId: AttendeeId): Pair {
    const pairMemberAttendeeIds = [...this.pairMemberAttendeeIds, attendeeId];
    return this.changeAttendees({ pairMemberAttendeeIds });
  }
}
