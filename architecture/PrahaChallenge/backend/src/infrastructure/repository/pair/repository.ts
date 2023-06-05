import { IPairRepository } from '../../../domain/pair/repository';
import prisma from '../../client/prisma-client';
import { Pair } from '../../../domain/pair/model';
import { AttendeeId, PairId } from '../../../domain/id/model';
import { PairName } from '../../../domain/pair-name/model';

export class PairRepository implements IPairRepository {
  public async findAll(): Promise<Pair[]> {
    const allPairs = await prisma.pair.findMany({
      include: {
        AttendeePairMembership: true,
      },
    });

    return allPairs.map(
      ({ id, name, AttendeePairMembership: attendeePairMembership }) =>
        Pair.reconstruct({
          id: new PairId(id),
          name: new PairName(name),
          pairMemberAttendeeIds: attendeePairMembership.map(
            ({ attendeeId }) => new AttendeeId(attendeeId),
          ),
        }),
    );
  }

  public async findByIds(pairIds: PairId[]): Promise<Pair[]> {
    const pairs = await prisma.pair.findMany({
      where: {
        id: {
          in: pairIds.map((pairId) => pairId.value),
        },
      },
      include: {
        AttendeePairMembership: true,
      },
    });

    return pairs.map(
      ({ id, name, AttendeePairMembership: attendeePairMembership }) =>
        Pair.reconstruct({
          id: new PairId(id),
          name: new PairName(name),
          pairMemberAttendeeIds: attendeePairMembership.map(
            ({ attendeeId }) => new AttendeeId(attendeeId),
          ),
        }),
    );
  }

  public async update(pair: Pair): Promise<void> {
    await prisma.pair.update({
      where: { id: pair.id.value },
      data: {
        name: pair.name.value,
        members: {
          connect: pair.pairMemberAttendeeIds.map((attendeeId) => ({
            id: attendeeId.value,
          })),
        },
      },
    });
  }
}
